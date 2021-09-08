import { ImportExportWarehouseService } from 'app/entities/ctsmicroservice/import-export-warehouse/import-export-warehouse.service';
import {
    DetailsImportExportDTO,
    IShipmentInvoice,
    IShipmentInvoicePackages,
    PersonalShipmentService,
    RequestDetailsDTO
} from 'app/entities/ctsmicroservice/invoice-header/personal-shipment';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { Principal, IUser, AccountService } from 'app/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CommonString } from 'app/shared';
import { Moment } from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { JhiAlertService, JhiParseLinks } from 'ng-jhipster';
import { InvoiceHeaderService } from '../invoice-header';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestImportModalConfirmComponent } from '.';
import { IImportExportWarehouse, ImportExportWarehouse } from 'app/shared/model/ctsmicroservice/import-export-warehouse.model';
import { IInvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';

@Component({
    selector: 'jhi-request-import-warehouse-shipper-update',
    templateUrl: './request-import-warehouse-shipper-update.component.html'
})
export class RequestImportWarehouseShipperUpdateComponent implements OnInit {
    currentAccount: IUser;
    currentProfile: IUserProfile;
    keeperList: IUser[];
    shipmentInvoices: IShipmentInvoicePackages[];
    isSaving: boolean;
    shipDate: string;
    createDate: string;
    updateDate: string;
    selectedInvoiceNumber: any;
    selectedTypeShipment: any;
    selectedTypeFromServer: any;
    common: CommonString;
    fromTime: Moment;
    toTime: Moment;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    routeData: any;
    selectedCheckBox: boolean[] = [];
    all: boolean;

    constructor(
        private importExportWarehouseService: ImportExportWarehouseService,
        private personalShipmentService: PersonalShipmentService,
        private invoiceHeaderService: InvoiceHeaderService,
        private accountService: AccountService,
        private principal: Principal,
        private modalService: NgbModal,
        private jhiAlertService: JhiAlertService,
        private ngxUiLoaderService: NgxUiLoaderService,
        private parseLinks: JhiParseLinks,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.common = new CommonString();
        this.selectedTypeShipment = this.common.listTypeShipment[0].id;
        this.isSaving = false;
        this.itemsPerPage = 50;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.selectedTypeShipment = this.common.listTypeShipment[0].id;
        this.principal.identity().then(account => {
            this.currentAccount = account;
            this.loadAll();
        });
    }

    previousState() {
        window.history.back();
    }

    clearDatepicker(id: number) {
        switch (id) {
            case 2:
                this.fromTime = null;
                break;
            case 3:
                this.toTime = null;
                break;
        }
    }

    createImportRequest() {
        this.isSaving = false;
        let closeResult = '';

        let selectedRequestInvoices = new Array();
        if (this.selectedCheckBox) {
            for (const i in this.selectedCheckBox) {
                if (this.selectedCheckBox[i]) {
                    selectedRequestInvoices.push(this.shipmentInvoices[i]);
                }
            }
        }
        const modalRef = this.modalService.open(RequestImportModalConfirmComponent as Component, {
            size: 'lg',
            backdrop: 'static'
        });
        modalRef.componentInstance.selectedImportInvoices = selectedRequestInvoices;
        modalRef.result.then(
            result => {
                if (result) {
                    closeResult = result;
                    if (closeResult.startsWith('OK')) {
                        const data = new DetailsImportExportDTO();
                        data.requestHeader = this.createNewRequestHeader();
                        data.requestDetailsList = new Array();
                        for (const i in this.selectedCheckBox) {
                            if (this.selectedCheckBox[i]) {
                                const rd = new RequestDetailsDTO();
                                rd.invoicePackageId = this.shipmentInvoices[i].invoiceHeaderDTO.id;
                                data.requestDetailsList.push(rd);
                            }
                        }
                        console.log(data);
                        this.importExportWarehouseService.createImportWarehouse(data).subscribe(
                            (res: HttpResponse<any>) => {
                                this.isSaving = false;
                                const responseData: IImportExportWarehouse = res.body;
                                this.router.navigate(['/import-export-warehouse-employee/' + responseData.id + '/view']);
                            },
                            (res: HttpErrorResponse) => {
                                this.isSaving = false;
                            }
                        );
                    }
                }
            },
            reason => {}
        );
    }

    createNewRequestHeader(): ImportExportWarehouse {
        const result: ImportExportWarehouse = new ImportExportWarehouse();
        result.employeeId = this.currentAccount.id;
        result.warehouseId = this.currentProfile.officeId;
        for (const obj of this.keeperList) {
            if (obj.activated) {
                result.keeperId = obj.id;
            }
        }
        return result;
    }

    loadAll() {
        this.isSaving = false;
        this.ngxUiLoaderService.start();
        const param = {
            id: this.currentAccount.id,
            invNo: this.selectedInvoiceNumber ? this.selectedInvoiceNumber : '',
            type: this.selectedTypeShipment ? this.selectedTypeShipment : 'collect',
            from: this.fromTime ? this.fromTime.year() + '-' + (this.fromTime.month() + 1) + '-' + this.fromTime.date() : '',
            to: this.toTime ? this.toTime.year() + '-' + (this.toTime.month() + 1) + '-' + this.toTime.date() : '',
            page: this.page - 1,
            size: this.itemsPerPage
        };
        this.personalShipmentService.getImportShipmentByShipper(param).subscribe(
            (res: HttpResponse<any>) => {
                this.paginateInvoiceHeaders(res.body, res.headers);
                this.selectedTypeFromServer = this.selectedTypeShipment;
                this.ngxUiLoaderService.stop();
            },
            (res: HttpErrorResponse) => {
                this.onError();
                this.ngxUiLoaderService.stop();
            }
        );
        this.accountService.findByUserID({ id: this.currentAccount.id }).subscribe(res => {
            this.currentProfile = res.body;
            this.invoiceHeaderService.getListKeeperByOffice({ id: this.currentProfile.officeId }).subscribe(resp => {
                this.keeperList = resp.body;
            });
        });
    }

    private paginateInvoiceHeaders(data: IShipmentInvoicePackages[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.shipmentInvoices = data;
        for (const obj of data) {
            if (obj) {
                this.selectedCheckBox.push(false);
            }
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
        result.subscribe((res: HttpResponse<any>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError() {
        this.jhiAlertService.error('Đã xảy ra lỗi khi thực hiện', null, null);
    }

    checkAll(e) {
        if (e.target.checked) {
            this.all = true;
            for (const i in this.selectedCheckBox) {
                if (this.selectedCheckBox.hasOwnProperty(i)) {
                    this.selectedCheckBox[i] = true;
                }
            }
        } else {
            this.all = false;
            for (const i in this.selectedCheckBox) {
                if (this.selectedCheckBox.hasOwnProperty(i)) {
                    this.selectedCheckBox[i] = false;
                }
            }
        }
    }

    checked(i: number, e) {
        if (e.target.checked) {
            this.selectedCheckBox[i] = true;
            let myAll = true;
            for (let bool of this.selectedCheckBox) {
                if (!bool) {
                    myAll = false;
                }
            }
            this.all = myAll;
        } else {
            this.selectedCheckBox[i] = false;
            this.all = false;
        }
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/request-import-warehouse-shipper'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    totalWeight(packageList: IInvoicePackage[]) {
        let x = 0;
        for (const obj of packageList) {
            x += obj.weight;
        }
        return x;
    }
}

import { InvoiceHeaderService } from './../invoice-header.service';
import { AccountService } from './../../../../core/auth/account.service';
import { ImportExportWarehouseService } from './../../import-export-warehouse/import-export-warehouse.service';
import { CommonString } from './../../../../shared/util/request-util';
import { IShipmentInvoice, PersonalShipmentService } from './personal-shipment.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, forkJoin, of } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { IUser, Principal } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { NgxUiLoaderService } from 'ngx-ui-loader/';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportModalConfirmComponent } from '.';
import { IImportExportWarehouse, ImportExportWarehouse } from 'app/shared/model/ctsmicroservice/import-export-warehouse.model';
import { Moment } from 'moment';
import { IUserProfile } from 'app/shared/model/user-profile.model';

@Component({
    selector: 'jhi-personal-shipment',
    templateUrl: './personal-shipment.component.html'
})
export class PersonalShipmentComponent implements OnInit, OnDestroy {
    currentAccount: any;
    currentProfile: IUserProfile;
    keeperList: IUser[];
    shipmentInvoices: IShipmentInvoice[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    selectedTypeShipment: any;
    collectAddress: any;
    shipAddress: any;
    selectedInvoiceNumber: any;
    selectedRequestInvoices: any;
    selectedCheckBox: boolean[] = [];
    common: CommonString;
    fromTime: Moment;
    toTime: Moment;
    selectedTypeFromServer: any;
    selectedInvoiceStatus: any;
    lstInvoiceStatus: any = [
        { id: 'collect', text: 'Chờ nhân viên đang lấy hàng' },
        { id: 'last_import', text: 'Nhập kho chi nhánh cuối' },
        { id: 'delivering', text: 'Nhân viên đang giao hàng' }
    ];
    all: boolean;
    requestNote = '';
    isSaving: boolean;

    constructor(
        private personalShipmentService: PersonalShipmentService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private ngxUiLoaderService: NgxUiLoaderService,
        private modalService: NgbModal,
        private requestService: ImportExportWarehouseService,
        private accountService: AccountService,
        private invoiceHeaderService: InvoiceHeaderService
    ) {
        this.common = new CommonString();
        this.selectedTypeShipment = this.common.listTypeShipment[0].id;
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.itemsPerPage = 50;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.isSaving = false;
        this.ngxUiLoaderService.start();
        const param = {
            id: this.currentAccount.id,
            invNo: this.selectedInvoiceNumber ? this.selectedInvoiceNumber : '',
            status: this.selectedInvoiceStatus ? this.selectedInvoiceStatus : '',
            type: this.selectedTypeShipment,
            from: this.fromTime ? this.fromTime.year() + '-' + (this.fromTime.month() + 1) + '-' + this.fromTime.date() : '',
            to: this.toTime ? this.toTime.year() + '-' + (this.toTime.month() + 1) + '-' + this.toTime.date() : '',
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        };
        this.personalShipmentService.getPersonalShipmentByShipper(param).subscribe(
            (res: HttpResponse<any>) => {
                this.paginateInvoiceHeaders(res.body, res.headers);
                this.selectedTypeFromServer = this.selectedTypeShipment;
                for (const obj of this.shipmentInvoices) {
                    this.selectedCheckBox.push(false);
                }
                this.ngxUiLoaderService.stop();
            },
            (res: HttpErrorResponse) => {
                this.onError(res.message);
                this.ngxUiLoaderService.stop();
            }
        );
        this.accountService.findByUserID({ id: this.currentAccount.id }).subscribe(res => {
            this.currentProfile = res[0].body;
            this.invoiceHeaderService.getListKeeperByOfficeID({ id: this.currentProfile.officeId }).subscribe(resp => {
                this.keeperList = resp.body;
            });
        });
    }

    calculateObject(shipment: IShipmentInvoice): boolean {
        let rs = false;
        if (shipment.personalShipmentDTO.shipmentType === 'collect') {
            if (shipment.invoiceHeaderDTO.status === 'collected' && shipment.personalShipmentDTO === 'finish') {
                rs = true;
            }
            if (shipment.invoiceHeaderDTO.status === 'collect' && shipment.personalShipmentDTO !== 'finish') {
            }
        } else if (shipment.personalShipmentDTO.shipmentType === 'delivery') {
            if (shipment.invoiceHeaderDTO.status === 'last_import' && shipment.personalShipmentDTO.status !== 'finish') {
                rs = true;
            }
            if (shipment.invoiceHeaderDTO.status === 'delivering' && shipment.personalShipmentDTO.status !== 'finish') {
                rs = true;
            }
        }
        return rs;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/personal-shipment'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    checked(i: number, e) {
        if (!e.target.checked) {
            this.all = false;
        }
    }

    checkAll() {
        if (this.all) {
            // tslint:disable-next-line: forin
            for (const i in this.selectedCheckBox) {
                this.selectedCheckBox[i] = true;
            }
        } else {
            // tslint:disable-next-line: forin
            for (const i in this.selectedCheckBox) {
                this.selectedCheckBox[i] = false;
            }
        }
    }

    createNewRequestHeader(): ImportExportWarehouse {
        const result: ImportExportWarehouse = new ImportExportWarehouse();
        result.employeeId = this.currentAccount.id;
        result.officeId = this.currentProfile.officeId;
        for (const obj of this.keeperList) {
            if (obj.activated) {
                result.keeperId = obj.id;
            }
        }
        return result;
    }

    createExportRequest() {
        let closeResult = '';
        // only invoice.finish = false can export
        let todo = true;
        this.selectedRequestInvoices = new Array();
        if (this.selectedCheckBox) {
            for (const i in this.selectedCheckBox) {
                if (this.selectedCheckBox[i]) {
                    if (this.shipmentInvoices[i].invoiceHeaderDTO.finish === todo) {
                        todo = !todo;
                        break;
                    }
                    this.selectedRequestInvoices.push(this.shipmentInvoices[i]);
                }
            }
        }
        if (todo) {
            const modalRef = this.modalService.open(ExportModalConfirmComponent as Component, {
                size: 'lg',
                backdrop: 'static'
            });
            modalRef.componentInstance.selectedExportInvoices = this.selectedRequestInvoices;
            modalRef.result.then(
                result => {
                    if (result) {
                        closeResult = result;
                    }
                },
                reason => {}
            );
            if (closeResult.startsWith('OK')) {
                const data = new DetailsImportExportDTO();
                data.requestHeader = this.createNewRequestHeader();
                data.requestDetailsList = new Array();
                for (const i in this.selectedCheckBox) {
                    if (this.selectedCheckBox[i]) {
                        const rd = new RequestDetailsDTO();
                        rd.shipmentId = this.shipmentInvoices[i].personalShipmentDTO.id;
                    }
                }
                this.requestService.createImportWarehouse(data).subscribe(
                    (res: HttpResponse<any>) => {
                        this.isSaving = false;
                        const responseData: DetailsImportExportDTO = res.body;
                        // redirect to view
                    },
                    (res: HttpErrorResponse) => {
                        this.isSaving = false;
                    }
                );
            }
        } else {
            this.openWarning();
        }
    }

    createImportRequest() {
        let closeResult = '';
        // only invoice.finish = true can import
        let todo = false;
        this.selectedRequestInvoices = new Array();
        if (this.selectedCheckBox) {
            for (const i in this.selectedCheckBox) {
                if (this.selectedCheckBox[i]) {
                    if (this.shipmentInvoices[i].invoiceHeaderDTO.finish === todo) {
                        todo = !todo;
                        break;
                    }
                    this.selectedRequestInvoices.push(this.shipmentInvoices[i]);
                }
            }
        }
        if (!todo) {
            const modalRef = this.modalService.open(ExportModalConfirmComponent as Component, {
                size: 'lg',
                backdrop: 'static'
            });
            modalRef.componentInstance.selectedImportInvoices = this.selectedRequestInvoices;
            modalRef.result.then(
                result => {
                    if (result) {
                        closeResult = result;
                    }
                },
                reason => {}
            );
            if (closeResult.startsWith('OK')) {
                const data = new DetailsImportExportDTO();
                data.requestHeader = this.createNewRequestHeader();
                data.requestDetailsList = new Array();
                for (const i in this.selectedCheckBox) {
                    if (this.selectedCheckBox[i]) {
                        const rd = new RequestDetailsDTO();
                        rd.shipmentId = this.shipmentInvoices[i].personalShipmentDTO.id;
                    }
                }
                this.requestService.createExportWarehouse(data).subscribe(
                    (res: HttpResponse<any>) => {
                        this.isSaving = false;
                        const responseData: DetailsImportExportDTO = res.body;
                        // redirect to view
                    },
                    (res: HttpErrorResponse) => {
                        this.isSaving = false;
                    }
                );
            }
        } else {
            this.openWarning();
        }
    }

    openWarning() {
        this.modalService.open(ModalWarningComponent as Component, {
            size: 'lg',
            backdrop: 'static'
        });
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/personal-shipment',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.registerChangeInPersonalShipments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
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

    trackId(index: number, item: IShipmentInvoice) {
        return item.personalShipmentDTO.id;
    }

    registerChangeInPersonalShipments() {
        this.eventSubscriber = this.eventManager.subscribe('personalShipmentListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateInvoiceHeaders(data: IShipmentInvoice[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.shipmentInvoices = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

@Component({
    selector: 'jhi-modal-warning-component',
    template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Warning</h4>
      <button
        type="button"
        class="close"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
        <strong>Bạn lựa chọn một số hóa đơn đã yêu cầu xuất nhập kho hoặc không đủ điều kiện</strong>
      </p>
    </div>
    <div class="modal-footer">
      <div
        style="width: 20%; width: 30px;"
      >
      </div>
      <button
        style="margin-left: 51%; width: 20%; margin-right:5%"
        type="button"
        class="btn btn-warning"
        (click)="modal.close('Ok click')"
      >
        Ok
      </button>
    </div>
  `
})
export class ModalWarningComponent {
    constructor(public modal: NgbActiveModal) {}
}

export class DetailsImportExportDTO {
    requestHeader: IImportExportWarehouse;
    requestDetailsList: RequestDetailsDTO[];
    constructor() {}
}

export class RequestDetailsDTO {
    id: number;
    ieWarehouseId: number;
    shipmentId: number;
    createDate: Moment;
    updateDate: Moment;
    constructor() {}
}

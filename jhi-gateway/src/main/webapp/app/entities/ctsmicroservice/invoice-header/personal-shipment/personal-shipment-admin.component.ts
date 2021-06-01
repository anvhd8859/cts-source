import { CommonString } from './../../../../shared/util/request-util';
import { IShipmentInvoice, PersonalShipmentService } from './personal-shipment.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { AccountService, IUser, Principal } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { InvoiceHeaderService } from '..';
import { NgxUiLoaderService } from 'ngx-ui-loader/';
import { IDistrict } from 'app/shared/model/ctsmicroservice/district.model';
import { IProvince } from 'app/shared/model/ctsmicroservice/province.model';
import { IStreet } from 'app/shared/model/ctsmicroservice/street.model';
import { ISubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';

@Component({
    selector: 'jhi-personal-shipment-admin',
    templateUrl: './personal-shipment-admin.component.html'
})
export class PersonalShipmentAdminComponent implements OnInit, OnDestroy {
    currentAccount: any;
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
    collectAddress: any;
    shipAddress: any;
    selectedInvoiceNumber: any;
    lstProvince: IProvince[] = [];
    lstDistrict: IDistrict[] = [];
    lstSubDistrict: ISubDistrict[] = [];
    lstStreet: IStreet[] = [];
    selectedProvince: any;
    selectedDistrict: any;
    selectedSubDistrict: any;
    selectedStreet: any;
    selectedShipmentType: any;
    lstShipper: IUser[];
    selectedShipper: IUser;
    common: CommonString;

    constructor(
        private personalShipmentService: PersonalShipmentService,
        private accountService: AccountService,
        private invoiceHeaderService: InvoiceHeaderService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private ngxUiLoaderService: NgxUiLoaderService
    ) {
        this.common = new CommonString();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.ngxUiLoaderService.start();
        const param = {
            empId: this.selectedShipper ? this.selectedShipper.id : '',
            invNo: this.selectedInvoiceNumber ? this.selectedInvoiceNumber : '',
            prvId: this.selectedProvince ? this.selectedProvince : '',
            dstId: this.selectedDistrict ? this.selectedDistrict : '',
            sdtId: this.selectedSubDistrict ? this.selectedSubDistrict : '',
            strId: this.selectedStreet ? this.selectedStreet : '',
            type: this.selectedShipmentType ? this.selectedShipmentType : '',
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        };
        this.personalShipmentService.getAllShipmentByParam(param).subscribe(
            (res: HttpResponse<any>) => {
                this.paginateInvoiceHeaders(res.body, res.headers);
                this.ngxUiLoaderService.stop();
            },
            (res: HttpErrorResponse) => {
                this.onError(res.message);
                this.ngxUiLoaderService.stop();
            }
        );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/personal-shipment-admin'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/personal-shipment-admin',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        forkJoin(this.accountService.getLstCity(), this.invoiceHeaderService.getListUserByRole({ role: 'ROLE_SHIPPER' })).subscribe(res => {
            this.lstProvince = res[0].body;
            this.lstShipper = res[1].body;
            this.loadAll();
        });
        this.registerChangeInPersonalShipments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
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

    changeCity() {
        this.lstDistrict = null;
        this.selectedDistrict = null;
        this.lstSubDistrict = null;
        this.selectedSubDistrict = null;
        this.lstStreet = null;
        this.selectedStreet = null;
        const param = { provinceId: this.selectedProvince };
        this.accountService.getLstDistrictByCity(param).subscribe(res => {
            this.lstDistrict = res.body;
        });
    }

    changeDistrict() {
        this.lstSubDistrict = null;
        this.selectedSubDistrict = null;
        this.lstStreet = null;
        this.selectedStreet = null;
        const param = { id: this.selectedDistrict };
        this.accountService.getLstWardByDistrict(param).subscribe(res => {
            this.lstSubDistrict = res.body;
        });
    }

    changeSubDistrict() {
        this.lstStreet = null;
        this.selectedStreet = null;
        const param = { id: this.selectedSubDistrict };
        this.accountService.getLstStreetByWard(param).subscribe(res => {
            this.lstStreet = res.body;
        });
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

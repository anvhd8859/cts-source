import { CommonString } from './../../../../shared/util/request-util';
import { IShipmentInvoice, PersonalShipmentService } from './personal-shipment.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Principal } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { NgxUiLoaderService } from 'ngx-ui-loader/';
import moment = require('moment');

@Component({
    selector: 'jhi-personal-shipment',
    templateUrl: './personal-shipment.component.html'
})
export class PersonalShipmentComponent implements OnInit, OnDestroy {
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
    selectedTypeShipment: any;
    collectAddress: any;
    shipAddress: any;
    selectedInvoiceNumber: any;
    selectedCheckBox: number[] = [];
    common: CommonString;
    fromTime: moment.Moment;
    toTime: moment.Moment;
    selectedTypeFromServer: any;
    selectedInvoiceStatus: any;
    lstInvoiceStatus: any = [{ id: 'collect', text: 'Chờ nhân viên lấy hàng' }, { id: 'last_import', text: 'Nhập kho chi nhánh cuối' }];

    constructor(
        private personalShipmentService: PersonalShipmentService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private ngxUiLoaderService: NgxUiLoaderService
    ) {
        this.common = new CommonString();
        this.selectedTypeShipment = this.common.listTypeShipment[0].id;
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
                this.ngxUiLoaderService.stop();
            },
            (res: HttpErrorResponse) => {
                this.onError(res.message);
                this.ngxUiLoaderService.stop();
            }
        );
    }

    addChecked(i: number, e) {
        let array: number[] = [];
        if (e.target.checked) {
            if (!this.selectedCheckBox.find(ex => ex == i)) {
                this.selectedCheckBox.push(i);
            }
        } else {
            for (const obj of this.selectedCheckBox) {
                if (obj != i) {
                    array.push(obj);
                }
            }
            this.selectedCheckBox = null;
            this.selectedCheckBox = array;
        }
        console.log(this.selectedCheckBox);
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

    createRequest() {}

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

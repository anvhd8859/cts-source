import { InvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { IInvoiceHeader } from './../../../shared/model/ctsmicroservice/invoice-header.model';
import { CommonString } from './../../../shared/util/request-util';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IPayment, Payment } from 'app/shared/model/ctsmicroservice/payment.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { PaymentService } from './payment.service';
import { InvoiceHeaderService } from '../invoice-header';
import { InvoicePackageDetailDTO } from '../import-export-warehouse';
import { Moment } from 'moment';

@Component({
    selector: 'jhi-payment',
    templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit, OnDestroy {
    currentAccount: any;
    payments: PaymentInvoiceDTO[];
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
    invoiceList: InvoicePackageDetailDTO[];
    common: CommonString;
    fromPaymentCreate: Moment;
    toPaymentCreate: Moment;
    fromInvoiceCreate: Moment;
    toInvoiceCreate: Moment;
    lstShipmentType: any = [{ id: '1', text: 'Lấy hàng' }, { id: '0', text: 'Giao hàng' }];
    selectedTypeShipment: any;
    selectedInvoiceNumber: any;

    constructor(
        private paymentService: PaymentService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = 50;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.common = new CommonString();
    }

    clearDatepicker(id: number) {
        switch (id) {
            case 1:
                this.fromInvoiceCreate = null;
                break;
            case 2:
                this.toInvoiceCreate = null;
                break;
            case 3:
                this.fromPaymentCreate = null;
                break;
            case 4:
                this.toPaymentCreate = null;
                break;
        }
    }

    loadAll() {
        this.paymentService
            .findPaymentByParams({
                invoiceNo: this.selectedInvoiceNumber ? this.selectedInvoiceNumber : '',
                type: this.selectedTypeShipment ? this.selectedTypeShipment : '',
                receiveFrom: this.fromPaymentCreate
                    ? this.fromPaymentCreate.year() + '-' + (this.fromPaymentCreate.month() + 1) + '-' + this.fromPaymentCreate.date()
                    : '',
                receiveTo: this.toPaymentCreate
                    ? this.toPaymentCreate.year() + '-' + (this.toPaymentCreate.month() + 1) + '-' + this.toPaymentCreate.date()
                    : '',
                createFrom: this.fromInvoiceCreate
                    ? this.fromInvoiceCreate.year() + '-' + (this.fromInvoiceCreate.month() + 1) + '-' + this.fromInvoiceCreate.date()
                    : '',
                createTo: this.toInvoiceCreate
                    ? this.toInvoiceCreate.year() + '-' + (this.toInvoiceCreate.month() + 1) + '-' + this.toInvoiceCreate.date()
                    : '',
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<PaymentInvoiceDTO[]>) => this.paginatePayments(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/payment'], {
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
            '/payment',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPayments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPayment) {
        return item.id;
    }

    registerChangeInPayments() {
        this.eventSubscriber = this.eventManager.subscribe('paymentListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginatePayments(data: PaymentInvoiceDTO[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.payments = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

export class PaymentInvoiceDTO {
    payment: IPayment;
    invoice: IInvoiceHeader;
    constructor() {
        this.payment = new Payment();
        this.invoice = new InvoiceHeader();
    }
}

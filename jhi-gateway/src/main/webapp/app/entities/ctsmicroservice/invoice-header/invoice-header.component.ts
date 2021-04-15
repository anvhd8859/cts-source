import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { InvoiceHeaderService } from './invoice-header.service';
import * as moment from 'moment';

@Component({
    selector: 'jhi-invoice-header',
    templateUrl: './invoice-header.component.html'
})
export class InvoiceHeaderComponent implements OnInit, OnDestroy {
    currentAccount: any;
    invoiceHeaders: IInvoiceHeader[];
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
    lstStatus: any = [{ id: 'New', text: 'New' }, { id: 'Shipped', text: 'Shipped' }, { id: 'Cancelled', text: 'Cancelled' }];
    selectedStatus: any;
    selectedInvoiceNumber: any;
    createTime: moment.Moment;
    updateTime: moment.Moment;
    receiveTime: moment.Moment;

    constructor(
        private invoiceHeaderService: InvoiceHeaderService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        const param = {
            invoiceNo: this.selectedInvoiceNumber ? this.selectedInvoiceNumber : '',
            status: this.selectedStatus ? this.selectedStatus : '',
            receiveDate: this.receiveTime ? this.receiveTime.date() + '-' + this.receiveTime.month() + '-' + this.receiveTime.year() : '',
            createDate: this.createTime ? this.createTime.date() + '-' + this.createTime.month() + '-' + this.createTime.year() : '',
            updateDate: this.updateTime ? this.updateTime.date() + '-' + this.updateTime.month() + '-' + this.updateTime.year() : '',
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        };
        this.invoiceHeaderService
            .searchByParam(param)
            .subscribe(
                (res: HttpResponse<IInvoiceHeader[]>) => this.paginateInvoiceHeaders(res.body, res.headers),
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
        this.router.navigate(['/invoice-header'], {
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
            '/invoice-header',
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
        this.registerChangeInInvoiceHeaders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInvoiceHeader) {
        return item.id;
    }

    registerChangeInInvoiceHeaders() {
        this.eventSubscriber = this.eventManager.subscribe('invoiceHeaderListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateInvoiceHeaders(data: IInvoiceHeader[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.invoiceHeaders = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

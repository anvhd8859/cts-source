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
import { NgxUiLoaderService } from 'ngx-ui-loader';

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
        private eventManager: JhiEventManager,
        private ngxUiLoaderService: NgxUiLoaderService
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
        this.ngxUiLoaderService.start();
        const param = {
            invoiceNo: this.selectedInvoiceNumber ? this.selectedInvoiceNumber : '',
            status: this.selectedStatus ? this.selectedStatus : '',
            receiveDate: this.receiveTime
                ? this.receiveTime.year() + '-' + (this.receiveTime.month() + 1) + '-' + this.receiveTime.date()
                : '',
            createDate: this.createTime ? this.createTime.year() + '-' + (this.createTime.month() + 1) + '-' + this.createTime.date() : '',
            updateDate: this.updateTime ? this.updateTime.year() + '-' + (this.updateTime.month() + 1) + '-' + this.updateTime.date() : '',
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        };
        this.invoiceHeaderService.searchByParam(param).subscribe(
            (res: HttpResponse<IInvoiceHeader[]>) => {
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

    clearReceiveTime() {
        this.receiveTime = null;
    }

    clearCreateTime() {
        this.createTime = null;
    }

    clearUpdateTime() {
        this.updateTime = null;
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

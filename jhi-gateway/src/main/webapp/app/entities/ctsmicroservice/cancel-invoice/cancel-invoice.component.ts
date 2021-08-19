import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ICancelInvoice } from 'app/shared/model/ctsmicroservice/cancel-invoice.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE, CommonString } from 'app/shared';
import { CancelInvoiceService } from './cancel-invoice.service';

@Component({
    selector: 'jhi-cancel-invoice',
    templateUrl: './cancel-invoice.component.html'
})
export class CancelInvoiceComponent implements OnInit, OnDestroy {
    currentAccount: any;
    cancelInvoices: ICancelInvoice[];
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
    isSaving: boolean;
    common: CommonString = new CommonString();

    constructor(
        private cancelInvoiceService: CancelInvoiceService,
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

    approveAll() {
        this.isSaving = true;
        let param;
        for (const i in this.cancelInvoices) {
            this.cancelInvoices[i].cancel = true;
            this.cancelInvoices[i].changeNote = 'approved';
        }
        param = this.cancelInvoices;
        this.subscribeToSaveResponse(this.cancelInvoiceService.updateMany(param));
    }

    private subscribeToSaveResponse(result: any) {
        result.subscribe((res: any) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.loadAll();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    loadAll() {
        this.cancelInvoiceService
            .getAllRequestCancelInvoice({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<ICancelInvoice[]>) => this.paginateCancelInvoices(res.body, res.headers),
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
        this.router.navigate(['/cancel-invoice'], {
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
            '/cancel-invoice',
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
        this.registerChangeInCancelInvoices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICancelInvoice) {
        return item.id;
    }

    registerChangeInCancelInvoices() {
        this.eventSubscriber = this.eventManager.subscribe('cancelInvoiceListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateCancelInvoices(data: ICancelInvoice[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.cancelInvoices = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error('Đã xảy ra lỗi khi thực hiện', null, null);
    }
}

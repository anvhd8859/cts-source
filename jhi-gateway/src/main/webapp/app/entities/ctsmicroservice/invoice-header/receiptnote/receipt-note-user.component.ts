import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IReceiptnote } from 'app/shared/model/ctsmicroservice/receiptnote.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { ReceiptnoteService } from './receiptnote.service';

@Component({
    selector: 'jhi-receipt-note-user',
    templateUrl: './receipt-note-user.component.html'
})
export class ReceiptnoteUserComponent implements OnInit, OnDestroy {
    currentAccount: any;
    receiptNoteInvoices: IUserReceiptNote[];
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

    constructor(
        private receiptnoteService: ReceiptnoteService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
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
        this.receiptnoteService
            .getAllReceiptNotConfirmByUser({
                id: this.currentAccount.id,
                page: this.page - 1,
                size: this.itemsPerPage
            })
            .subscribe(
                (res: HttpResponse<any>) => {
                    this.receiptNoteInvoices = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.registerChangeInReceiptnotes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IReceiptnote) {
        return item.id;
    }

    registerChangeInReceiptnotes() {
        this.eventSubscriber = this.eventManager.subscribe('receiptnoteListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error('Đã xảy ra lỗi khi thực hiện', null, null);
    }
}

export interface IUserReceiptNote {
    invoiceHeader?: IInvoiceHeader;
    receiptNote?: IReceiptnote;
}

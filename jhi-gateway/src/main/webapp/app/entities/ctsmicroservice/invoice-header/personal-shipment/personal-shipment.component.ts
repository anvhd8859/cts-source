import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IPersonalShipment } from 'app/shared/model/ctsmicroservice/personal-shipment.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import * as moment from 'moment';
import { InvoiceHeaderService } from '..';
import { NgxUiLoaderService } from 'ngx-ui-loader/';

@Component({
    selector: 'jhi-personal-shipment',
    templateUrl: './personal-shipment.component.html'
})
export class PersonalShipmentComponent implements OnInit, OnDestroy {
    currentAccount: any;
    invoiceHeaders: IInvoiceHeader[];
    personalShipments: IPersonalShipment[];
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
    listTypeShipment: any = [{ id: 'collect', text: 'Lấy hàng' }, { id: 'delivery', text: 'Giao hàng' }];
    collectAddress: any;
    shipAddress: any;
    selectedInvoiceNumber: any;

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
            type: this.selectedTypeShipment ? this.selectedTypeShipment : '',
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        };
        this.invoiceHeaderService.searchInvoiceByStatus(param).subscribe(
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
        this.router.navigate(['/personal-shipment'], {
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

    trackId(index: number, item: IPersonalShipment) {
        return item.id;
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

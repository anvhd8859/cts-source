import { CommonString } from './../../../../shared/util/request-util';
import { IShipmentInvoice, PersonalShipmentService } from './personal-shipment.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Principal } from 'app/core';
import { DATE_TIME_FORMAT, ITEMS_PER_PAGE } from 'app/shared';
import { NgxUiLoaderService } from 'ngx-ui-loader/';

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
    common: CommonString;

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
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
            this.common = new CommonString();
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
        this.personalShipmentService.getPersonalShipmentByShipper(param).subscribe(
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

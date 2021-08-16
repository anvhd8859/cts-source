import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiParseLinks } from 'ng-jhipster';

import { IWarehouseTransferRequest } from 'app/shared/model/ctsmicroservice/warehouse-transfer-request.model';
import { Principal } from 'app/core';
import { WarehouseTransferRequestService } from './warehouse-transfer-request.service';
import { TransferInvoicePackageDTO } from '../export-invoice-package';
import { IInvoicePackageShipment } from '../import-invoice-package';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';

@Component({
    selector: 'jhi-warehouse-transfer-request',
    templateUrl: './warehouse-transfer-request.component.html'
})
export class WarehouseTransferRequestComponent implements OnInit, OnDestroy {
    warehouseTransferRequests: TransferInvoicePackageDTO[];
    currentAccount: any;
    eventSubscriber: Subscription;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private warehouseTransferRequestService: WarehouseTransferRequestService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.warehouseTransferRequestService.getWarehouseTransferByOffice().subscribe(
            (res: HttpResponse<any>) => {
                this.paginateData(res.body, res.headers);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInWarehouseTransferRequests();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWarehouseTransferRequest) {
        return item.id;
    }

    registerChangeInWarehouseTransferRequests() {
        this.eventSubscriber = this.eventManager.subscribe('warehouseTransferRequestListModification', response => this.loadAll());
    }

    private paginateData(data: TransferInvoicePackageDTO[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.warehouseTransferRequests = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/warehouse-transfer-request'], {
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
            '/warehouse-transfer-request',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    totalPackages(list?: IInvoicePackageShipment[]) {
        let total = 0;
        for (const obj of list) {
            total += obj.invoicePackageList.length;
        }
        return total;
    }
}

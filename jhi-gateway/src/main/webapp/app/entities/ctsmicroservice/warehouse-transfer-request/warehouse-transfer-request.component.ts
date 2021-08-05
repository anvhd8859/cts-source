import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWarehouseTransferRequest } from 'app/shared/model/ctsmicroservice/warehouse-transfer-request.model';
import { Principal } from 'app/core';
import { WarehouseTransferRequestService } from './warehouse-transfer-request.service';

@Component({
    selector: 'jhi-warehouse-transfer-request',
    templateUrl: './warehouse-transfer-request.component.html'
})
export class WarehouseTransferRequestComponent implements OnInit, OnDestroy {
    warehouseTransferRequests: IWarehouseTransferRequest[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private warehouseTransferRequestService: WarehouseTransferRequestService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.warehouseTransferRequestService.query().subscribe(
            (res: HttpResponse<IWarehouseTransferRequest[]>) => {
                this.warehouseTransferRequests = res.body;
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

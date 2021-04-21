import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWarehouse } from 'app/shared/model/ctsmicroservice/warehouse.model';
import { Principal } from 'app/core';
import { WarehouseService } from './warehouse.service';

@Component({
    selector: 'jhi-warehouse',
    templateUrl: './warehouse.component.html'
})
export class WarehouseComponent implements OnInit, OnDestroy {
    warehouses: IWarehouse[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private warehouseService: WarehouseService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.warehouseService.query().subscribe(
            (res: HttpResponse<IWarehouse[]>) => {
                this.warehouses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInWarehouses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWarehouse) {
        return item.id;
    }

    registerChangeInWarehouses() {
        this.eventSubscriber = this.eventManager.subscribe('warehouseListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

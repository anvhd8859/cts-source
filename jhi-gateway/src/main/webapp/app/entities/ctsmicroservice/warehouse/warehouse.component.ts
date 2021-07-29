import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWarehouse } from 'app/shared/model/ctsmicroservice/warehouse.model';
import { Principal } from 'app/core';
import { WarehouseService } from './warehouse.service';
import { IOffice } from './../../../shared/model/ctsmicroservice/office.model';

@Component({
    selector: 'jhi-warehouse',
    templateUrl: './warehouse.component.html'
})
export class WarehouseComponent implements OnInit, OnDestroy {
    warehouses: any[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private warehouseService: WarehouseService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.warehouseService.getFullDetail().subscribe(
            (res: HttpResponse<any[]>) => {
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
    trackName(index: string, item: IOffice) {
        return item.officeName;
    }

    registerChangeInWarehouses() {
        this.eventSubscriber = this.eventManager.subscribe('warehouseListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error('Đã xảy ra lỗi khi thực hiện', null, null);
    }
}

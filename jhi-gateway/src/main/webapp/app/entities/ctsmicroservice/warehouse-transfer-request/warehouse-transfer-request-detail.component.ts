import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWarehouseTransferRequest } from 'app/shared/model/ctsmicroservice/warehouse-transfer-request.model';

@Component({
    selector: 'jhi-warehouse-transfer-request-detail',
    templateUrl: './warehouse-transfer-request-detail.component.html'
})
export class WarehouseTransferRequestDetailComponent implements OnInit {
    warehouseTransferRequest: IWarehouseTransferRequest;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ warehouseTransferRequest }) => {
            this.warehouseTransferRequest = warehouseTransferRequest;
        });
    }

    previousState() {
        window.history.back();
    }
}

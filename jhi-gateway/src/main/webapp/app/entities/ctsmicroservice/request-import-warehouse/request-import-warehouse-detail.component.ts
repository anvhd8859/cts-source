import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRequestImportWarehouse } from 'app/shared/model/ctsmicroservice/request-import-warehouse.model';

@Component({
    selector: 'jhi-request-import-warehouse-detail',
    templateUrl: './request-import-warehouse-detail.component.html'
})
export class RequestImportWarehouseDetailComponent implements OnInit {
    requestImportWarehouse: IRequestImportWarehouse;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ requestImportWarehouse }) => {
            this.requestImportWarehouse = requestImportWarehouse;
        });
    }

    previousState() {
        window.history.back();
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRequestExportWarehouse } from 'app/shared/model/ctsmicroservice/request-export-warehouse.model';

@Component({
    selector: 'jhi-request-export-warehouse-detail',
    templateUrl: './request-export-warehouse-detail.component.html'
})
export class RequestExportWarehouseDetailComponent implements OnInit {
    requestExportWarehouse: IRequestExportWarehouse;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ requestExportWarehouse }) => {
            this.requestExportWarehouse = requestExportWarehouse;
        });
    }

    previousState() {
        window.history.back();
    }
}

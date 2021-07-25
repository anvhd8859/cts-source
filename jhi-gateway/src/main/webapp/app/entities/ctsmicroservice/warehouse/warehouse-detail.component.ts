import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWarehouse } from 'app/shared/model/ctsmicroservice/warehouse.model';
import { IOffice } from './../../../shared/model/ctsmicroservice/office.model';

@Component({
    selector: 'jhi-warehouse-detail',
    templateUrl: './warehouse-detail.component.html'
})
export class WarehouseDetailComponent implements OnInit {
    warehouse: IWarehouse;
    office: IOffice;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ warehouse }) => {
            this.warehouse = warehouse;
        });
    }

    previousState() {
        window.history.back();
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWarehouse } from 'app/shared/model/ctsmicroservice/warehouse.model';
import { IOffice } from './../../../shared/model/ctsmicroservice/office.model';
import { OfficeService } from './../office/office.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-warehouse-detail',
    templateUrl: './warehouse-detail.component.html'
})
export class WarehouseDetailComponent implements OnInit {
    warehouse: IWarehouse;
    office: IOffice;

    constructor(private activatedRoute: ActivatedRoute, private OfficeService: OfficeService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(warehouse => {
            this.warehouse = warehouse;
            this.OfficeService.find(this.warehouse.officeId).subscribe((res: HttpResponse<IOffice>) => {
                this.office = res.body;
            });
        });
    }

    previousState() {
        window.history.back();
    }
}

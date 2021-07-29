import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IOffice } from 'app/shared/model/ctsmicroservice/office.model';
import { IWarehouse } from 'app/shared/model/ctsmicroservice/warehouse.model';
import { WarehouseService } from './warehouse.service';
import { OfficeService } from 'app/entities/ctsmicroservice/office/office.service';

@Component({
    selector: 'jhi-warehouse-update',
    templateUrl: './warehouse-update.component.html'
})
export class WarehouseUpdateComponent implements OnInit {
    offices: IOffice[];
    selectedOffice: IOffice;
    warehouse: IWarehouse;
    isSaving: boolean;
    createDate: string;
    updateDate: string;

    constructor(private warehouseService: WarehouseService, private officeService: OfficeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ warehouse }) => {
            this.warehouse = warehouse;
            this.createDate = this.warehouse.createDate != null ? this.warehouse.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.warehouse.updateDate != null ? this.warehouse.updateDate.format(DATE_TIME_FORMAT) : null;
        });
        this.officeService.query({ page: 0, size: 999 }).subscribe((res: HttpResponse<IOffice[]>) => {
            this.offices = res.body;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.warehouse.officeId = this.selectedOffice.id;
        this.warehouse.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.warehouse.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.warehouse.id !== undefined) {
            this.subscribeToSaveResponse(this.warehouseService.update(this.warehouse));
        } else {
            this.subscribeToSaveResponse(this.warehouseService.create(this.warehouse));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IWarehouse>>) {
        result.subscribe((res: HttpResponse<IWarehouse>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

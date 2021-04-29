import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRequestExportWarehouse } from 'app/shared/model/ctsmicroservice/request-export-warehouse.model';
import { RequestExportWarehouseService } from './request-export-warehouse.service';

@Component({
    selector: 'jhi-request-export-warehouse-update',
    templateUrl: './request-export-warehouse-update.component.html'
})
export class RequestExportWarehouseUpdateComponent implements OnInit {
    requestExportWarehouse: IRequestExportWarehouse;
    isSaving: boolean;
    shipDate: string;
    createDate: string;
    updateDate: string;

    constructor(private requestExportWarehouseService: RequestExportWarehouseService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ requestExportWarehouse }) => {
            this.requestExportWarehouse = requestExportWarehouse;
            this.shipDate =
                this.requestExportWarehouse.shipDate != null ? this.requestExportWarehouse.shipDate.format(DATE_TIME_FORMAT) : null;
            this.createDate =
                this.requestExportWarehouse.createDate != null ? this.requestExportWarehouse.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate =
                this.requestExportWarehouse.updateDate != null ? this.requestExportWarehouse.updateDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.requestExportWarehouse.shipDate = this.shipDate != null ? moment(this.shipDate, DATE_TIME_FORMAT) : null;
        this.requestExportWarehouse.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.requestExportWarehouse.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.requestExportWarehouse.id !== undefined) {
            this.subscribeToSaveResponse(this.requestExportWarehouseService.update(this.requestExportWarehouse));
        } else {
            this.subscribeToSaveResponse(this.requestExportWarehouseService.create(this.requestExportWarehouse));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRequestExportWarehouse>>) {
        result.subscribe(
            (res: HttpResponse<IRequestExportWarehouse>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

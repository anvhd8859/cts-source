import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRequestImportWarehouse } from 'app/shared/model/ctsmicroservice/request-import-warehouse.model';
import { RequestImportWarehouseService } from './request-import-warehouse.service';

@Component({
    selector: 'jhi-request-import-warehouse-update',
    templateUrl: './request-import-warehouse-update.component.html'
})
export class RequestImportWarehouseUpdateComponent implements OnInit {
    requestImportWarehouse: IRequestImportWarehouse;
    isSaving: boolean;
    shipDate: string;
    createDate: string;
    updateDate: string;

    constructor(private requestImportWarehouseService: RequestImportWarehouseService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ requestImportWarehouse }) => {
            this.requestImportWarehouse = requestImportWarehouse;
            this.shipDate =
                this.requestImportWarehouse.shipDate != null ? this.requestImportWarehouse.shipDate.format(DATE_TIME_FORMAT) : null;
            this.createDate =
                this.requestImportWarehouse.createDate != null ? this.requestImportWarehouse.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate =
                this.requestImportWarehouse.updateDate != null ? this.requestImportWarehouse.updateDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.requestImportWarehouse.shipDate = this.shipDate != null ? moment(this.shipDate, DATE_TIME_FORMAT) : null;
        this.requestImportWarehouse.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.requestImportWarehouse.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.requestImportWarehouse.id !== undefined) {
            this.subscribeToSaveResponse(this.requestImportWarehouseService.update(this.requestImportWarehouse));
        } else {
            this.subscribeToSaveResponse(this.requestImportWarehouseService.create(this.requestImportWarehouse));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRequestImportWarehouse>>) {
        result.subscribe(
            (res: HttpResponse<IRequestImportWarehouse>) => this.onSaveSuccess(),
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

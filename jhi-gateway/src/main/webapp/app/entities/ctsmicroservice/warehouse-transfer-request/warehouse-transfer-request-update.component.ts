import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IWarehouseTransferRequest } from 'app/shared/model/ctsmicroservice/warehouse-transfer-request.model';
import { WarehouseTransferRequestService } from './warehouse-transfer-request.service';

@Component({
    selector: 'jhi-warehouse-transfer-request-update',
    templateUrl: './warehouse-transfer-request-update.component.html'
})
export class WarehouseTransferRequestUpdateComponent implements OnInit {
    warehouseTransferRequest: IWarehouseTransferRequest;
    isSaving: boolean;
    receiveDate: string;
    createDate: string;
    updateDate: string;

    constructor(private warehouseTransferRequestService: WarehouseTransferRequestService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ warehouseTransferRequest }) => {
            this.warehouseTransferRequest = warehouseTransferRequest;
            this.receiveDate =
                this.warehouseTransferRequest.receiveDate != null
                    ? this.warehouseTransferRequest.receiveDate.format(DATE_TIME_FORMAT)
                    : null;
            this.createDate =
                this.warehouseTransferRequest.createDate != null ? this.warehouseTransferRequest.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate =
                this.warehouseTransferRequest.updateDate != null ? this.warehouseTransferRequest.updateDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.warehouseTransferRequest.receiveDate = this.receiveDate != null ? moment(this.receiveDate, DATE_TIME_FORMAT) : null;
        this.warehouseTransferRequest.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.warehouseTransferRequest.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.warehouseTransferRequest.id !== undefined) {
            this.subscribeToSaveResponse(this.warehouseTransferRequestService.update(this.warehouseTransferRequest));
        } else {
            this.subscribeToSaveResponse(this.warehouseTransferRequestService.create(this.warehouseTransferRequest));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IWarehouseTransferRequest>>) {
        result.subscribe(
            (res: HttpResponse<IWarehouseTransferRequest>) => this.onSaveSuccess(),
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

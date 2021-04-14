import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITransferPacking } from 'app/shared/model/ctsmicroservice/transfer-packing.model';
import { TransferPackingService } from './transfer-packing.service';

@Component({
    selector: 'jhi-transfer-packing-update',
    templateUrl: './transfer-packing-update.component.html'
})
export class TransferPackingUpdateComponent implements OnInit {
    transferPacking: ITransferPacking;
    isSaving: boolean;
    packDate: string;
    createDate: string;
    updateDate: string;

    constructor(private transferPackingService: TransferPackingService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ transferPacking }) => {
            this.transferPacking = transferPacking;
            this.packDate = this.transferPacking.packDate != null ? this.transferPacking.packDate.format(DATE_TIME_FORMAT) : null;
            this.createDate = this.transferPacking.createDate != null ? this.transferPacking.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.transferPacking.updateDate != null ? this.transferPacking.updateDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.transferPacking.packDate = this.packDate != null ? moment(this.packDate, DATE_TIME_FORMAT) : null;
        this.transferPacking.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.transferPacking.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.transferPacking.id !== undefined) {
            this.subscribeToSaveResponse(this.transferPackingService.update(this.transferPacking));
        } else {
            this.subscribeToSaveResponse(this.transferPackingService.create(this.transferPacking));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITransferPacking>>) {
        result.subscribe((res: HttpResponse<ITransferPacking>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

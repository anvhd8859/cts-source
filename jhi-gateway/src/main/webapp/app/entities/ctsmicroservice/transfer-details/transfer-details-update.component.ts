import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITransferDetails } from 'app/shared/model/ctsmicroservice/transfer-details.model';
import { TransferDetailsService } from './transfer-details.service';

@Component({
    selector: 'jhi-transfer-details-update',
    templateUrl: './transfer-details-update.component.html'
})
export class TransferDetailsUpdateComponent implements OnInit {
    transferDetails: ITransferDetails;
    isSaving: boolean;
    createDate: string;
    updateDate: string;

    constructor(private transferDetailsService: TransferDetailsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ transferDetails }) => {
            this.transferDetails = transferDetails;
            this.createDate = this.transferDetails.createDate != null ? this.transferDetails.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.transferDetails.updateDate != null ? this.transferDetails.updateDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.transferDetails.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.transferDetails.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.transferDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.transferDetailsService.update(this.transferDetails));
        } else {
            this.subscribeToSaveResponse(this.transferDetailsService.create(this.transferDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITransferDetails>>) {
        result.subscribe((res: HttpResponse<ITransferDetails>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

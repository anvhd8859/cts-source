import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRequestDetails } from 'app/shared/model/ctsmicroservice/request-details.model';
import { RequestDetailsService } from './request-details.service';

@Component({
    selector: 'jhi-request-details-update',
    templateUrl: './request-details-update.component.html'
})
export class RequestDetailsUpdateComponent implements OnInit {
    requestDetails: IRequestDetails;
    isSaving: boolean;
    createDate: string;
    updateDate: string;

    constructor(private requestDetailsService: RequestDetailsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ requestDetails }) => {
            this.requestDetails = requestDetails;
            this.createDate = this.requestDetails.createDate != null ? this.requestDetails.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.requestDetails.updateDate != null ? this.requestDetails.updateDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.requestDetails.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.requestDetails.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.requestDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.requestDetailsService.update(this.requestDetails));
        } else {
            this.subscribeToSaveResponse(this.requestDetailsService.create(this.requestDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRequestDetails>>) {
        result.subscribe((res: HttpResponse<IRequestDetails>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

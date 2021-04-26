import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IOffice } from 'app/shared/model/ctsmicroservice/office.model';
import { OfficeService } from './office.service';

@Component({
    selector: 'jhi-office-update',
    templateUrl: './office-update.component.html'
})
export class OfficeUpdateComponent implements OnInit {
    office: IOffice;
    isSaving: boolean;
    createDate: string;
    updateDate: string;

    constructor(private officeService: OfficeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ office }) => {
            this.office = office;
            this.createDate = this.office.createDate != null ? this.office.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.office.updateDate != null ? this.office.updateDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.office.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.office.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.office.id !== undefined) {
            this.subscribeToSaveResponse(this.officeService.update(this.office));
        } else {
            this.subscribeToSaveResponse(this.officeService.create(this.office));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOffice>>) {
        result.subscribe((res: HttpResponse<IOffice>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

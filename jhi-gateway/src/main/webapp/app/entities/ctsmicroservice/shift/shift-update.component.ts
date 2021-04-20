import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IShift } from 'app/shared/model/ctsmicroservice/shift.model';
import { ShiftService } from './shift.service';

@Component({
    selector: 'jhi-shift-update',
    templateUrl: './shift-update.component.html'
})
export class ShiftUpdateComponent implements OnInit {
    shift: IShift;
    isSaving: boolean;
    createDate: string;
    updateDate: string;

    constructor(private shiftService: ShiftService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ shift }) => {
            this.shift = shift;
            this.createDate = this.shift.createDate != null ? this.shift.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.shift.updateDate != null ? this.shift.updateDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.shift.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.shift.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.shift.id !== undefined) {
            this.subscribeToSaveResponse(this.shiftService.update(this.shift));
        } else {
            this.subscribeToSaveResponse(this.shiftService.create(this.shift));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IShift>>) {
        result.subscribe((res: HttpResponse<IShift>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

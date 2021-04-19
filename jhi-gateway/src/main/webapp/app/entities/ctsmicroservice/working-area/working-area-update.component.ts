import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IWorkingArea } from 'app/shared/model/ctsmicroservice/working-area.model';
import { WorkingAreaService } from './working-area.service';

@Component({
    selector: 'jhi-working-area-update',
    templateUrl: './working-area-update.component.html'
})
export class WorkingAreaUpdateComponent implements OnInit {
    workingArea: IWorkingArea;
    isSaving: boolean;
    createDate: string;
    updateDate: string;

    constructor(private workingAreaService: WorkingAreaService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ workingArea }) => {
            this.workingArea = workingArea;
            this.createDate = this.workingArea.createDate != null ? this.workingArea.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.workingArea.updateDate != null ? this.workingArea.updateDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.workingArea.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.workingArea.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.workingArea.id !== undefined) {
            this.subscribeToSaveResponse(this.workingAreaService.update(this.workingArea));
        } else {
            this.subscribeToSaveResponse(this.workingAreaService.create(this.workingArea));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IWorkingArea>>) {
        result.subscribe((res: HttpResponse<IWorkingArea>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

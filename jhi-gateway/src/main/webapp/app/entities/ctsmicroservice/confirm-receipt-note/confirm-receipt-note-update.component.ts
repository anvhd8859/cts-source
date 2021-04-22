import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IConfirmReceiptNote } from 'app/shared/model/ctsmicroservice/confirm-receipt-note.model';
import { ConfirmReceiptNoteService } from './confirm-receipt-note.service';

@Component({
    selector: 'jhi-confirm-receipt-note-update',
    templateUrl: './confirm-receipt-note-update.component.html'
})
export class ConfirmReceiptNoteUpdateComponent implements OnInit {
    confirmReceiptNote: IConfirmReceiptNote;
    isSaving: boolean;
    createDate: string;
    updateDate: string;

    constructor(private confirmReceiptNoteService: ConfirmReceiptNoteService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ confirmReceiptNote }) => {
            this.confirmReceiptNote = confirmReceiptNote;
            this.createDate =
                this.confirmReceiptNote.createDate != null ? this.confirmReceiptNote.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate =
                this.confirmReceiptNote.updateDate != null ? this.confirmReceiptNote.updateDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.confirmReceiptNote.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.confirmReceiptNote.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.confirmReceiptNote.id !== undefined) {
            this.subscribeToSaveResponse(this.confirmReceiptNoteService.update(this.confirmReceiptNote));
        } else {
            this.subscribeToSaveResponse(this.confirmReceiptNoteService.create(this.confirmReceiptNote));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IConfirmReceiptNote>>) {
        result.subscribe((res: HttpResponse<IConfirmReceiptNote>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

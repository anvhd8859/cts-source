import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IReceiptnote, Receiptnote } from 'app/shared/model/ctsmicroservice/receiptnote.model';
import { ReceiptnoteService } from './receiptnote.service';
import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';

@Component({
    selector: 'jhi-receiptnote-update',
    templateUrl: './receiptnote-update.component.html'
})
export class ReceiptnoteUpdateComponent implements OnInit {
    receiptnote: IReceiptnote;
    invoiceHeader: IInvoiceHeader;
    isSaving: boolean;
    createDate: string;
    updateDate: string;

    constructor(private receiptnoteService: ReceiptnoteService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ receiptnote }) => {
            if (receiptnote !== undefined) {
                this.receiptnote = receiptnote;
            } else {
                this.receiptnote = new Receiptnote();
            }
            this.createDate = this.receiptnote.createDate != null ? this.receiptnote.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.receiptnote.updateDate != null ? this.receiptnote.updateDate.format(DATE_TIME_FORMAT) : null;
        });
        this.activatedRoute.data.subscribe(({ invoiceHeader }) => {
            if (invoiceHeader !== undefined) {
                this.invoiceHeader = invoiceHeader;
                this.receiptnote.invoiceHeaderId = this.invoiceHeader.id;
            }
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.receiptnote.createDate =
            this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : moment(new Date(), DATE_TIME_FORMAT);
        this.receiptnote.updateDate = moment(new Date(), DATE_TIME_FORMAT);
        if (this.receiptnote.id !== undefined) {
            this.subscribeToSaveResponse(this.receiptnoteService.update(this.receiptnote));
        } else {
            this.subscribeToSaveResponse(this.receiptnoteService.create(this.receiptnote));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IReceiptnote>>) {
        result.subscribe((res: HttpResponse<IReceiptnote>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

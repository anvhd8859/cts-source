import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IInvoiceDetails } from 'app/shared/model/ctsmicroservice/invoice-details.model';
import { InvoiceDetailsService } from './invoice-details.service';

@Component({
    selector: 'jhi-invoice-details-update',
    templateUrl: './invoice-details-update.component.html'
})
export class InvoiceDetailsUpdateComponent implements OnInit {
    invoiceDetails: IInvoiceDetails;
    isSaving: boolean;
    createDate: string;
    updateDate: string;

    constructor(private invoiceDetailsService: InvoiceDetailsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ invoiceDetails }) => {
            this.invoiceDetails = invoiceDetails;
            this.createDate = this.invoiceDetails.createDate != null ? this.invoiceDetails.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.invoiceDetails.updateDate != null ? this.invoiceDetails.updateDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.invoiceDetails.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.invoiceDetails.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.invoiceDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.invoiceDetailsService.update(this.invoiceDetails));
        } else {
            this.subscribeToSaveResponse(this.invoiceDetailsService.create(this.invoiceDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IInvoiceDetails>>) {
        result.subscribe((res: HttpResponse<IInvoiceDetails>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

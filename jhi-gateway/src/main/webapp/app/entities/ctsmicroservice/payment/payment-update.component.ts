import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPayment } from 'app/shared/model/ctsmicroservice/payment.model';
import { PaymentService } from './payment.service';

@Component({
    selector: 'jhi-payment-update',
    templateUrl: './payment-update.component.html'
})
export class PaymentUpdateComponent implements OnInit {
    payment: IPayment;
    isSaving: boolean;
    createDate: string;
    updateDate: string;

    constructor(private paymentService: PaymentService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ payment }) => {
            this.payment = payment;
            this.createDate = this.payment.createDate != null ? this.payment.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.payment.updateDate != null ? this.payment.updateDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.payment.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.payment.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.payment.id !== undefined) {
            this.subscribeToSaveResponse(this.paymentService.update(this.payment));
        } else {
            this.subscribeToSaveResponse(this.paymentService.create(this.payment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPayment>>) {
        result.subscribe((res: HttpResponse<IPayment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

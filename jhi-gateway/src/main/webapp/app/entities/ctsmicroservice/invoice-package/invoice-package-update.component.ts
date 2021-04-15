import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IInvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';
import { InvoicePackageService } from './invoice-package.service';

@Component({
    selector: 'jhi-invoice-package-update',
    templateUrl: './invoice-package-update.component.html'
})
export class InvoicePackageUpdateComponent implements OnInit {
    invoicePackage: IInvoicePackage;
    isSaving: boolean;
    createDate: string;
    updateDate: string;

    constructor(private invoicePackageService: InvoicePackageService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ invoicePackage }) => {
            this.invoicePackage = invoicePackage;
            this.createDate = this.invoicePackage.createDate != null ? this.invoicePackage.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.invoicePackage.updateDate != null ? this.invoicePackage.updateDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.invoicePackage.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.invoicePackage.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.invoicePackage.id !== undefined) {
            this.subscribeToSaveResponse(this.invoicePackageService.update(this.invoicePackage));
        } else {
            this.subscribeToSaveResponse(this.invoicePackageService.create(this.invoicePackage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IInvoicePackage>>) {
        result.subscribe((res: HttpResponse<IInvoicePackage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

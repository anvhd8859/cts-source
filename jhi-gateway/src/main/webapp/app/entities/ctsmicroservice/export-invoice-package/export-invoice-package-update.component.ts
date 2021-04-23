import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IExportInvoicePackage } from 'app/shared/model/ctsmicroservice/export-invoice-package.model';
import { ExportInvoicePackageService } from './export-invoice-package.service';

@Component({
    selector: 'jhi-export-invoice-package-update',
    templateUrl: './export-invoice-package-update.component.html'
})
export class ExportInvoicePackageUpdateComponent implements OnInit {
    exportInvoicePackage: IExportInvoicePackage;
    isSaving: boolean;
    createDate: string;
    updateDate: string;

    constructor(private exportInvoicePackageService: ExportInvoicePackageService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ exportInvoicePackage }) => {
            this.exportInvoicePackage = exportInvoicePackage;
            this.createDate =
                this.exportInvoicePackage.createDate != null ? this.exportInvoicePackage.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate =
                this.exportInvoicePackage.updateDate != null ? this.exportInvoicePackage.updateDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.exportInvoicePackage.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.exportInvoicePackage.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.exportInvoicePackage.id !== undefined) {
            this.subscribeToSaveResponse(this.exportInvoicePackageService.update(this.exportInvoicePackage));
        } else {
            this.subscribeToSaveResponse(this.exportInvoicePackageService.create(this.exportInvoicePackage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IExportInvoicePackage>>) {
        result.subscribe(
            (res: HttpResponse<IExportInvoicePackage>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

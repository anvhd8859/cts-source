import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IImportInvoicePackage } from 'app/shared/model/ctsmicroservice/import-invoice-package.model';
import { ImportInvoicePackageService } from './import-invoice-package.service';

@Component({
    selector: 'jhi-import-invoice-package-update',
    templateUrl: './import-invoice-package-update.component.html'
})
export class ImportInvoicePackageUpdateComponent implements OnInit {
    importInvoicePackage: IImportInvoicePackage;
    isSaving: boolean;
    createDate: string;
    updateDate: string;

    constructor(private importInvoicePackageService: ImportInvoicePackageService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ importInvoicePackage }) => {
            this.importInvoicePackage = importInvoicePackage;
            this.createDate =
                this.importInvoicePackage.createDate != null ? this.importInvoicePackage.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate =
                this.importInvoicePackage.updateDate != null ? this.importInvoicePackage.updateDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.importInvoicePackage.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.importInvoicePackage.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.importInvoicePackage.id !== undefined) {
            this.subscribeToSaveResponse(this.importInvoicePackageService.update(this.importInvoicePackage));
        } else {
            this.subscribeToSaveResponse(this.importInvoicePackageService.create(this.importInvoicePackage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IImportInvoicePackage>>) {
        result.subscribe(
            (res: HttpResponse<IImportInvoicePackage>) => this.onSaveSuccess(),
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

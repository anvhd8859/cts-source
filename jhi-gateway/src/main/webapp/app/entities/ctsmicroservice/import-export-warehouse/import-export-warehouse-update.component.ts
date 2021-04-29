import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IImportExportWarehouse } from 'app/shared/model/ctsmicroservice/import-export-warehouse.model';
import { ImportExportWarehouseService } from './import-export-warehouse.service';

@Component({
    selector: 'jhi-import-export-warehouse-update',
    templateUrl: './import-export-warehouse-update.component.html'
})
export class ImportExportWarehouseUpdateComponent implements OnInit {
    importExportWarehouse: IImportExportWarehouse;
    isSaving: boolean;
    shipDate: string;
    createDate: string;
    updateDate: string;

    constructor(private importExportWarehouseService: ImportExportWarehouseService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ importExportWarehouse }) => {
            this.importExportWarehouse = importExportWarehouse;
            this.shipDate =
                this.importExportWarehouse.shipDate != null ? this.importExportWarehouse.shipDate.format(DATE_TIME_FORMAT) : null;
            this.createDate =
                this.importExportWarehouse.createDate != null ? this.importExportWarehouse.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate =
                this.importExportWarehouse.updateDate != null ? this.importExportWarehouse.updateDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.importExportWarehouse.shipDate = this.shipDate != null ? moment(this.shipDate, DATE_TIME_FORMAT) : null;
        this.importExportWarehouse.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.importExportWarehouse.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.importExportWarehouse.id !== undefined) {
            this.subscribeToSaveResponse(this.importExportWarehouseService.update(this.importExportWarehouse));
        } else {
            this.subscribeToSaveResponse(this.importExportWarehouseService.create(this.importExportWarehouse));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IImportExportWarehouse>>) {
        result.subscribe(
            (res: HttpResponse<IImportExportWarehouse>) => this.onSaveSuccess(),
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

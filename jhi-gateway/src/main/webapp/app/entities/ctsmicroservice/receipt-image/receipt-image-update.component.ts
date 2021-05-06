import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils } from 'ng-jhipster';

import { IReceiptImage } from 'app/shared/model/ctsmicroservice/receipt-image.model';
import { ReceiptImageService } from './receipt-image.service';

@Component({
    selector: 'jhi-receipt-image-update',
    templateUrl: './receipt-image-update.component.html'
})
export class ReceiptImageUpdateComponent implements OnInit {
    receiptImage: IReceiptImage;
    isSaving: boolean;
    createDate: string;
    updateDate: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private receiptImageService: ReceiptImageService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ receiptImage }) => {
            this.receiptImage = receiptImage;
            this.createDate = this.receiptImage.createDate != null ? this.receiptImage.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.receiptImage.updateDate != null ? this.receiptImage.updateDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.receiptImage, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.receiptImage.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.receiptImage.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.receiptImage.id !== undefined) {
            this.subscribeToSaveResponse(this.receiptImageService.update(this.receiptImage));
        } else {
            this.subscribeToSaveResponse(this.receiptImageService.create(this.receiptImage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IReceiptImage>>) {
        result.subscribe((res: HttpResponse<IReceiptImage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

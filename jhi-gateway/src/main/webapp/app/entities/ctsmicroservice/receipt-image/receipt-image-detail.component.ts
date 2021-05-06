import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IReceiptImage } from 'app/shared/model/ctsmicroservice/receipt-image.model';

@Component({
    selector: 'jhi-receipt-image-detail',
    templateUrl: './receipt-image-detail.component.html'
})
export class ReceiptImageDetailComponent implements OnInit {
    receiptImage: IReceiptImage;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ receiptImage }) => {
            this.receiptImage = receiptImage;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IReceiptImage } from 'app/shared/model/ctsmicroservice/receipt-image.model';
import { Principal } from 'app/core';
import { ReceiptImageService } from './receipt-image.service';

@Component({
    selector: 'jhi-receipt-image',
    templateUrl: './receipt-image.component.html'
})
export class ReceiptImageComponent implements OnInit, OnDestroy {
    receiptImages: IReceiptImage[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private receiptImageService: ReceiptImageService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.receiptImageService.query().subscribe(
            (res: HttpResponse<IReceiptImage[]>) => {
                this.receiptImages = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInReceiptImages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IReceiptImage) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInReceiptImages() {
        this.eventSubscriber = this.eventManager.subscribe('receiptImageListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

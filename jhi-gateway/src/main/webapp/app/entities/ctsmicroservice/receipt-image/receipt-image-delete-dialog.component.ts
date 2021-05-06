import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReceiptImage } from 'app/shared/model/ctsmicroservice/receipt-image.model';
import { ReceiptImageService } from './receipt-image.service';

@Component({
    selector: 'jhi-receipt-image-delete-dialog',
    templateUrl: './receipt-image-delete-dialog.component.html'
})
export class ReceiptImageDeleteDialogComponent {
    receiptImage: IReceiptImage;

    constructor(
        private receiptImageService: ReceiptImageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.receiptImageService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'receiptImageListModification',
                content: 'Deleted an receiptImage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-receipt-image-delete-popup',
    template: ''
})
export class ReceiptImageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ receiptImage }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ReceiptImageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.receiptImage = receiptImage;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

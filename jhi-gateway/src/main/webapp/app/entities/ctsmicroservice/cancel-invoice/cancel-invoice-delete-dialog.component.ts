import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICancelInvoice } from 'app/shared/model/ctsmicroservice/cancel-invoice.model';
import { CancelInvoiceService } from './cancel-invoice.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-cancel-invoice-delete-dialog',
    templateUrl: './cancel-invoice-delete-dialog.component.html'
})
export class CancelInvoiceDeleteDialogComponent {
    cancelInvoice: ICancelInvoice;
    isSaving: boolean;

    constructor(
        private cancelInvoiceService: CancelInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(cancelInvoice: ICancelInvoice) {
        this.isSaving = true;
        cancelInvoice.changeNote = '';
        cancelInvoice.cancelReason = '';
        cancelInvoice.cancel = false;
        this.cancelInvoiceService.update(cancelInvoice).subscribe(
            (response: HttpResponse<ICancelInvoice>) => {
                this.isSaving = false;
                this.eventManager.broadcast({
                    name: 'cancelInvoiceListModification',
                    content: 'Approved an request'
                });
                this.activeModal.dismiss(true);
            },
            (response: HttpErrorResponse) => {
                this.isSaving = false;
                this.eventManager.broadcast({
                    name: 'cancelInvoiceListModification',
                    content: response.message
                });
                this.activeModal.dismiss(true);
            }
        );
    }
}

@Component({
    selector: 'jhi-cancel-invoice-delete-popup',
    template: ''
})
export class CancelInvoiceDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cancelInvoice }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CancelInvoiceDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.cancelInvoice = cancelInvoice;
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICancelInvoice } from 'app/shared/model/ctsmicroservice/cancel-invoice.model';
import { CancelInvoiceService } from './cancel-invoice.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-cancel-invoice-approve-dialog',
    templateUrl: './cancel-invoice-approve-dialog.component.html'
})
export class CancelInvoiceApproveDialogComponent {
    cancelInvoice: ICancelInvoice;
    isSaving: boolean;
    note: string = '';
    check: string = '';

    constructor(
        private cancelInvoiceService: CancelInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmApprove(cancelInvoice: ICancelInvoice) {
        if (this.note) {
            this.isSaving = true;
            this.cancelInvoice.cancelReason = this.note;
            this.cancelInvoiceService.approveCancelInvoiceHeaders(cancelInvoice).subscribe(
                (response: HttpResponse<ICancelInvoice>) => {
                    this.isSaving = false;
                    this.eventManager.broadcast({
                        name: 'cancelInvoiceListModification',
                        content: 'Đã hủy đơn hàng ' + cancelInvoice.invoiceNo
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
        } else {
            this.check = 'Hãy lý do hủy đơn hàng';
        }
    }
}
@Component({
    selector: 'jhi-cancel-invoice-approve-popup',
    template: ''
})
export class CancelInvoiceApprovePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cancelInvoice }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CancelInvoiceApproveDialogComponent as Component, {
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

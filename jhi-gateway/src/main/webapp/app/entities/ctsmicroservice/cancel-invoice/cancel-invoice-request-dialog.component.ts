import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { InvoiceHeaderService } from '../invoice-header';

@Component({
    selector: 'jhi-cancel-invoice-request-dialog',
    templateUrl: './cancel-invoice-request-dialog.component.html'
})
export class CancelInvoiceRequestDialogComponent {
    invoiceHeader: IInvoiceHeader;

    constructor(
        private invoiceHeaderService: InvoiceHeaderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmRequest(invoiceHeader: IInvoiceHeader) {
        invoiceHeader.changeNote = 'request';
        this.invoiceHeaderService.update(invoiceHeader).subscribe(
            (response: HttpResponse<IInvoiceHeader>) => {
                this.eventManager.broadcast({
                    name: 'invoiceHeaderListModification',
                    content: 'Send request cancel invoice successfully'
                });
                this.activeModal.dismiss(true);
            },
            (response: HttpErrorResponse) => {
                this.eventManager.broadcast({
                    name: 'invoiceHeaderListModification',
                    content: 'Error when request cancel invoice'
                });
                this.activeModal.dismiss(false);
            }
        );
    }
}

@Component({
    selector: 'jhi-cancel-invoice-request-popup',
    template: ''
})
export class CancelInvoiceRequestPopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ invoiceHeader }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CancelInvoiceRequestDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.invoiceHeader = invoiceHeader;
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

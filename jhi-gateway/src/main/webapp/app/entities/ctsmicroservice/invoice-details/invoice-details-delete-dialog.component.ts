import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInvoiceDetails } from 'app/shared/model/ctsmicroservice/invoice-details.model';
import { InvoiceDetailsService } from './invoice-details.service';

@Component({
    selector: 'jhi-invoice-details-delete-dialog',
    templateUrl: './invoice-details-delete-dialog.component.html'
})
export class InvoiceDetailsDeleteDialogComponent {
    invoiceDetails: IInvoiceDetails;

    constructor(
        private invoiceDetailsService: InvoiceDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.invoiceDetailsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'invoiceDetailsListModification',
                content: 'Deleted an invoiceDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-invoice-details-delete-popup',
    template: ''
})
export class InvoiceDetailsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ invoiceDetails }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InvoiceDetailsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.invoiceDetails = invoiceDetails;
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

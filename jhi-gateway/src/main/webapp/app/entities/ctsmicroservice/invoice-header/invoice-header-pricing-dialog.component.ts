import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { InvoiceHeaderService } from './invoice-header.service';

@Component({
    selector: 'jhi-invoice-header-pricing-dialog',
    templateUrl: './invoice-header-pricing-dialog.component.html'
})
export class InvoiceHeaderPricingDialogComponent {
    invoiceHeader: IInvoiceHeader;

    constructor(
        private invoiceHeaderService: InvoiceHeaderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }
}

@Component({
    selector: 'jhi-invoice-header-pricing-popup',
    template: ''
})
export class InvoiceHeaderPricingPopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ invoiceHeader }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InvoiceHeaderPricingDialogComponent as Component, {
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

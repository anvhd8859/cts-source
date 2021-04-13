import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';
import { InvoicePackageService } from './invoice-package.service';

@Component({
    selector: 'jhi-invoice-package-delete-dialog',
    templateUrl: './invoice-package-delete-dialog.component.html'
})
export class InvoicePackageDeleteDialogComponent {
    invoicePackage: IInvoicePackage;

    constructor(
        private invoicePackageService: InvoicePackageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.invoicePackageService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'invoicePackageListModification',
                content: 'Deleted an invoicePackage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-invoice-package-delete-popup',
    template: ''
})
export class InvoicePackageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ invoicePackage }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InvoicePackageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.invoicePackage = invoicePackage;
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

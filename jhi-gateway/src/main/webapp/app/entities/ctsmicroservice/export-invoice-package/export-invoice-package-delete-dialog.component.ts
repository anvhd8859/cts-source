import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExportInvoicePackage } from 'app/shared/model/ctsmicroservice/export-invoice-package.model';
import { ExportInvoicePackageService } from './export-invoice-package.service';

@Component({
    selector: 'jhi-export-invoice-package-delete-dialog',
    templateUrl: './export-invoice-package-delete-dialog.component.html'
})
export class ExportInvoicePackageDeleteDialogComponent {
    exportInvoicePackage: IExportInvoicePackage;

    constructor(
        private exportInvoicePackageService: ExportInvoicePackageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.exportInvoicePackageService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'exportInvoicePackageListModification',
                content: 'Deleted an exportInvoicePackage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-export-invoice-package-delete-popup',
    template: ''
})
export class ExportInvoicePackageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ exportInvoicePackage }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ExportInvoicePackageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.exportInvoicePackage = exportInvoicePackage;
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

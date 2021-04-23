import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IImportInvoicePackage } from 'app/shared/model/ctsmicroservice/import-invoice-package.model';
import { ImportInvoicePackageService } from './import-invoice-package.service';

@Component({
    selector: 'jhi-import-invoice-package-delete-dialog',
    templateUrl: './import-invoice-package-delete-dialog.component.html'
})
export class ImportInvoicePackageDeleteDialogComponent {
    importInvoicePackage: IImportInvoicePackage;

    constructor(
        private importInvoicePackageService: ImportInvoicePackageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.importInvoicePackageService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'importInvoicePackageListModification',
                content: 'Deleted an importInvoicePackage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-import-invoice-package-delete-popup',
    template: ''
})
export class ImportInvoicePackageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ importInvoicePackage }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ImportInvoicePackageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.importInvoicePackage = importInvoicePackage;
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

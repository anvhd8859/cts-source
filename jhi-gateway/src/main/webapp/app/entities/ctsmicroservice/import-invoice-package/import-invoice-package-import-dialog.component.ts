import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ImportInvoicePackageService } from '.';

@Component({
    selector: 'jhi-import-invoice-package-import-dialog',
    templateUrl: './import-invoice-package-import-dialog.component.html'
})
export class ImportInvoicePackageImportDialogComponent {
    importInvoicePackage: IInvoiceHeader;
    isSaving: boolean;

    constructor(
        private importInvoicePackageService: ImportInvoicePackageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmImport(importInvoicePackage: IInvoiceHeader) {
        this.importInvoicePackageService.updateImportOneInvoice(importInvoicePackage).subscribe(
            (response: HttpResponse<IInvoiceHeader>) => {
                this.isSaving = false;
                this.eventManager.broadcast({
                    name: 'importInvoicePackageListModification',
                    content: 'Imported an invoice packages'
                });
                this.activeModal.dismiss(true);
            },
            (response: HttpErrorResponse) => {
                this.isSaving = false;
                this.eventManager.broadcast({
                    name: 'importInvoicePackageListModification',
                    content: response.message
                });
                this.activeModal.dismiss(true);
            }
        );
    }
}

@Component({
    selector: 'jhi-import-invoice-package-import-popup',
    template: ''
})
export class ImportInvoicePackageImportPopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ importInvoicePackage }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ImportInvoicePackageImportDialogComponent as Component, {
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

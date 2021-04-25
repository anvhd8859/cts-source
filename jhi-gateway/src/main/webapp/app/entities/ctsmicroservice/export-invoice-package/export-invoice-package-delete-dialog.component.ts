import { IInvoiceHeader, InvoiceHeader } from './../../../shared/model/ctsmicroservice/invoice-header.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExportInvoicePackage } from 'app/shared/model/ctsmicroservice/export-invoice-package.model';
import { ExportInvoicePackageService } from './export-invoice-package.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-export-invoice-package-delete-dialog',
    templateUrl: './export-invoice-package-delete-dialog.component.html'
})
export class ExportInvoicePackageDeleteDialogComponent {
    exportInvoicePackage: IInvoiceHeader = new InvoiceHeader();

    constructor(
        private exportInvoicePackageService: ExportInvoicePackageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmExport() {
        this.exportInvoicePackageService.updateExportOnePackage(this.exportInvoicePackage.id).subscribe(
            (response: HttpResponse<IInvoiceHeader>) => {
                this.eventManager.broadcast({
                    name: 'exportInvoicePackageListModification',
                    content: 'Exported an invoice packages'
                });
                this.activeModal.dismiss(true);
            },
            (response: HttpErrorResponse) => {
                this.eventManager.broadcast({
                    name: 'exportInvoicePackageListModification',
                    content: response.message
                });
                this.activeModal.dismiss(true);
            }
        );
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
                this.ngbModalRef.componentInstance.exportInvoicePackage.id = exportInvoicePackage;
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

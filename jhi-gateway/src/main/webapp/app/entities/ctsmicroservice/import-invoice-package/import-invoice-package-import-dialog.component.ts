import { InvoiceHeaderService } from './../invoice-header/invoice-header.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ImportInvoicePackageService } from '.';
import { IInvoiceHeader, InvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { InvoiceShipmentShipper } from '../invoice-header';
import { PersonalShipmentService } from '../invoice-header/personal-shipment';

@Component({
    selector: 'jhi-import-invoice-package-import-dialog',
    templateUrl: './import-invoice-package-import-dialog.component.html'
})
export class ImportInvoicePackageImportDialogComponent {
    importInvoicePackage: IInvoiceHeader = new InvoiceHeader();
    isSaving: boolean;

    constructor(
        private importInvoicePackageService: ImportInvoicePackageService,
        private personalShipmentService: PersonalShipmentService,
        private invoiceHeaderService: InvoiceHeaderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmImport() {
        this.importInvoicePackageService.updateImportOneInvoice(this.importInvoicePackage.id).subscribe(
            (response: HttpResponse<IInvoiceHeader>) => {
                const data = new InvoiceShipmentShipper();
                data.invoice = response.body;
                this.personalShipmentService.getCollectByInvoice({ id: data.invoice.id }).subscribe((response: HttpResponse<any>) => {
                    data.shipment = response.body;
                    this.invoiceHeaderService.sendNotifyShipmentEmail(data);
                });
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
    temp: IInvoiceHeader;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ importInvoicePackage }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ImportInvoicePackageImportDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.temp = new InvoiceHeader();
                this.temp.id = importInvoicePackage;
                this.ngbModalRef.componentInstance.importInvoicePackage = this.temp;
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

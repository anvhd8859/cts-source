import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IImportInvoicePackage } from 'app/shared/model/ctsmicroservice/import-invoice-package.model';
import { Principal } from 'app/core';
import { ImportInvoicePackageService } from './import-invoice-package.service';
import { IInvoicePackageShipment } from '.';

@Component({
    selector: 'jhi-import-invoice-package',
    templateUrl: './import-invoice-package.component.html'
})
export class ImportInvoicePackageComponent implements OnInit, OnDestroy {
    importInvoicePackages: IImportInvoicePackage[];
    invoicePackageShipments: IInvoicePackageShipment[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private importInvoicePackageService: ImportInvoicePackageService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.importInvoicePackageService.query().subscribe(
            (res: HttpResponse<IImportInvoicePackage[]>) => {
                this.importInvoicePackages = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInImportInvoicePackages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IImportInvoicePackage) {
        return item.id;
    }

    registerChangeInImportInvoicePackages() {
        this.eventSubscriber = this.eventManager.subscribe('importInvoicePackageListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

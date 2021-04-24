import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IExportInvoicePackage } from 'app/shared/model/ctsmicroservice/export-invoice-package.model';
import { Principal } from 'app/core';
import { ExportInvoicePackageService } from './export-invoice-package.service';

@Component({
    selector: 'jhi-export-invoice-package',
    templateUrl: './export-invoice-package.component.html'
})
export class ExportInvoicePackageComponent implements OnInit, OnDestroy {
    exportInvoicePackages: IExportInvoicePackage[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private exportInvoicePackageService: ExportInvoicePackageService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.exportInvoicePackageService.query().subscribe(
            (res: HttpResponse<IExportInvoicePackage[]>) => {
                this.exportInvoicePackages = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInExportInvoicePackages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IExportInvoicePackage) {
        return item.id;
    }

    registerChangeInExportInvoicePackages() {
        this.eventSubscriber = this.eventManager.subscribe('exportInvoicePackageListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

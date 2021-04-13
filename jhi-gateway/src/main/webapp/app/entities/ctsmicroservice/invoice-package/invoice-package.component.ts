import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';
import { Principal } from 'app/core';
import { InvoicePackageService } from './invoice-package.service';

@Component({
    selector: 'jhi-invoice-package',
    templateUrl: './invoice-package.component.html'
})
export class InvoicePackageComponent implements OnInit, OnDestroy {
    invoicePackages: IInvoicePackage[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private invoicePackageService: InvoicePackageService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.invoicePackageService.query().subscribe(
            (res: HttpResponse<IInvoicePackage[]>) => {
                this.invoicePackages = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInInvoicePackages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInvoicePackage) {
        return item.id;
    }

    registerChangeInInvoicePackages() {
        this.eventSubscriber = this.eventManager.subscribe('invoicePackageListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

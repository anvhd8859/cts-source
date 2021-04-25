import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService, User } from 'app/core';
import { IInvoiceDetails } from 'app/shared/model/ctsmicroservice/invoice-details.model';

import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { IInvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';
import { forkJoin } from 'rxjs';
import { InvoiceHeaderService } from '.';

@Component({
    selector: 'jhi-invoice-header-detail',
    templateUrl: './invoice-header-detail.component.html'
})
export class InvoiceHeaderDetailComponent implements OnInit {
    invoiceHeader: IInvoiceHeader;
    lstInvoicePackage: IInvoicePackage[] = [];
    lstInvoiceDetails: IInvoiceDetails[] = [];
    customer: User;

    constructor(
        private invoiceHeaderService: InvoiceHeaderService,
        private activatedRoute: ActivatedRoute,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ invoiceHeader }) => {
            this.invoiceHeader = invoiceHeader;
            forkJoin(
                this.invoiceHeaderService.getPackageByInvoiceId({ id: this.invoiceHeader.id }),
                this.invoiceHeaderService.getDetailByInvoiceId({ id: this.invoiceHeader.id }),
                this.invoiceHeaderService.getUserByID({ id: this.invoiceHeader.customerId })
            ).subscribe(res => {
                this.lstInvoicePackage = res[0].body;
                this.lstInvoiceDetails = res[1].body;
                this.customer = res[2].body;
            });
        });
    }

    previousState() {
        window.history.back();
    }
}

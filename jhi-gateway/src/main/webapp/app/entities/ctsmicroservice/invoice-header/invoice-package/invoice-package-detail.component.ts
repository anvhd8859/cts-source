import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';

@Component({
    selector: 'jhi-invoice-package-detail',
    templateUrl: './invoice-package-detail.component.html'
})
export class InvoicePackageDetailComponent implements OnInit {
    invoicePackage: IInvoicePackage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ invoicePackage }) => {
            this.invoicePackage = invoicePackage;
        });
    }

    previousState() {
        window.history.back();
    }
}

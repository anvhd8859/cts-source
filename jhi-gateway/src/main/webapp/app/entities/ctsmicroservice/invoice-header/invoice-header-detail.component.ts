import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';

@Component({
    selector: 'jhi-invoice-header-detail',
    templateUrl: './invoice-header-detail.component.html'
})
export class InvoiceHeaderDetailComponent implements OnInit {
    invoiceHeader: IInvoiceHeader;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ invoiceHeader }) => {
            this.invoiceHeader = invoiceHeader;
        });
    }

    previousState() {
        window.history.back();
    }
}

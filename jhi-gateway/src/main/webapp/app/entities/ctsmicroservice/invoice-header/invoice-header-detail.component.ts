import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'app/core';

import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';

@Component({
    selector: 'jhi-invoice-header-detail',
    templateUrl: './invoice-header-detail.component.html'
})
export class InvoiceHeaderDetailComponent implements OnInit {
    invoiceHeader: IInvoiceHeader;

    constructor(private activatedRoute: ActivatedRoute, private accountService: AccountService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ invoiceHeader }) => {
            this.invoiceHeader = invoiceHeader;
        });
    }

    previousState() {
        window.history.back();
    }
}

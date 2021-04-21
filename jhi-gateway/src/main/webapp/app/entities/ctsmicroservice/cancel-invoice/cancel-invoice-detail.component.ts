import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICancelInvoice } from 'app/shared/model/ctsmicroservice/cancel-invoice.model';

@Component({
    selector: 'jhi-cancel-invoice-detail',
    templateUrl: './cancel-invoice-detail.component.html'
})
export class CancelInvoiceDetailComponent implements OnInit {
    cancelInvoice: ICancelInvoice;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cancelInvoice }) => {
            this.cancelInvoice = cancelInvoice;
        });
    }

    previousState() {
        window.history.back();
    }
}

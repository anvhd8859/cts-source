import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExportInvoicePackage } from 'app/shared/model/ctsmicroservice/export-invoice-package.model';

@Component({
    selector: 'jhi-export-invoice-package-detail',
    templateUrl: './export-invoice-package-detail.component.html'
})
export class ExportInvoicePackageDetailComponent implements OnInit {
    exportInvoicePackage: IExportInvoicePackage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ exportInvoicePackage }) => {
            this.exportInvoicePackage = exportInvoicePackage;
        });
    }

    previousState() {
        window.history.back();
    }
}

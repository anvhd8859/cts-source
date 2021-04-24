import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImportInvoicePackage } from 'app/shared/model/ctsmicroservice/import-invoice-package.model';

@Component({
    selector: 'jhi-import-invoice-package-detail',
    templateUrl: './import-invoice-package-detail.component.html'
})
export class ImportInvoicePackageDetailComponent implements OnInit {
    importInvoicePackage: IImportInvoicePackage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ importInvoicePackage }) => {
            this.importInvoicePackage = importInvoicePackage;
        });
    }

    previousState() {
        window.history.back();
    }
}

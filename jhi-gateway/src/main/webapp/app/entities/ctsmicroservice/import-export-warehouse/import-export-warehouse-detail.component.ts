import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImportExportWarehouse } from 'app/shared/model/ctsmicroservice/import-export-warehouse.model';

@Component({
    selector: 'jhi-import-export-warehouse-detail',
    templateUrl: './import-export-warehouse-detail.component.html'
})
export class ImportExportWarehouseDetailComponent implements OnInit {
    importExportWarehouse: IImportExportWarehouse;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ importExportWarehouse }) => {
            this.importExportWarehouse = importExportWarehouse;
        });
    }

    previousState() {
        window.history.back();
    }
}

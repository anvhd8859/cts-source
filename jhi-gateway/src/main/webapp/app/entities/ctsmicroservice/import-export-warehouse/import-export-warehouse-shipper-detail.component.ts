import { Principal } from 'app/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImportExportWarehouse } from 'app/shared/model/ctsmicroservice/import-export-warehouse.model';
import { CommonString } from 'app/shared';
import { IShipmentInvoice, PersonalShipmentService } from '../invoice-header/personal-shipment';

@Component({
    selector: 'jhi-import-export-warehouse-shipper-detail',
    templateUrl: './import-export-warehouse-shipper-detail.component.html'
})
export class ImportExportWarehouseShipperDetailComponent implements OnInit {
    currentAccount: any;
    importExportWarehouse: IImportExportWarehouse;
    shipmentInvoices: IShipmentInvoice[];
    common: CommonString;
    isSaving: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private personalShipmentService: PersonalShipmentService,
        private principal: Principal
    ) {
        this.common = new CommonString();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
    }

    ngOnInit() {
        this.loadAll();
    }

    loadAll() {
        this.common = new CommonString();
        this.activatedRoute.data.subscribe(({ importExportWarehouse }) => {
            this.importExportWarehouse = importExportWarehouse;
            this.personalShipmentService.getAllShipmentByRequestId({ id: this.importExportWarehouse.id }).subscribe(res => {
                this.shipmentInvoices = res.body;
            });
        });
    }
}

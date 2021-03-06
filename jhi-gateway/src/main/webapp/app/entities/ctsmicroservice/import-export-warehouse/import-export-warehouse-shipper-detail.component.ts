import { Principal } from 'app/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImportExportWarehouse } from 'app/shared/model/ctsmicroservice/import-export-warehouse.model';
import { CommonString } from 'app/shared';
import { IShipmentInvoice, PersonalShipmentService } from '../invoice-header/personal-shipment';
import { HttpResponse } from '@angular/common/http';
import { InvoicePackageDetailDTO, RequestDetailInvoice } from '.';
import { RequestDetailsService } from '../request-details';
import { IInvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';

@Component({
    selector: 'jhi-import-export-warehouse-shipper-detail',
    templateUrl: './import-export-warehouse-shipper-detail.component.html'
})
export class ImportExportWarehouseShipperDetailComponent implements OnInit {
    currentAccount: any;
    importExportWarehouse: IImportExportWarehouse;
    requestDetailsList: RequestDetailInvoice[];
    common: CommonString;
    isSaving: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private requestDetailsService: RequestDetailsService,
        private principal: Principal
    ) {
        this.common = new CommonString();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
    }

    ngOnInit() {
        this.common = new CommonString();
        this.activatedRoute.data.subscribe(({ importExportWarehouse }) => {
            this.importExportWarehouse = importExportWarehouse;
            this.requestDetailsService
                .getRequestDetailsByHeaderId({ id: this.importExportWarehouse.id })
                .subscribe((res: HttpResponse<RequestDetailInvoice[]>) => {
                    this.requestDetailsList = res.body;
                });
        });
    }

    totalWeight(packageList: IInvoicePackage[]) {
        let x = 0;
        for (const obj of packageList) {
            x += obj.weight;
        }
        return x;
    }
}

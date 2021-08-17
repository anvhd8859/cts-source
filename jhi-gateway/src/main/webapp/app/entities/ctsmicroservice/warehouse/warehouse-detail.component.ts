import { WarehouseService } from 'app/entities/ctsmicroservice/warehouse/warehouse.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IWarehouse } from 'app/shared/model/ctsmicroservice/warehouse.model';
import { IInvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';
import { IInvoicePackageShipment } from '../import-invoice-package';
import { CommonString } from 'app/shared';
import { InvoiceHeaderService } from '../invoice-header/invoice-header.service';
import { HttpHeaders } from '@angular/common/http';
import { JhiParseLinks } from 'ng-jhipster';

@Component({
    selector: 'jhi-warehouse-detail',
    templateUrl: './warehouse-detail.component.html'
})
export class WarehouseDetailComponent implements OnInit {
    warehouse: IWarehouse;
    invoices: IInvoicePackageShipment[];
    common: CommonString;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    id: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private invoiceService: InvoiceHeaderService,
        private warehouseService: WarehouseService,
        private router: Router,
        private parseLinks: JhiParseLinks
    ) {}

    ngOnInit() {
        this.itemsPerPage = 50;
        this.common = new CommonString();
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
            this.warehouseService.find(this.id).subscribe(res => {
                this.warehouse = res.body;
                this.loadAll();
            });
        });
    }

    loadAll() {
        this.invoiceService.getInvoiceByWarehouse({ id: this.warehouse.id }).subscribe(res => {
            this.paginateInvoiceHeaders(res.body, res.headers);
        });
    }

    previousState() {
        window.history.back();
    }

    private paginateInvoiceHeaders(data: IInvoicePackageShipment[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.invoices = data;
    }

    totalWeight(packageList: IInvoicePackage[]) {
        let x = 0;
        for (const obj of packageList) {
            x += obj.weight;
        }
        return x;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/warehouse/' + this.id + '/view'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }
}

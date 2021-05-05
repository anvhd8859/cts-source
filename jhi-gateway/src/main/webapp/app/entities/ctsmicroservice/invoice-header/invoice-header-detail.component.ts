import { CommonString } from './../../../shared/util/request-util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService, User } from 'app/core';
import { IInvoiceDetails } from 'app/shared/model/ctsmicroservice/invoice-details.model';

import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { IInvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';
import { IOffice } from 'app/shared/model/ctsmicroservice/office.model';
import { forkJoin } from 'rxjs';
import { InvoiceHeaderService, PackageDetailsDTO } from '.';
import { OfficeService } from '../office';

@Component({
    selector: 'jhi-invoice-header-detail',
    templateUrl: './invoice-header-detail.component.html'
})
export class InvoiceHeaderDetailComponent implements OnInit {
    invoiceHeader: IInvoiceHeader;
    lstInvoicePackage: IInvoicePackage[] = [];
    lstInvoiceDetails: IInvoiceDetails[] = [];
    createPackage: PackageDetailsDTO[] = [];
    customer: User;
    office: IOffice;
    showPackage: boolean;
    showItem: boolean;
    common: CommonString = new CommonString();

    constructor(
        private invoiceHeaderService: InvoiceHeaderService,
        private officeService: OfficeService,
        private activatedRoute: ActivatedRoute
    ) {
        this.showPackage = false;
        this.showItem = false;
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ invoiceHeader }) => {
            this.invoiceHeader = invoiceHeader;
            forkJoin(
                this.invoiceHeaderService.getPackageByInvoiceId({ id: this.invoiceHeader.id }),
                this.invoiceHeaderService.getDetailByInvoiceId({ id: this.invoiceHeader.id }),
                this.invoiceHeaderService.getUserByID({ id: this.invoiceHeader.customerId })
            ).subscribe(res => {
                this.lstInvoicePackage = res[0].body;
                this.lstInvoiceDetails = res[1].body;
                this.customer = res[2].body;
                for (const ip of this.lstInvoicePackage) {
                    const pdDto = new PackageDetailsDTO();
                    pdDto.invPackage = ip;
                    for (const id of this.lstInvoiceDetails) {
                        if (id.invoicePackageId === ip.id) {
                            pdDto.itemList.push(id);
                        }
                    }
                    this.createPackage.push(pdDto);
                }
            });
        });
    }

    collapsePackage() {
        this.showPackage = !this.showPackage;
    }

    collapseItem() {
        this.showItem = !this.showItem;
    }

    previousState() {
        window.history.back();
    }
}

import { IInvoiceHeader } from './../../../../shared/model/ctsmicroservice/invoice-header.model';
import { IInvoiceDetails } from './../../../../shared/model/ctsmicroservice/invoice-details.model';
import { IInvoicePackage } from './../../../../shared/model/ctsmicroservice/invoice-package.model';
import { forkJoin } from 'rxjs';
import { InvoiceHeaderService } from 'app/entities/ctsmicroservice/invoice-header/invoice-header.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, Principal } from 'app/core';

import { IReceiptnote } from 'app/shared/model/ctsmicroservice/receiptnote.model';
import { CommonString } from 'app/shared';

@Component({
    selector: 'jhi-receiptnote-detail',
    templateUrl: './receiptnote-detail.component.html'
})
export class ReceiptnoteDetailComponent implements OnInit {
    receiptnote: IReceiptnote;
    currentUser: IUser;
    id: number;
    lstInvoicePackage: IInvoicePackage[];
    lstInvoiceDetails: IInvoiceDetails[];
    invoiceHeader: IInvoiceHeader;
    common: CommonString;
    showPackage: boolean = false;
    showItem: boolean = false;

    constructor(private activatedRoute: ActivatedRoute, private invoiceHeaderService: InvoiceHeaderService, private principal: Principal) {}

    ngOnInit() {
        this.common = new CommonString();
        this.principal.identity().then(account => {
            this.currentUser = account;
        });
        this.activatedRoute.data.subscribe(({ receiptnote }) => {
            this.receiptnote = receiptnote;
            forkJoin(
                this.invoiceHeaderService.getPackageByInvoiceId({ id: this.receiptnote.invoiceHeaderId }),
                this.invoiceHeaderService.getDetailByInvoiceId({ id: this.receiptnote.invoiceHeaderId }),
                this.invoiceHeaderService.find(this.receiptnote.invoiceHeaderId)
            ).subscribe(res => {
                this.lstInvoicePackage = res[0].body;
                this.lstInvoiceDetails = res[1].body;
                this.invoiceHeader = res[2].body;
            });
        });
        this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
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

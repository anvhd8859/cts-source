import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IReceiptnote, Receiptnote } from 'app/shared/model/ctsmicroservice/receiptnote.model';
import { ReceiptnoteService } from './receiptnote.service';
import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { IUser, Principal } from 'app/core';
import { IInvoicePackage, InvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';
import { IInvoiceDetails, InvoiceDetails } from 'app/shared/model/ctsmicroservice/invoice-details.model';
import { PackageDetailsDTO } from '..';

@Component({
    selector: 'jhi-receiptnote-update',
    templateUrl: './receiptnote-update.component.html'
})
export class ReceiptnoteUpdateComponent implements OnInit {
    receiptnote: IReceiptnote;
    invoiceHeader: IInvoiceHeader;
    isSaving: boolean;
    createDate: string;
    updateDate: string;
    currentUser: IUser;

    // HaiNM
    createPackage: PackageDetailsDTO[] = [];
    // HaiNM
    data: any;

    constructor(private receiptnoteService: ReceiptnoteService, private activatedRoute: ActivatedRoute, private principal: Principal) {
        this.principal.identity().then(account => {
            this.currentUser = account;
            this.receiptnote = new Receiptnote();
            this.receiptnote.employeeId = this.currentUser.id;
        });
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ invoiceHeader }) => {
            if (invoiceHeader !== undefined) {
                this.invoiceHeader = invoiceHeader;
                this.receiptnote.invoiceHeaderId = this.invoiceHeader.id;
                this.receiptnoteService.getReceiptItemPackage({ id: this.invoiceHeader.id }).subscribe(res => {
                    if (res.body != null) {
                        this.createPackage = res.body;
                    }
                });
            }
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        if (this.createPackage.length > 0) {
            if (this.receiptnote.id === undefined) {
                this.isSaving = true;
                this.data = new CustomReceipt();
                this.data.receipt = this.receiptnote;
                for (let obj of this.createPackage) {
                    this.data.invoicePackageList.push(obj.invPackage);
                    for (let obj2 of obj.itemList) {
                        this.data.invoiceDetailList.push(obj2);
                    }
                }
                this.receiptnoteService.createReceiptNoteAndShipmentInvoice(this.data).subscribe(
                    (res: HttpResponse<any>) => {
                        this.onSaveSuccess();
                    },
                    (res: HttpErrorResponse) => {
                        this.onSaveError();
                    }
                );
                this.isSaving = false;
            }
        }
    }

    // HaiNM
    addNewPackageDetailsDTO() {
        const obj = new PackageDetailsDTO();
        this.createPackage.push(obj);
    }
    removeNewPackageDetailsDTO(index: any) {
        this.createPackage.splice(index, 1);
    }
    addNewInvoiceDetailElement(packageIndex: any) {
        const obj = new InvoiceDetails();
        this.createPackage[packageIndex].itemList.push(obj);
    }
    removeInvoiceDetailElement(packageIndex: any, index) {
        this.createPackage[packageIndex].itemList.splice(index, 1);
    }
    // HaiNM

    private subscribeToSaveResponse(result: Observable<HttpResponse<IReceiptnote>>) {
        result.subscribe((res: HttpResponse<IReceiptnote>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

export class CustomReceipt {
    receipt: IReceiptnote;
    invoicePackageList: IInvoicePackage[];
    invoiceDetailList: IInvoiceDetails[];
    constructor() {
        this.receipt = new Receiptnote();
        this.invoicePackageList = [];
        this.invoiceDetailList = [];
    }
}

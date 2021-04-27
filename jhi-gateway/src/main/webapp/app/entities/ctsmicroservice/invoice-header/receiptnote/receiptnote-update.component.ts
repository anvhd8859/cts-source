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

    lstInvoicePackage: IInvoicePackage[] = [];
    invPackageCount: number;
    lstInvoiceDetails: IInvoiceDetails[] = [];
    invDetailCount: number;
    data: ICustomReceipt;

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
                        this.lstInvoicePackage = res.body.invoicePackageList;
                        this.lstInvoiceDetails = res.body.invoiceDetailList;
                    }
                });
            }
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.lstInvoicePackage.length === 0 && this.lstInvoiceDetails.length === 0) {
            return;
        }
        this.receiptnote.createDate =
            this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : moment(new Date(), DATE_TIME_FORMAT);
        this.receiptnote.updateDate = moment(new Date(), DATE_TIME_FORMAT);
        if (this.receiptnote.id !== undefined) {
            this.subscribeToSaveResponse(this.receiptnoteService.update(this.receiptnote));
        } else {
            this.data.receipt = this.receiptnote;
            this.data.invoicePackageList = this.lstInvoicePackage;
            this.data.invoiceDetailList = this.lstInvoiceDetails;
            this.receiptnoteService.createReceiptNoteAndShipmentInvoice(this.data).subscribe(
                (res: HttpResponse<any>) => {
                    this.onSaveSuccess();
                },
                (res: HttpErrorResponse) => {
                    this.onSaveError();
                }
            );
        }
    }

    addNewInvoiceDetailElement() {
        this.invDetailCount++;
        const obj = new InvoiceDetails(null, null, '', '', null, null, null, null, '', '', '', null, null);
        this.lstInvoiceDetails.push(obj);
        console.log(this.lstInvoiceDetails);
    }

    removeInvoiceDetailElement(index: any) {
        this.invDetailCount--;
        this.lstInvoiceDetails.splice(index, 1);
        console.log(this.lstInvoiceDetails);
    }

    addNewInvoicePackageElement() {
        this.invPackageCount++;
        const obj = new InvoicePackage(null, null, null, null, null, null, null, false, 'New', '', null, null, null);
        this.lstInvoicePackage.push(obj);
        console.log(this.lstInvoicePackage);
    }

    removeInvoicePackageElement(index: any) {
        this.invPackageCount--;
        this.lstInvoicePackage.splice(index, 1);
        console.log(this.lstInvoicePackage);
    }

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

export interface ICustomReceipt {
    receipt?: IReceiptnote;
    invoicePackageList?: IInvoicePackage[];
    invoiceDetailList?: IInvoiceDetails[];
}

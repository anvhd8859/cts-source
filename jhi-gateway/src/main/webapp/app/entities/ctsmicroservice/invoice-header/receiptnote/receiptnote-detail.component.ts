import { PaymentService } from './../../payment/payment.service';
import { IPayment, Payment } from './../../../../shared/model/ctsmicroservice/payment.model';
import { IInvoiceHeader } from './../../../../shared/model/ctsmicroservice/invoice-header.model';
import { forkJoin } from 'rxjs';
import { InvoiceHeaderService } from 'app/entities/ctsmicroservice/invoice-header/invoice-header.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, Principal } from 'app/core';

import { IReceiptnote } from 'app/shared/model/ctsmicroservice/receiptnote.model';
import { CommonString } from 'app/shared';
import { PackageDetailsDTO } from '..';
import { ReceiptnoteService } from '.';
import { InvoiceDetails } from 'app/shared/model/ctsmicroservice/invoice-details.model';
import { IPersonalShipment } from 'app/shared/model/ctsmicroservice/personal-shipment.model';

@Component({
    selector: 'jhi-receiptnote-detail',
    templateUrl: './receiptnote-detail.component.html'
})
export class ReceiptnoteDetailComponent implements OnInit {
    receiptNote: IReceiptnote;
    personalShipment: IPersonalShipment;
    currentUser: IUser;
    id: number;
    createPackage: PackageDetailsDTO[] = [];
    invoiceHeader: IInvoiceHeader;
    payment: IPayment[];
    common: CommonString;

    constructor(
        private receiptNoteService: ReceiptnoteService,
        private activatedRoute: ActivatedRoute,
        private invoiceHeaderService: InvoiceHeaderService,
        private paymentService: PaymentService,
        private principal: Principal
    ) {}

    ngOnInit() {
        this.common = new CommonString();
        this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        this.principal.identity().then(account => {
            this.currentUser = account;
        });
        this.activatedRoute.data.subscribe(({ personalShipment }) => {
            if (personalShipment != null) {
                this.personalShipment = personalShipment;
                this.receiptNoteService.getReceiveNote({ id: this.personalShipment.id }).subscribe(res => {
                    this.receiptNote = res.body;
                    if (this.receiptNote) {
                        forkJoin(
                            this.receiptNoteService.getReceiptItemPackage({ id: this.receiptNote.invoiceHeaderId }),
                            this.invoiceHeaderService.find(this.receiptNote.invoiceHeaderId),
                            this.paymentService.findPaymentByParams({ id: this.receiptNote.invoiceHeaderId })
                        ).subscribe(resp => {
                            this.createPackage = resp[0].body;
                            this.invoiceHeader = resp[1].body;
                            this.payment = resp[2].body;
                        });
                    }
                });
            }
        });
    }

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

    previousState() {
        window.history.back();
    }
}

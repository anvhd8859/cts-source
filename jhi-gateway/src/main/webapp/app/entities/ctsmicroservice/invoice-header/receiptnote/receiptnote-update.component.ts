import { PersonalShipmentService } from 'app/entities/ctsmicroservice/invoice-header/personal-shipment';
import { InvoiceHeaderService } from 'app/entities/ctsmicroservice/invoice-header/invoice-header.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IReceiptnote, Receiptnote } from 'app/shared/model/ctsmicroservice/receiptnote.model';
import { ReceiptnoteService } from './receiptnote.service';
import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { IUser, Principal } from 'app/core';
import { InvoiceDetails } from 'app/shared/model/ctsmicroservice/invoice-details.model';
import { PackageDetailsDTO } from '..';
import { IPersonalShipment } from 'app/shared/model/ctsmicroservice/personal-shipment.model';

@Component({
    selector: 'jhi-receiptnote-update',
    templateUrl: './receiptnote-update.component.html'
})
export class ReceiptnoteUpdateComponent implements OnInit {
    receiptnote: IReceiptnote;
    personalShipment: IPersonalShipment;
    invoiceHeader: IInvoiceHeader;
    isSaving: boolean;
    currentUser: IUser;
    createPackage: PackageDetailsDTO[] = [];
    data: CustomReceipt;
    collect = false;
    payment: string;
    invId: number;
    pay: boolean;
    finalId: number;

    constructor(
        private receiptnoteService: ReceiptnoteService,
        private invoiceService: InvoiceHeaderService,
        private shipmentService: PersonalShipmentService,
        private activatedRoute: ActivatedRoute,
        private route: Router,
        private principal: Principal
    ) {
        this.principal.identity().then(account => {
            this.currentUser = account;
            this.receiptnote = new Receiptnote();
            this.receiptnote.employeeId = this.currentUser.id;
        });
        this.invId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }

    ngOnInit() {
        this.isSaving = false;
        if (this.currentUser.authorities.find(e => e === 'ROLE_SHIPPER')) {
            this.activatedRoute.data.subscribe(({ personalShipment }) => {
                if (personalShipment !== undefined) {
                    this.personalShipment = personalShipment;
                    this.finalId = personalShipment.id;
                    this.receiptnote.invoiceHeaderId = this.personalShipment.invoiceHeaderId;
                    this.receiptnote.shipmentId = this.personalShipment.id;
                    this.receiptnoteService.getReceiptItemPackage({ id: this.receiptnote.invoiceHeaderId }).subscribe(res => {
                        this.createPackage = res.body;
                    });
                    this.invoiceService.find(this.receiptnote.invoiceHeaderId).subscribe(res => {
                        this.invoiceHeader = res.body;
                        this.pay = this.invoiceHeader.receiverPay;
                    });
                    this.payment = this.invoiceHeader.totalDue.toString();
                }
            });
        } else if (this.currentUser.authorities.find(e => e === 'ROLE_OFFICER')) {
            this.invoiceService.find(this.invId).subscribe(res => {
                this.invoiceHeader = res.body;
                this.finalId = this.invoiceHeader.id;
                this.pay = this.invoiceHeader.receiverPay;
                this.receiptnoteService.getReceiptItemPackage({ id: this.invoiceHeader.id }).subscribe(response => {
                    this.createPackage = response.body;
                });
                this.payment = this.invoiceHeader.totalDue.toString();
                this.receiptnote.invoiceHeaderId = this.personalShipment.invoiceHeaderId;
            });
        }
    }

    previousState() {
        window.history.back();
    }

    save() {
        let wei = 0;
        for (const obj of this.createPackage) {
            wei += obj.invPackage.weight;
        }
        if (this.createPackage.length > 0 && wei > 0) {
            if (this.personalShipment != null) {
                this.isSaving = true;
                if (this.personalShipment.shipmentType === 'collect') {
                    this.data = new CustomReceipt();
                    this.data.receipt = this.receiptnote;
                    for (const obj of this.createPackage) {
                        this.data.packageList.push(obj);
                    }
                    if (!this.invoiceHeader.receiverPay) {
                        this.data.pay = true;
                        this.data.payAmount = this.invoiceHeader.totalDue.toString();
                    }
                    this.receiptnoteService.createReceiptNoteAndShipmentInvoice(this.data).subscribe(
                        (res: HttpResponse<IReceiptnote>) => {
                            this.isSaving = false;
                            this.route.navigate(['/receiptnote', this.invId.toString(), '/view']);
                        },
                        (res: HttpErrorResponse) => {
                            this.onSaveError();
                        }
                    );
                } else {
                    this.data = new CustomReceipt();
                    this.data.receipt = this.receiptnote;
                    for (const obj of this.createPackage) {
                        this.data.packageList.push(obj);
                    }
                    if (this.invoiceHeader.receiverPay) {
                        this.data.pay = true;
                        this.data.payAmount = this.invoiceHeader.totalDue.toString();
                    }
                    this.receiptnoteService.createReceiptNoteAndFinishInvoice(this.data).subscribe(
                        (res: HttpResponse<IReceiptnote>) => {
                            this.isSaving = false;
                            this.route.navigate(['/receiptnote', this.invId.toString(), '/view']);
                        },
                        (res: HttpErrorResponse) => {
                            this.onSaveError();
                        }
                    );
                }
                this.isSaving = false;
            } else {
                this.receiptnote.note = 'Nhận hàng từ khách tại văn phòng';
                this.data = new CustomReceipt();
                this.data.receipt = this.receiptnote;
                if (!this.invoiceHeader.receiverPay) {
                    this.data.pay = true;
                    this.data.payAmount = this.payment;
                }
                for (const obj of this.createPackage) {
                    obj.invPackage.status = 'first_import';
                    this.data.packageList.push(obj);
                }
                this.receiptnoteService.createReceiptNoteAndFinishInvoice(this.data).subscribe(
                    (res: HttpResponse<IReceiptnote>) => {
                        this.isSaving = false;
                        this.route.navigate(['/receiptnote', this.invId.toString(), '/view']);
                    },
                    (res: HttpErrorResponse) => {
                        this.onSaveError();
                    }
                );
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
    packageList: PackageDetailsDTO[];
    pay: boolean;
    payAmount: string;
    constructor() {
        this.receipt = new Receiptnote();
        this.packageList = [];
        this.pay = false;
        this.payAmount = '';
    }
}

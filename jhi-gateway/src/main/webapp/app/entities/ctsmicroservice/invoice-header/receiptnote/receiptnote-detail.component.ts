import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { IReceiptImage } from './../../../../shared/model/ctsmicroservice/receipt-image.model';
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
import { InvoiceDetails } from 'app/shared/model/ctsmicroservice/invoice-details.model';
import { IPersonalShipment } from 'app/shared/model/ctsmicroservice/personal-shipment.model';
import { ReceiptImageModalComponent } from './image-compress/receipt-image-modal.component';
import { ReceiptnoteService } from '.';
import { ReceiptImageService } from './image-compress/receipt-image.service';

@Component({
    selector: 'jhi-receiptnote-detail',
    templateUrl: './receiptnote-detail.component.html'
})
export class ReceiptnoteDetailComponent implements OnInit {
    receiptNote: IReceiptnote;
    personalShipment: IPersonalShipment;
    currentUser: IUser;
    customer: IUser;
    id: number;
    createPackage: PackageDetailsDTO[] = [];
    invoiceHeader: IInvoiceHeader;
    payment: IPayment[];
    common: CommonString;
    invId: number;
    image: IReceiptImage;

    constructor(
        private receiptNoteService: ReceiptnoteService,
        private activatedRoute: ActivatedRoute,
        private invoiceHeaderService: InvoiceHeaderService,
        private paymentService: PaymentService,
        private principal: Principal,
        private modal: NgbModal,
        private imageService: ReceiptImageService
    ) {}

    ngOnInit() {
        this.common = new CommonString();
        this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        this.principal.identity().then(account => {
            this.currentUser = account;
            this.activatedRoute.data.subscribe(({ personalShipment }) => {
                this.personalShipment = personalShipment;
                if (this.currentUser.authorities.find(e => e === 'ROLE_SHIPPER')) {
                    this.receiptNoteService.getReceiveNote({ id: this.personalShipment.id }).subscribe(res => {
                        this.receiptNote = res.body;
                        if (this.receiptNote) {
                            forkJoin(
                                this.receiptNoteService.getReceiptItemPackage({ id: this.receiptNote.invoiceHeaderId }),
                                this.invoiceHeaderService.find(this.receiptNote.invoiceHeaderId),
                                this.paymentService.getPaymentByInvoiceId({ id: this.receiptNote.invoiceHeaderId })
                            ).subscribe(resp => {
                                this.createPackage = resp[0].body;
                                this.invoiceHeader = resp[1].body;
                                this.payment = resp[2].body;
                                this.invoiceHeaderService.getUserByID({ id: this.invoiceHeader.customerId }).subscribe(response => {
                                    this.customer = response.body;
                                });
                            });
                        }
                    });
                } else {
                    this.receiptNoteService.getReceiveNoteByInvoiceId({ id: this.id }).subscribe(res => {
                        this.receiptNote = res.body;
                        forkJoin(
                            this.paymentService.getPaymentByInvoiceId({ id: this.id }),
                            this.invoiceHeaderService.find(this.id),
                            this.receiptNoteService.getReceiptItemPackage({ id: this.id })
                        ).subscribe(resp => {
                            this.payment = resp[0].body;
                            this.invoiceHeader = resp[1].body;
                            this.createPackage = resp[2].body;
                            this.invoiceHeaderService.getUserByID({ id: this.invoiceHeader.customerId }).subscribe(response => {
                                this.customer = response.body;
                            });
                        });
                    });
                }
            });
        });
    }

    loadImage() {
        this.imageService.findByNoteId(this.receiptNote.id).subscribe((res: HttpResponse<any>) => {
            this.image = res.body;
            const modalRef = this.modal.open(ReceiptImageModalComponent as Component, {
                size: 'lg',
                backdrop: 'static'
            });
            modalRef.componentInstance.image = this.image;
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

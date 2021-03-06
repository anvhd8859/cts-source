import { IUserProfile } from 'app/shared/model/user-profile.model';
import { CalculateShipFee, CommonString } from './../../../../shared/util/request-util';
import { ReceiptImageService } from './image-compress/receipt-image.service';
import { InvoiceHeaderService } from 'app/entities/ctsmicroservice/invoice-header/invoice-header.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IReceiptnote, Receiptnote } from 'app/shared/model/ctsmicroservice/receiptnote.model';
import { ReceiptnoteService } from './receiptnote.service';
import { IInvoiceHeader, InvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { AccountService, IUser, Principal } from 'app/core';
import { InvoiceDetails } from 'app/shared/model/ctsmicroservice/invoice-details.model';
import { PackageDetailsDTO } from '..';
import { IPersonalShipment } from 'app/shared/model/ctsmicroservice/personal-shipment.model';
import { NgxImageCompressService } from 'ngx-image-compress';
import { JhiAlertService } from 'ng-jhipster';

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
    currentProfile: IUserProfile;
    customerUser: IUser;
    createPackage: PackageDetailsDTO[] = [];
    data: CustomReceipt;
    collect = false;
    invId: number;
    pay: boolean;
    customerName: any;
    file: any;
    localUrl: any;
    localCompressedURl: any;
    sizeOfOriginalImage: number;
    sizeOFCompressedImage: number;
    imgResultBeforeCompress: string;
    imgResultAfterCompress: string;
    imageBlob: any;
    imageFile: any;
    cal: CalculateShipFee;
    // 1: collect; 2: delivery
    action: number;

    constructor(
        private receiptnoteService: ReceiptnoteService,
        private invoiceService: InvoiceHeaderService,
        private activatedRoute: ActivatedRoute,
        private route: Router,
        private principal: Principal,
        private imageCompress: NgxImageCompressService,
        private imageService: ReceiptImageService,
        private accountService: AccountService,
        private alertService: JhiAlertService
    ) {
        this.cal = new CalculateShipFee();
        this.receiptnote = new Receiptnote();
        this.invoiceHeader = new InvoiceHeader();
        this.pay = false;
        this.invId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        this.principal.identity().then(account => {
            this.currentUser = account;
            this.receiptnote.employeeId = this.currentUser.id;
            this.accountService.findByUserID({ id: this.currentUser.id }).subscribe(res => {
                this.currentProfile = res.body;
            });
        });
    }

    ngOnInit() {
        this.pay = false;
        this.activatedRoute.data.subscribe(({ personalShipment }) => {
            this.personalShipment = personalShipment;
            this.loadAll();
        });
    }

    loadAll() {
        if (this.currentUser.authorities.find(e => e === 'ROLE_SHIPPER')) {
            this.receiptnote.invoiceHeaderId = this.personalShipment.invoiceHeaderId;
            this.receiptnote.shipmentId = this.personalShipment.id;
            forkJoin(
                this.invoiceService.find(this.receiptnote.invoiceHeaderId),
                this.receiptnoteService.getReceiptItemPackage({ id: this.receiptnote.invoiceHeaderId })
            ).subscribe(res => {
                this.invoiceHeader = res[0].body;
                this.createPackage = res[1].body;
                if (this.personalShipment.shipmentType === 'collect') {
                    this.pay = !this.invoiceHeader.receiverPay;
                } else {
                    this.pay = this.invoiceHeader.receiverPay;
                }
                this.invoiceService.getUserByID({ id: this.invoiceHeader.customerId }).subscribe(resp => {
                    this.customerUser = resp.body;
                    this.customerName = this.customerUser.lastName + ' ' + this.customerUser.firstName;
                });
            });
        } else {
            this.invoiceService.find(this.invId).subscribe(res => {
                this.invoiceHeader = res.body;
                this.receiptnoteService.getReceiptItemPackage({ id: this.invoiceHeader.id }).subscribe(response => {
                    this.createPackage = response.body;
                    this.receiptnote.invoiceHeaderId = this.invoiceHeader.id;
                });
                this.pay = !this.invoiceHeader.receiverPay;
                this.invoiceService.getUserByID({ id: this.invoiceHeader.customerId }).subscribe(resp => {
                    this.customerUser = resp.body;
                    this.customerName = this.customerUser.lastName + ' ' + this.customerUser.firstName;
                });
            });
        }
    }

    calculate() {
        this.invoiceHeader.subTotal = Math.round(this.cal.calculateSubTotal(this.createPackage));
        this.invoiceHeader.taxAmount = Math.round(0.1 * this.invoiceHeader.subTotal);
        this.invoiceHeader.totalDue = Math.round(1.1 * this.invoiceHeader.subTotal);
    }

    selectFile(event: any) {
        let fileName: any;
        this.file = event.target.files[0];
        fileName = this.file['name'];
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (evento: any) => {
                this.localUrl = evento.target.result;
                this.compressFile(this.localUrl, fileName);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    dataURItoBlob(dataURI) {
        const byteString = window.atob(dataURI);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: 'image/jpeg' });
        return blob;
    }

    compressFile(image, fileName) {
        const orientation = -1;
        this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
        console.warn('Size in bytes is now:', this.sizeOfOriginalImage);
        this.imageCompress.compressFile(image, orientation, 50, 50).then(result => {
            this.imgResultAfterCompress = result;
            this.localCompressedURl = result;
            this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);
            console.warn('Size in bytes after compression:', this.sizeOFCompressedImage);
            // create file from byte
            const imageName = fileName;
            // call method that creates a blob from dataUri
            this.imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);

            // imageFile created below is the new compressed file which can be send to API in form data
            this.imageFile = new File([result], imageName, { type: 'image/jpeg' });
        });
    }

    previousState() {
        window.history.back();
    }

    sendImage(id: number) {
        if (this.imageBlob) {
            this.imageService.create(id, this.imageBlob).subscribe(res => {
                return res;
            });
        }
    }

    save() {
        if (this.sizeOFCompressedImage) {
            let wei = 0;
            for (const obj of this.createPackage) {
                wei += obj.invPackage.weight;
            }
            if (this.createPackage.length > 0 && wei > 0) {
                if (this.currentUser.authorities.find(e => e === 'ROLE_SHIPPER')) {
                    console.log('shipper');
                    this.isSaving = true;
                    if (this.personalShipment.shipmentType === 'collect') {
                        this.data = new CustomReceipt();
                        this.receiptnote.receiptType = true;
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
                                if (typeof this.sendImage(res.body.id) !== typeof HttpErrorResponse) {
                                    this.sendEmail(res.body);
                                    this.isSaving = false;
                                    this.route.navigate([`/receiptnote/${this.invId}/view`]);
                                }
                            },
                            (res: HttpErrorResponse) => {
                                this.onSaveError();
                            }
                        );
                    } else {
                        this.data = new CustomReceipt();
                        this.receiptnote.receiptType = false;
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
                                if (typeof this.sendImage(res.body.id) !== typeof HttpErrorResponse) {
                                    this.sendEmail(res.body);
                                    this.isSaving = false;
                                    this.route.navigate([`/receiptnote/${this.invId}/view`]);
                                }
                            },
                            (res: HttpErrorResponse) => {
                                this.onSaveError();
                            }
                        );
                    }
                    this.isSaving = false;
                } else {
                    console.log('officer');
                    this.receiptnote.note = this.receiptnote.note ? this.receiptnote.note : '';
                    this.receiptnote.note += ' Nh???n h??ng t??? kh??ch t???i v??n ph??ng';
                    this.invoiceHeader.officeId = this.currentProfile.officeId;
                    this.data = new CustomReceipt();
                    this.receiptnote.receiptType = true;
                    this.data.receipt = this.receiptnote;
                    if (!this.invoiceHeader.receiverPay) {
                        this.data.pay = true;
                        this.data.payAmount = this.invoiceHeader.totalDue.toString();
                    }
                    for (const obj of this.createPackage) {
                        this.data.packageList.push(obj);
                    }
                    this.receiptnoteService.createReceiptByOfficer(this.currentProfile.officeId, this.data).subscribe(
                        (res: HttpResponse<IReceiptnote>) => {
                            this.sendEmail(res.body);
                            this.isSaving = false;
                            this.route.navigate([`/receiptnote/${this.invId}/view`]);
                        },
                        (res: HttpErrorResponse) => {
                            this.onSaveError();
                        }
                    );
                }
            }
        } else {
            window.scroll(0, 0);
            this.alertService.error('Ch??a c?? ???nh ch???p giao nh???n g??i h??ng');
        }
    }

    sendEmail(receipt: any) {
        const param = new ReceiptInvoice();
        param.customer = this.customerUser;
        param.employee = this.currentUser;
        param.receipt = receipt;
        param.invoiceHeader = this.invoiceHeader;
        this.invoiceService.sendReceiptNoteEmail(param).subscribe();
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

export class ReceiptInvoice {
    customer: IUser;
    employee: IUser;
    receipt: IReceiptnote;
    invoiceHeader: IInvoiceHeader;
}

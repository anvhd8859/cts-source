import { WarehouseTransferConfirmModalComponent } from './warehouse-transfer-modal.component';
import { UserService } from './../../../core/user/user.service';
import { ITransferDetails } from 'app/shared/model/ctsmicroservice/transfer-details.model';
import { WarehouseService } from './../warehouse/warehouse.service';
import { WarehouseTransferRequestService } from 'app/entities/ctsmicroservice/warehouse-transfer-request/warehouse-transfer-request.service';
import { forkJoin } from 'rxjs';
import { IWarehouse } from './../../../shared/model/ctsmicroservice/warehouse.model';
import { IUser } from './../../../core/user/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonString } from 'app/shared';

import { IWarehouseTransferRequest } from 'app/shared/model/ctsmicroservice/warehouse-transfer-request.model';
import { IInvoicePackageShipment } from '../import-invoice-package';
import { AccountService, Principal } from 'app/core';
import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { IInvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-warehouse-transfer-request-detail',
    templateUrl: './warehouse-transfer-request-detail.component.html'
})
export class WarehouseTransferRequestDetailComponent implements OnInit {
    transferRequest: IWarehouseTransferRequest;
    invoicePackageShipments: TransferDetailsInvoice[];
    fromWarehouse: IWarehouse;
    currentAccount: IUser;
    fromKeeper: IUser;
    all: boolean;
    selectedCheckBox: boolean[];
    common: CommonString;

    constructor(
        private warehouseTransferRequestService: WarehouseTransferRequestService,
        private accountService: AccountService,
        private userService: UserService,
        private warehouseService: WarehouseService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private modalService: NgbModal
    ) {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
    }

    ngOnInit() {
        this.common = new CommonString();
        this.activatedRoute.data.subscribe(({ warehouseTransferRequest }) => {
            forkJoin(
                this.warehouseTransferRequestService.getWarehouseTransferData(warehouseTransferRequest.id),
                this.warehouseService.find(warehouseTransferRequest.fromWarehouseId)
            ).subscribe(res => {
                this.transferRequest = warehouseTransferRequest;
                this.invoicePackageShipments = res[0].body;
                this.fromWarehouse = res[1].body;
                for (const obj of this.invoicePackageShipments) {
                    if (obj) {
                        this.selectedCheckBox.push(false);
                    }
                }
            });
        });
    }

    approve() {
        let selectedRequestInvoices = new Array();
        if (this.selectedCheckBox) {
            for (const i in this.selectedCheckBox) {
                if (this.selectedCheckBox[i]) {
                    selectedRequestInvoices.push(this.invoicePackageShipments[i]);
                }
            }
        }
        const modalRef = this.modalService.open(WarehouseTransferConfirmModalComponent as Component, {
            size: 'lg',
            backdrop: 'static'
        });
        modalRef.componentInstance.selectedImportInvoices = selectedRequestInvoices;
        modalRef.result.then(
            result => {
                if (result) {
                    const closeResult = result;
                    if (closeResult.startsWith('OK')) {
                        const data = new Array();
                        for (const i in this.selectedCheckBox) {
                            const rd = this.invoicePackageShipments[i];
                            if (this.selectedCheckBox[i]) {
                                rd.transferDetails.status = true;
                            } else {
                                rd.transferDetails.status = false;
                            }
                            data.push(rd);
                        }
                        this.warehouseTransferRequestService.approveTransferRequest(data).subscribe(
                            (res: HttpResponse<any>) => {
                                this.previousState();
                            },
                            (res: HttpErrorResponse) => {}
                        );
                    }
                }
            },
            reason => {}
        );
    }

    // window.scroll(0, 0);
    // this.alertService.error(msg);

    previousState() {
        window.history.back();
    }

    checked(i: number, e) {
        if (e.target.checked) {
            this.selectedCheckBox[i] = true;
            let myAll = true;
            for (let bool of this.selectedCheckBox) {
                if (!bool) {
                    myAll = false;
                    break;
                }
            }
            this.all = myAll;
        } else {
            this.selectedCheckBox[i] = false;
            this.all = false;
        }
    }

    checkAll(e) {
        if (e.target.checked) {
            for (const i in this.selectedCheckBox) {
                if (this.selectedCheckBox.hasOwnProperty(i)) {
                    this.selectedCheckBox[i] = true;
                }
            }
        } else {
            for (const i in this.selectedCheckBox) {
                if (this.selectedCheckBox.hasOwnProperty(i)) {
                    this.selectedCheckBox[i] = false;
                }
            }
        }
    }

    totalPackages(list?: TransferDetailsInvoice[]) {
        let total = 0;
        for (const obj of list) {
            total += obj.invoicePackageList.length;
        }
        return total;
    }
}

export class TransferDetailsInvoice {
    transferDetails: ITransferDetails;
    invoiceHeader?: IInvoiceHeader;
    invoicePackageList?: IInvoicePackage[];
}

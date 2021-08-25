import { ImportExportWarehouseService } from './import-export-warehouse.service';
import { IInvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';
import { IRequestDetails } from './../../../shared/model/ctsmicroservice/request-details.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { RequestDetailsService } from 'app/entities/ctsmicroservice/request-details/request-details.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImportExportWarehouse } from 'app/shared/model/ctsmicroservice/import-export-warehouse.model';
import { PackageDetailsDTO } from '../invoice-header';
import { CommonString } from 'app/shared';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { IInvoicePackageShipment } from '../import-invoice-package';
import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { IUser, Principal } from 'app/core';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-import-export-warehouse-detail',
    templateUrl: './import-export-warehouse-detail.component.html'
})
export class ImportExportWarehouseDetailComponent implements OnInit {
    currentAccount: IUser;
    currentProfile: IUserProfile;
    importExportWarehouse: IImportExportWarehouse;
    requestDetailsList: RequestDetailInvoice[];
    common: CommonString;
    isSaving: boolean;
    all: boolean;
    selectedCheckBox: boolean[] = [];
    selectedRequestInvoices: any;
    listNote = {};

    constructor(
        private activatedRoute: ActivatedRoute,
        private importExportWarehouseService: ImportExportWarehouseService,
        private requestDetailsService: RequestDetailsService,
        private principal: Principal,
        private alertService: JhiAlertService,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.common = new CommonString();
        this.activatedRoute.data.subscribe(({ importExportWarehouse }) => {
            this.importExportWarehouse = importExportWarehouse;
            this.requestDetailsService.getRequestDetailsByHeaderId({ id: importExportWarehouse.id }).subscribe(res => {
                this.requestDetailsList = res.body;
                for (const i of this.requestDetailsList) {
                    this.selectedCheckBox.push(true);
                }
            });
        });
    }

    checked(i: number, e) {
        if (e.target.checked) {
            this.selectedCheckBox[i] = true;
            let myAll = true;
            for (let bool of this.selectedCheckBox) {
                if (!bool) {
                    myAll = false;
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

    processAction(id: number) {
        let empty = false;
        this.selectedRequestInvoices = new Array();
        for (const i in this.selectedCheckBox) {
            if (this.selectedCheckBox[i]) {
                this.selectedRequestInvoices.push(this.requestDetailsList[i]);
            }
        }
        if (this.selectedRequestInvoices.length === 0) {
            empty = true;
        }
        const modalRef = this.modalService.open(NgbdModalConfirmComponent as Component, {
            size: 'lg',
            backdrop: 'static'
        });
        if (id === 1) {
            modalRef.componentInstance.action = 'chấp thuận';
        } else {
            modalRef.componentInstance.action = 'từ chối';
        }
        modalRef.componentInstance.empty = empty;
        modalRef.result.then(
            result => {
                let ieRequestDetail = new IERequestDetail();
                this.importExportWarehouse.keeperConfirm = true;
                this.importExportWarehouse.keeperId = this.currentAccount.id;
                if (result) {
                    this.importExportWarehouse.note = result;
                }
                ieRequestDetail.importExportWarehouse = this.importExportWarehouse;
                if (id === 1) {
                    let check = true;
                    for (let i in this.selectedCheckBox) {
                        if (this.selectedCheckBox[i]) {
                            this.requestDetailsList[i].requestDetails.keeperConfirm = true;
                            this.requestDetailsList[i].requestDetails.status = true;
                        } else {
                            this.requestDetailsList[i].requestDetails.keeperConfirm = true;
                            this.requestDetailsList[i].requestDetails.status = false;
                            if (
                                !(
                                    this.requestDetailsList[i].requestDetails.note &&
                                    this.requestDetailsList[i].requestDetails.note.trim() !== ''
                                )
                            ) {
                                check = false;
                            }
                        }
                    }
                    if (check) {
                        ieRequestDetail.requestDetailsList = this.requestDetailsList;
                        this.subscribeToSaveResponse(this.importExportWarehouseService.approveIERequest(ieRequestDetail));
                    } else {
                        window.scroll(0, 0);
                        this.alertService.error('Bạn chưa điền lý do từ chố đơn');
                    }
                } else {
                    ieRequestDetail.requestDetailsList = this.requestDetailsList;
                    this.subscribeToSaveResponse(this.importExportWarehouseService.rejectIERequest(ieRequestDetail));
                }
            },
            reason => {}
        );
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IImportExportWarehouse>>) {
        result.subscribe(
            (res: HttpResponse<IImportExportWarehouse>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    previousState() {
        window.history.back();
    }

    totalWeight(packageList: IInvoicePackage[]) {
        let x = 0;
        for (const obj of packageList) {
            x += obj.weight;
        }
        return x;
    }

    // END TS FILE
}

export class InvoicePackageDetailDTO {
    invoice: IInvoiceHeader;
    packageList: PackageDetailsDTO[];
    constructor() {}
}

@Component({
    selector: 'jhi-modal-confirm-component',
    template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Xác nhận {{action}}</h4>
    </div>
    <div class="modal-body">
      <p *ngIf='!empty'>
        <strong>Bạn chắc chắn muốn {{action}} những yêu cầu này?</strong>
        <br>
        <br>
        <span *ngIf="action === 'từ chối'">
            <label>Lý do: </label>
            <textarea  class="form-control" style="resize: none;" rows="3"
                ([ngModel])="note" type="text"></textarea>
        </span>
        <br>
      </p>
      <p *ngIf="empty">
      <strong>Bạn chưa lựa chọn hóa đơn nào!</strong>
      </p>
    </div>
    <div class="modal-footer">
      <button
        style="width: 20%;"
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        Cancel
      </button>
      <button *ngIf="!empty"
        style="margin-left: 51%; width: 20%; margin-right:5%"
        type="button"
        class="btn btn-primary"
        (click)="passback()"
      >
        Ok
      </button>
    </div>
  `
})
export class NgbdModalConfirmComponent {
    action: string;
    note: string;
    empty = false;
    check: string;

    constructor(public modal: NgbActiveModal) {
        this.note = '';
        if (this.action === 'từ chối') {
            this.empty = false;
        }
    }

    passback() {
        if (this.action === 'từ chối') {
            if (!(this.note && this.note.trim())) {
                this.modal.close(this.note);
            } else {
                this.check = 'Hãy điền lý do hủy đơn';
            }
        } else {
            this.modal.close(this.note);
        }
    }
}

export class IERequestDetail {
    importExportWarehouse: IImportExportWarehouse;
    requestDetailsList: RequestDetailInvoice[];
}

export class RequestDetailInvoice {
    requestDetails: IRequestDetails;
    invoiceHeader: IInvoiceHeader;
    packageList: IInvoicePackage[];
}

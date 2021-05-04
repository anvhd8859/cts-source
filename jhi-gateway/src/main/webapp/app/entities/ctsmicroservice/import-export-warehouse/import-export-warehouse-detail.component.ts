import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { RequestDetailsService } from 'app/entities/ctsmicroservice/request-details/request-details.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImportExportWarehouse } from 'app/shared/model/ctsmicroservice/import-export-warehouse.model';
import { PackageDetailsDTO } from '../invoice-header';
import { CommonString } from 'app/shared';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { IShipmentInvoice } from './../invoice-header/personal-shipment/personal-shipment.service';
import { IInvoiceHeader } from './../../../shared/model/ctsmicroservice/invoice-header.model';

@Component({
    selector: 'jhi-import-export-warehouse-detail',
    templateUrl: './import-export-warehouse-detail.component.html'
})
export class ImportExportWarehouseDetailComponent implements OnInit {
    importExportWarehouse: IImportExportWarehouse;
    requestDetailsList: IShipmentInvoice[];
    common: CommonString;
    isSaving: boolean;
    all: boolean;
    selectedCheckBox: boolean[] = [];
    selectedRequestInvoices: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private requestDetailsService: RequestDetailsService,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.common = new CommonString();
        this.activatedRoute.data.subscribe(({ importExportWarehouse }) => {
            console.log('0000000');
            console.log(importExportWarehouse);
            this.importExportWarehouse = importExportWarehouse;
            this.requestDetailsService.getRequestDetailsByHeaderId({ id: importExportWarehouse.id }).subscribe(res => {
                this.requestDetailsList = res.body;
                for (const i of this.requestDetailsList) {
                    this.selectedCheckBox.push(true);
                }
            });
        });
        console.log('11111');
        console.log(this.importExportWarehouse);
        console.log('22222');
        console.log(this.requestDetailsList);
    }

    checked(i: number, e) {
        if (e.target.checked) {
            this.selectedCheckBox[i] = true;
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
                if (result) {
                    if (id === 1) {
                        this.importExportWarehouse.note = 'approve';
                        console.log(this.importExportWarehouse.note);
                        this.importExportWarehouse.keeperConfirm = true;
                        this.subscribeToSaveResponse(
                            this.requestDetailsService.updateImportExportByKeeper(
                                this.importExportWarehouse.id,
                                this.selectedRequestInvoices
                            )
                        );
                    } else {
                        this.importExportWarehouse.note = 'reject';
                        // console.log(this.importExportWarehouse.note);
                        // this.importExportWarehouse.keeperConfirm = true;
                        // this.subscribeToSaveResponse(
                        //     this.requestDetailsService.updateImportExportByKeeper(
                        //         this.importExportWarehouse.id,
                        //         this.selectedRequestInvoices
                        //     )
                        // );
                    }
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
        (click)="modal.close('Ok')"
      >
        Ok
      </button>
    </div>
  `
})
export class NgbdModalConfirmComponent {
    action: string;
    empty = false;

    constructor(public modal: NgbActiveModal) {}
}

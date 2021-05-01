import { IInvoiceHeader } from './../../../shared/model/ctsmicroservice/invoice-header.model';
import { HttpResponse } from '@angular/common/http';
import { RequestDetailsService } from 'app/entities/ctsmicroservice/request-details/request-details.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImportExportWarehouse } from 'app/shared/model/ctsmicroservice/import-export-warehouse.model';
import { IRequestDetails } from 'app/shared/model/ctsmicroservice/request-details.model';
import { PackageDetailsDTO } from '../invoice-header';
import { CommonString } from 'app/shared';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-import-export-warehouse-detail',
    templateUrl: './import-export-warehouse-detail.component.html'
})
export class ImportExportWarehouseDetailComponent implements OnInit {
    importExportWarehouse: IImportExportWarehouse;
    requestDetailsList: InvoicePackageDetailDTO[];
    common: CommonString;

    constructor(
        private activatedRoute: ActivatedRoute,
        private requestDetailsService: RequestDetailsService,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.common = new CommonString();
        this.activatedRoute.data.subscribe(({ importExportWarehouse }) => {
            this.importExportWarehouse = importExportWarehouse;
            this.requestDetailsService
                .getRequestDetailsByHeaderId({ id: this.importExportWarehouse.id })
                .subscribe((res: HttpResponse<InvoicePackageDetailDTO[]>) => {
                    this.requestDetailsList = res.body;
                });
        });
    }

    processAction(i: number) {
        let closeResult = '';
        const modalRef = this.modalService.open(NgbdModalConfirmComponent as Component, {
            size: 'lg',
            backdrop: 'static'
        });
        if (i === 1) {
            modalRef.componentInstance.action = 'chấp thuận';
        } else {
            modalRef.componentInstance.action = 'từ chối';
        }
        modalRef.result.then(
            result => {
                if (result) {
                    closeResult = result;
                }
            },
            reason => {}
        );
        if (closeResult === 'OK') {
            if (i === 1) {
                this.importExportWarehouse.note = 'approve';
            } else {
                this.importExportWarehouse.note = 'reject';
            }
            this.importExportWarehouse.keeperConfirm = true;
            this.requestDetailsService;
        }
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
      <button
        type="button"
        class="close"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
        <strong>Bạn chắc chắn muốn {{action}} yêu cầu này?</strong>
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
      <button
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

    constructor(public modal: NgbActiveModal) {}

    passBack() {
        this.modal.close('OK');
    }
}

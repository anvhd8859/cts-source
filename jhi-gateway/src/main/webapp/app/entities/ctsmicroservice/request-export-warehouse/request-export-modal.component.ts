import { IShipmentInvoice } from 'app/entities/ctsmicroservice/invoice-header/personal-shipment';
import { CommonString } from 'app/shared';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-request-export-modal-confirm',
    templateUrl: './request-export-modal.component.html'
})
export class RequestExportModalConfirmComponent {
    selectedImportInvoices: IShipmentInvoice[];
    common: CommonString;

    constructor(public modal: NgbActiveModal) {
        this.common = new CommonString();
    }

    passBack() {
        this.modal.close('OK');
    }
}

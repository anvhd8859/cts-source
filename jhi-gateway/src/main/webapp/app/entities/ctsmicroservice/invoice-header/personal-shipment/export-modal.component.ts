import { CommonString } from './../../../../shared/util/request-util';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IShipmentInvoice } from '.';

@Component({
    selector: 'jhi-export-modal-confirm',
    templateUrl: './export-modal.component.html'
})
export class ExportModalConfirmComponent {
    selectedExportInvoices: IShipmentInvoice[];
    common: CommonString;

    constructor(public modal: NgbActiveModal) {
        this.common = new CommonString();
    }

    passBack() {
        this.modal.close('OK');
    }
}

import { IShipmentInvoice } from 'app/entities/ctsmicroservice/invoice-header/personal-shipment';
import { CommonString } from 'app/shared';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TransferDetailsInvoice } from '.';

@Component({
    selector: 'jhi-warehouse-transfer-modal-confirm',
    templateUrl: './warehouse-transfer-modal.component.html'
})
export class WarehouseTransferConfirmModalComponent {
    selectedImportInvoices: TransferDetailsInvoice[];
    common: CommonString;

    constructor(public modal: NgbActiveModal) {
        this.common = new CommonString();
    }

    passBack() {
        this.modal.close('OK');
    }
}

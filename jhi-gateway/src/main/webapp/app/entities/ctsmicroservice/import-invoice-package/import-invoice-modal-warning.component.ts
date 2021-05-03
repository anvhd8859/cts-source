import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-import-invoice-modal-warning-component',
    template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Warning</h4>
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
      <p *ngIf="!action">
        <strong>Bạn có muốn Nhập các hóa đơn này vào kho?</strong>
      </p>
      <p *ngIf="action">
        <strong>Bạn chưa lựa chọn hóa đơn nào!</strong>
      </p>
    </div>
    <div class="modal-footer">
    <button
        style="width: 20%;"
        type="button"
        class="btn btn-info"
        (click)="modal.dismiss('Cancel click')"
      >
        Hủy
      </button>
      <button *ngIf="!action"
        style="margin-left: 51%; width: 20%; margin-right:5%"
        type="button"
        class="btn btn-primary"
        (click)="modal.close('Ok click')"
      >
        Xác nhận
      </button>
    </div>
  `
})
export class ImportInvoiceModalWarningComponent {
    action = false;
    constructor(public modal: NgbActiveModal) {}
}

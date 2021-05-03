import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-modal-warning-component',
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
      <p>
        <strong>Bạn lựa chọn một số hóa đơn đã yêu cầu xuất nhập kho hoặc không đủ điều kiện</strong>
      </p>
    </div>
    <div class="modal-footer">
      <div
        style="width: 20%; width: 30px;"
      >
      </div>
      <button
        style="margin-left: 51%; width: 20%; margin-right:5%"
        type="button"
        class="btn btn-warning"
        (click)="modal.close('Ok click')"
      >
        Ok
      </button>
    </div>
  `
})
export class ModalWarningComponent {
    constructor(public modal: NgbActiveModal) {}
}

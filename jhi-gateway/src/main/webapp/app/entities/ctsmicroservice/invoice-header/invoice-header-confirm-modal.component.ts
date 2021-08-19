import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-invoice-header-confirm-modal',
    template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">{{action ? 'Chấp thuận' : 'Từ chối'}}</h4>
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
        <h3>
            Bạn chắc chắn muốn {{action ? 'Chấp thuận' : 'Từ chối'}} đơn hàng này?
            <span *ngIf="!action">
                <i style="color: red">{{check}}</i>
                <label>Lý do: </label>
                <textarea  class="form-control" style="resize: none;" rows="3"
                    ([ngModel])="note" type="text"></textarea>
            </span>
        </h3>
    <div class="modal-footer">
      <button
        style="width: 20%;"
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        Hủy
      </button>
      <button
        style="margin-left: 51%; width: 20%; margin-right:5%"
        type="button"
        class="btn btn-danger"
        (click)="pasBack()"
      >
      {{action ? 'Chấp thuận' : 'Từ chối'}}
      </button>
    </div>
  `
})
export class InvoiceHeaderConfirmComponent {
    action: boolean;
    note: string;
    check: string;
    constructor(public modal: NgbActiveModal) {
        this.check = '';
    }

    pasBack() {
        if (this.action || (this.note && this.note.trim())) {
            this.modal.close(this.note);
        } else {
            this.check = 'Hãy điền lý do hủy đơn hàng';
        }
    }
}

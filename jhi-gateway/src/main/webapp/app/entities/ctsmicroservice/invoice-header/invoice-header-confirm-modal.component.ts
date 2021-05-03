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
        </h3>
    <div class="form-group">
        <label class="form-control-label" for="note">Lý do từ chối</label>
        <textarea class="form-control" style="resize: none;" rows="3"
            id="address" id="note" name="note"
            [(ngModel)]="note">
             </textarea>
        </div>
    </div>
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
        (click)="modal.close(note)"
      >
      {{action ? 'Chấp thuận' : 'Từ chối'}}
      </button>
    </div>
  `
})
export class InvoiceHeaderConfirmComponent {
    action: boolean;
    note: string;
    constructor(public modal: NgbActiveModal) {}
}

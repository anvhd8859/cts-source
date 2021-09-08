import { InvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { IInvoiceHeader } from './../../../shared/model/ctsmicroservice/invoice-header.model';
import { CommonString } from './../../../shared/util/request-util';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IPayment, Payment } from 'app/shared/model/ctsmicroservice/payment.model';
import { AccountService, IUser, Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { PaymentService } from './payment.service';
import { InvoiceHeaderService } from '../invoice-header';
import { InvoicePackageDetailDTO } from '../import-export-warehouse';
import { Moment } from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-payment',
    templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit, OnDestroy {
    currentAccount: IUser;
    payments: PaymentInvoiceDTO[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    invoiceList: InvoicePackageDetailDTO[];
    common: CommonString;
    lstUser: IUser[] = [];
    selectedUser: IUser;
    selectedUserProfile: IUserProfile;
    totalAmount: number = 0;

    constructor(
        private paymentService: PaymentService,
        private invoiceHeaderService: InvoiceHeaderService,
        private accountService: AccountService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private eventManager: JhiEventManager,
        private ngxUiLoaderService: NgxUiLoaderService,
        private modal: NgbModal
    ) {
        this.common = new CommonString();
    }

    loadAll() {
        this.ngxUiLoaderService.start();
        this.paymentService
            .findPaymentByShipperId({
                id: this.selectedUser.id
            })
            .subscribe(
                (res: HttpResponse<PaymentInvoiceDTO[]>) => {
                    this.payments = res.body;
                    for (const p of this.payments) {
                        this.totalAmount += p.payment.amountPaid;
                    }
                    this.ngxUiLoaderService.stop();
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    changeUser() {
        this.accountService.findByUserID({ id: this.selectedUser.id }).subscribe(res => {
            this.selectedUserProfile = res.body;
            this.loadAll();
        });
    }

    boolToString(b: any) {
        if (b) {
            return 'Người nhận trả';
        } else {
            return 'Người gửi trả';
        }
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
            this.invoiceHeaderService.getListShipperByOfficerId({ id: this.currentAccount.id }).subscribe(res => {
                this.lstUser = res.body;
            });
        });
        this.registerChangeInPayments();
    }

    confirm() {
        const modalRef = this.modal.open(PaymentModalWarningComponent as Component, {
            size: 'lg',
            backdrop: 'static'
        });
        modalRef.componentInstance.name = this.selectedUser.firstName + ' ' + this.selectedUser.lastName;
        modalRef.result.then(
            result => {
                this.confirm();
            },
            reason => {}
        );
    }

    doConfirm() {
        let data = new Array();
        for (const p of this.payments) {
            p.payment.officerId = this.currentAccount.id;
            data.push(p.payment);
        }
        this.paymentService.approveAllPaymentsByOfficer(data).subscribe(res => {
            this.loadAll();
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPayments() {
        this.eventSubscriber = this.eventManager.subscribe('paymentListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error('Đã xảy ra lỗi khi thực hiện', null, null);
        this.ngxUiLoaderService.stop();
    }

    exportExcel() {
        this.ngxUiLoaderService.start();
        this.paymentService.exportToFileExcel(this.payments).subscribe(res => {
            this.ngxUiLoaderService.stop();
            this.downloadFile(res.body);
        });
    }

    downloadFile(data: any) {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const filename = 'Payment_Report.xlsx';
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    }
}

export class PaymentInvoiceDTO {
    payment: IPayment;
    invoice: IInvoiceHeader;
    constructor() {
        this.payment = new Payment();
        this.invoice = new InvoiceHeader();
    }
}

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
        <strong>Bạn chắc chắn xác nhận Thu tiền cho nhân viên giao hàng {{name}}?</strong>
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
      <button
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
export class PaymentModalWarningComponent {
    name: any;
    constructor(public modal: NgbActiveModal) {}
}

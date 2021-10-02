import { PaymentInvoiceDTO } from './payment.component';
import { CommonString } from '../../../shared/util/request-util';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUser, Principal } from 'app/core';

import { PaymentService } from './payment.service';
import { InvoicePackageDetailDTO } from '../import-export-warehouse';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IUserProfile } from 'app/shared/model/user-profile.model';

@Component({
    selector: 'jhi-payment-shipper',
    templateUrl: './payment-shipper.component.html'
})
export class PaymentShipperComponent implements OnInit, OnDestroy {
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
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private eventManager: JhiEventManager,
        private ngxUiLoaderService: NgxUiLoaderService
    ) {
        this.common = new CommonString();
    }

    loadAll() {
        this.payments = new Array();
        this.ngxUiLoaderService.start();
        this.paymentService
            .findPaymentByShipperId({
                id: this.currentAccount.id
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
            this.loadAll();
        });
        this.registerChangeInPayments();
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

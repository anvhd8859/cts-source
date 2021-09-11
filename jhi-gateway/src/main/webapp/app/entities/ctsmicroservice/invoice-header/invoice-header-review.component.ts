import { IUser } from './../../../core/user/user.model';
import { IPersonalShipment } from './../../../shared/model/ctsmicroservice/personal-shipment.model';
import { PersonalShipmentService } from './personal-shipment/personal-shipment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { AccountService, Principal } from 'app/core';

import { ITEMS_PER_PAGE, CommonString } from 'app/shared';
import { InvoiceHeaderService } from './invoice-header.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { InvoiceHeaderConfirmComponent } from './invoice-header-confirm-modal.component';
import { Moment } from 'moment';
import { IUserProfile } from 'app/shared/model/user-profile.model';

@Component({
    selector: 'jhi-invoice-header-review',
    templateUrl: './invoice-header-review.component.html'
})
export class InvoiceHeaderReviewComponent implements OnInit, OnDestroy {
    currentAccount: any;
    currentProfile: IUserProfile;
    invoiceHeaders: IInvoiceHeader[];
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
    common: CommonString;
    selectedStatus: any;
    selectedInvoiceNumber: any;
    createTime: Moment;
    updateTime: Moment;
    receiveTime: Moment;

    constructor(
        private invoiceHeaderService: InvoiceHeaderService,
        private personalShipmentService: PersonalShipmentService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private accountService: AccountService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private ngxUiLoaderService: NgxUiLoaderService,
        private modal: NgbModal
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
            this.common = new CommonString();
        });
    }

    loadAll() {
        this.ngxUiLoaderService.start();
        const param = {
            id: this.currentProfile.officeId,
            invoiceNo: this.selectedInvoiceNumber ? this.selectedInvoiceNumber : '',
            receiveDate: this.receiveTime
                ? this.receiveTime.year() + '-' + (this.receiveTime.month() + 1) + '-' + this.receiveTime.date()
                : '',
            createDate: this.createTime ? this.createTime.year() + '-' + (this.createTime.month() + 1) + '-' + this.createTime.date() : '',
            updateDate: this.updateTime ? this.updateTime.year() + '-' + (this.updateTime.month() + 1) + '-' + this.updateTime.date() : '',
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        };
        this.invoiceHeaderService.getWaitingReview(param).subscribe(
            (res: HttpResponse<IInvoiceHeader[]>) => {
                this.paginateInvoiceHeaders(res.body, res.headers);
                this.ngxUiLoaderService.stop();
            },
            (res: HttpErrorResponse) => {
                this.onError(res.message);
                this.ngxUiLoaderService.stop();
            }
        );
    }

    approve(i: number) {
        let modalRef = this.modal.open(InvoiceHeaderConfirmComponent as Component, {
            size: 'lg',
            backdrop: 'static'
        });
        modalRef.componentInstance.action = true;
        modalRef.result.then(
            result => {
                const updateInvoice = this.invoiceHeaders[i];
                updateInvoice.note += 'OK';
                this.invoiceHeaderService.updateReviewApproveInvoice(updateInvoice).subscribe(
                    (res: HttpResponse<IInvoiceHeader>) => {
                        const data = new InvoiceShipmentShipper();
                        data.invoice = res.body;
                        this.personalShipmentService
                            .getCollectByInvoice({ id: data.invoice.id })
                            .subscribe((response: HttpResponse<any>) => {
                                data.shipment = response.body;
                                this.invoiceHeaderService.sendNotifyShipmentEmail(data).subscribe();
                            });
                        this.eventManager.broadcast({
                            name: 'invoiceHeaderListModification',
                            content: 'Approve successful an invoiceHeader'
                        });
                        modalRef.dismiss(true);
                        modalRef = null;
                    },
                    (res: HttpErrorResponse) => {
                        this.eventManager.broadcast({
                            name: 'invoiceHeaderListModification',
                            content: 'Error on approve an invoiceHeader'
                        });
                        modalRef.dismiss(true);
                        modalRef = null;
                    }
                );
            },
            reason => {
                modalRef = null;
            }
        );
    }

    reject(i: number) {
        let modalRef = this.modal.open(InvoiceHeaderConfirmComponent as Component, {
            size: 'lg',
            backdrop: 'static'
        });
        modalRef.componentInstance.action = false;
        modalRef.result.then(
            result => {
                const updateInvoice = this.invoiceHeaders[i];
                updateInvoice.note = result;
                updateInvoice.note += 'KO';
                this.invoiceHeaderService.updateReviewRejectInvoice(updateInvoice).subscribe(
                    (res: HttpResponse<IInvoiceHeader>) => {
                        this.eventManager.broadcast({
                            name: 'invoiceHeaderListModification',
                            content: 'Reject successful an invoiceHeader'
                        });
                        modalRef.dismiss(true);
                        modalRef = null;
                    },
                    (res: HttpErrorResponse) => {
                        this.eventManager.broadcast({
                            name: 'invoiceHeaderListModification',
                            content: 'Error on reject an invoiceHeader'
                        });
                        modalRef.dismiss(true);
                        modalRef = null;
                    }
                );
            },
            reason => {
                modalRef.dismiss(true);
                modalRef = null;
            }
        );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/invoice-header-review'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/invoice-header-review',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.common = new CommonString();
        this.principal.identity().then(account => {
            this.currentAccount = account;
            this.accountService.findByUserID({ id: this.currentAccount.id }).subscribe(profile => {
                this.currentProfile = profile.body;
                this.loadAll();
            });
        });
        this.registerChangeInInvoiceHeaders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInvoiceHeader) {
        return item.id;
    }

    registerChangeInInvoiceHeaders() {
        this.eventSubscriber = this.eventManager.subscribe('invoiceHeaderListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    clearDatepicker(id: number) {
        switch (id) {
            case 1:
                this.receiveTime = null;
                break;
            case 2:
                this.createTime = null;
                break;
            case 3:
                this.updateTime = null;
                break;
        }
    }

    private paginateInvoiceHeaders(data: IInvoiceHeader[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.invoiceHeaders = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error('Đã xảy ra lỗi khi thực hiện', null, null);
    }
}

export class InvoiceShipmentShipper {
    invoice: IInvoiceHeader;
    shipment: IPersonalShipment;
    shipper: IUser;
}

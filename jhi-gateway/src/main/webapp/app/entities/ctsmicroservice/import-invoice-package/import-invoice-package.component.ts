import { CommonString } from './../../../shared/util/request-util';
import { IUserProfile } from './../../../shared/model/user-profile.model';
import { AccountService } from './../../../core/auth/account.service';
import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Principal } from 'app/core';
import { ImportInvoicePackageService } from './import-invoice-package.service';
import { IInvoicePackageShipment } from '.';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE } from 'app/shared';

@Component({
    selector: 'jhi-import-invoice-package',
    templateUrl: './import-invoice-package.component.html'
})
export class ImportInvoicePackageComponent implements OnInit, OnDestroy {
    invoicePackageShipments: IInvoicePackageShipment[] = [];
    finalData: any;
    currentAccount: any;
    eventSubscriber: Subscription;
    selectedInvoiceStatus: any;
    selectedInvoiceNo: any;
    listShipmentStatus: any = [
        { id: 'new', text: 'Chưa xử lý' },
        { id: 'collecting', text: 'Nhân viên đang lấy hàng' },
        { id: 'delivering', text: 'Nhân viên đang giao hàng' },
        { id: 'fail_num1', text: 'Giao hàng không thành công lần: 1' },
        { id: 'fail_num2', text: 'Giao hàng không thành công lần: 2' },
        { id: 'fail_num3', text: 'Giao hàng không thành công lần: 3' },
        { id: 'finish', text: 'Hoàn thành' }
    ];
    listInvoiceStatus: any = [
        { id: 'collected', text: 'Nhân viên đã lấy hàng' },
        { id: 'transporting', text: 'Đang vận chuyển' },
        { id: 'delivering', text: 'Đang giao hàng' }
    ];
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    isSaving: boolean;
    officeId: any;
    common: CommonString;

    constructor(
        private importInvoicePackageService: ImportInvoicePackageService,
        private accountService: AccountService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.common = new CommonString();
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
        });
    }

    loadAll() {
        const param = {
            id: this.officeId,
            invNo: this.selectedInvoiceNo ? this.selectedInvoiceNo : '',
            status: this.selectedInvoiceStatus ? this.selectedInvoiceStatus : '',
            page: this.page - 1,
            size: this.itemsPerPage
        };
        this.importInvoicePackageService.getImportPackageByOfficeId(param).subscribe(
            (res: HttpResponse<IInvoicePackageShipment[]>) => {
                this.invoicePackageShipments = res.body;
                this.finalData = JSON.parse(JSON.stringify(this.invoicePackageShipments));
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    importAll() {
        this.isSaving = true;
        const finalParams = this.finalData;
        this.subscribeToSaveResponse(this.importInvoicePackageService.updateImportAllInvoice(finalParams));
    }

    private subscribeToSaveResponse(result: any) {
        result.subscribe((res: any) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.loadAll();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/import-invoice-package'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/import-invoice-package',
            {
                page: this.page
            }
        ]);
        this.loadAll();
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        return result;
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
            this.accountService.findByUserID({ id: this.currentAccount.id }).subscribe(res => {
                this.officeId = res.body.officeId;
                this.loadAll();
            });
        });
        this.registerChangeInImportInvoicePackages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInvoicePackageShipment) {
        return item.invoiceHeader.id;
    }

    registerChangeInImportInvoicePackages() {
        this.eventSubscriber = this.eventManager.subscribe('importInvoicePackageListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

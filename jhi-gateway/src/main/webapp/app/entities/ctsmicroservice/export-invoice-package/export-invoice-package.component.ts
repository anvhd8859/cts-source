import { AccountService } from './../../../core/auth/account.service';
import { IInvoicePackageShipment } from './../import-invoice-package/import-invoice-package.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ITEMS_PER_PAGE } from './../../../shared/constants/pagination.constants';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IExportInvoicePackage } from 'app/shared/model/ctsmicroservice/export-invoice-package.model';
import { Principal } from 'app/core';
import { ExportInvoicePackageService } from './export-invoice-package.service';

@Component({
    selector: 'jhi-export-invoice-package',
    templateUrl: './export-invoice-package.component.html'
})
export class ExportInvoicePackageComponent implements OnInit, OnDestroy {
    invoicePackageShipments: IInvoicePackageShipment[];
    finalData: any;
    currentAccount: any;
    eventSubscriber: Subscription;
    selectedInvoiceNo: any;
    selectedInvoiceStatus: any;
    listInvoiceStatus: any = [
        { id: 'first_import', text: 'Nhập kho chi nhánh đầu' },
        { id: 'last_import', text: 'Nhập kho chi nhánh cuối' }
    ];
    listShipmentStatus: any = [
        { id: 'new', text: 'Chưa xử lý' },
        { id: 'collecting', text: 'Nhân viên đang lấy hàng' },
        { id: 'delivering', text: 'Nhân viên đang giao hàng' },
        { id: 'fail_num1', text: 'Giao hàng không thành công lần: 1' },
        { id: 'fail_num2', text: 'Giao hàng không thành công lần: 2' },
        { id: 'fail_num3', text: 'Giao hàng không thành công lần: 3' },
        { id: 'finish', text: 'Hoàn thành' }
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

    constructor(
        private exportInvoicePackageService: ExportInvoicePackageService,
        private accountService: AccountService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
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
        this.exportInvoicePackageService.getExportPackageByOfficeId(param).subscribe(
            (res: HttpResponse<IInvoicePackageShipment[]>) => {
                this.invoicePackageShipments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    exportAll() {
        this.isSaving = true;
        const finalParams = this.finalData;
        this.subscribeToSaveResponse(this.exportInvoicePackageService.updateExportAllPackage(finalParams));
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
        this.router.navigate(['/export-invoice-package'], {
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
            '/export-invoice-package',
            {
                page: this.page
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
            this.accountService.findByUserID({ id: this.currentAccount.id }).subscribe(res => {
                this.officeId = res.body.officeId;
                this.loadAll();
            });
        });
        this.registerChangeInExportInvoicePackages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IExportInvoicePackage) {
        return item.id;
    }

    registerChangeInExportInvoicePackages() {
        this.eventSubscriber = this.eventManager.subscribe('exportInvoicePackageListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

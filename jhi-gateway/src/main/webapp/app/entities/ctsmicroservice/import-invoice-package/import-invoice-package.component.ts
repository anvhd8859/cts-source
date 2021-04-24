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
    invoicePackageShipments: IInvoicePackageShipment[];
    currentAccount: any;
    eventSubscriber: Subscription;
    selectedInvoiceStatus: any;
    selectedInvoiceNo: any;
    listShipmentType: any = [{ id: 'transporting', text: 'Đang vận chuyển' }, { id: 'delivering', text: 'Đang giao hàng' }];
    listShipmentStatus: any = [
        { id: 'new', text: 'Chưa xử lý' },
        { id: 'collecting', text: 'Nhân viên đang lấy hàng' },
        { id: 'delivering', text: 'Nhân viên đang giao hàng' },
        { id: 'fail_num1', text: 'Giao hàng không thành công lần: 1' },
        { id: 'fail_num2', text: 'Giao hàng không thành công lần: 2' },
        { id: 'fail_num3', text: 'Giao hàng không thành công lần: 3' },
        { id: 'finish', text: 'Hoàn thành' }
    ];
    listInvoiceStatus: any = [{ id: 'transporting', text: 'Đang vận chuyển' }, { id: 'delivering', text: 'Đang giao hàng' }];
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private importInvoicePackageService: ImportInvoicePackageService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = 'due_date';
        });
    }

    loadAll() {
        const param = {
            id: this.currentAccount.getOfficeId(),
            invNo: this.selectedInvoiceNo ? this.selectedInvoiceNo : '',
            status: this.selectedInvoiceStatus ? this.selectedInvoiceStatus : '',
            page: this.page - 1,
            size: this.itemsPerPage
        };
        this.importInvoicePackageService.getImportPackage(param).subscribe(
            (res: HttpResponse<IInvoicePackageShipment[]>) => {
                this.invoicePackageShipments = res.body;
                for (let i in this.invoicePackageShipments) {
                    if (this.invoicePackageShipments[i].invoiceHeader.status === this.listShipmentType[0].id) {
                        this.invoicePackageShipments[i].invoiceHeader.status = this.listShipmentType[0].text;
                    } else {
                        this.invoicePackageShipments[i].invoiceHeader.status = this.listShipmentType[1].text;
                    }
                    if (this.invoicePackageShipments[i].personalShipment.shipmentType === 'delivery') {
                        const status = this.invoicePackageShipments[i].personalShipment.status;
                        let statusText;
                        for (let st of this.listShipmentStatus) {
                            if (st.id === status) {
                                statusText = st.text;
                                break;
                            }
                        }
                        this.invoicePackageShipments[i].personalShipment.status = statusText;
                    }
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    importAll() {}

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
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/import-invoice-package',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        return result;
    }

    ngOnInit() {
        this.loadAll();
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

import { WarehouseService } from 'app/entities/ctsmicroservice/warehouse/warehouse.service';
import { Warehouse } from 'app/shared/model/ctsmicroservice/warehouse.model';
import { IWarehouse } from './../../../shared/model/ctsmicroservice/warehouse.model';
import { CommonString } from './../../../shared/util/request-util';
import { AccountService } from './../../../core/auth/account.service';
import { IInvoicePackageShipment } from './../import-invoice-package/import-invoice-package.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ITEMS_PER_PAGE } from './../../../shared/constants/pagination.constants';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription, forkJoin } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IExportInvoicePackage } from 'app/shared/model/ctsmicroservice/export-invoice-package.model';
import { Principal } from 'app/core';
import { ExportInvoicePackageService } from './export-invoice-package.service';
import { Moment } from 'moment';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportInvoiceModalWarningComponent } from './export-invoice-modal-warning.component';
import { IWarehouseTransferRequest } from 'app/shared/model/ctsmicroservice/warehouse-transfer-request.model';

@Component({
    selector: 'jhi-export-invoice-package',
    templateUrl: './export-invoice-package.component.html'
})
export class ExportInvoicePackageComponent implements OnInit, OnDestroy {
    invoicePackageShipments: IInvoicePackageShipment[] = [];
    finalData: TransferInvoicePackageDTO;
    currentAccount: any;
    eventSubscriber: Subscription;
    selectedInvoiceNo: any;
    listInvoiceStatus: any = [{ id: 'first_import', text: 'Nhập kho chi nhánh đầu' }];
    selectedInvoiceStatus = this.listInvoiceStatus[0].id;
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
    common: CommonString;
    fromTime: Moment;
    toTime: Moment;
    all: boolean;
    selectedCheckBox: boolean[] = [];
    listWarehouse: IWarehouse[];
    selectedWarehouse: IWarehouse;
    myWarehouse: IWarehouse;

    constructor(
        private exportInvoicePackageService: ExportInvoicePackageService,
        private warehouseService: WarehouseService,
        private accountService: AccountService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private modal: NgbModal
    ) {
        this.common = new CommonString();
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
            forkJoin(
                this.accountService.findByUserID({ id: this.currentAccount.id }),
                this.warehouseService.findWarehouseExceptEmployee(account.id)
            ).subscribe(res => {
                this.officeId = res[0].body.officeId;
                this.listWarehouse = res[1].body;
                this.loadAll();
            });
        });
        this.registerChangeInExportInvoicePackages();
    }

    loadAll() {
        if (!this.selectedWarehouse) {
            this.selectedWarehouse = this.listWarehouse[0];
        }
        const param = {
            id: this.officeId,
            wid: this.selectedWarehouse.id,
            invNo: this.selectedInvoiceNo ? this.selectedInvoiceNo : '',
            status: this.selectedInvoiceStatus,
            fromDate: this.fromTime ? this.fromTime.year() + '-' + (this.fromTime.month() + 1) + '-' + this.fromTime.date() : '',
            toDate: this.toTime ? this.toTime.year() + '-' + (this.toTime.month() + 1) + '-' + this.toTime.date() : '',
            page: this.page - 1,
            size: this.itemsPerPage
        };
        this.exportInvoicePackageService.getExportPackageByOfficeId(param).subscribe(
            (res: HttpResponse<IInvoicePackageShipment[]>) => {
                this.invoicePackageShipments = res.body;
                for (const obj of this.invoicePackageShipments) {
                    this.selectedCheckBox.push(false);
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    checked(i: number, e) {
        if (e.target.checked) {
            this.selectedCheckBox[i] = true;
            let myAll = true;
            for (let bool of this.selectedCheckBox) {
                if (!bool) {
                    myAll = false;
                    break;
                }
            }
            this.all = myAll;
        } else {
            this.selectedCheckBox[i] = false;
            this.all = false;
        }
    }

    checkAll(e) {
        if (e.target.checked) {
            for (const i in this.selectedCheckBox) {
                if (this.selectedCheckBox.hasOwnProperty(i)) {
                    this.selectedCheckBox[i] = true;
                }
            }
        } else {
            for (const i in this.selectedCheckBox) {
                if (this.selectedCheckBox.hasOwnProperty(i)) {
                    this.selectedCheckBox[i] = false;
                }
            }
        }
    }

    clearDatepicker(id: number) {
        switch (id) {
            case 2:
                this.fromTime = null;
                break;
            case 3:
                this.toTime = null;
                break;
        }
    }

    exportAll() {
        let empty = false;
        this.finalData = new TransferInvoicePackageDTO();
        this.finalData.invoicePackageList = new Array();
        for (const i in this.selectedCheckBox) {
            if (this.selectedCheckBox[i]) {
                this.finalData.invoicePackageList.push(this.finalData[i]);
            }
        }
        if (this.finalData.invoicePackageList.length === 0) {
            empty = true;
        }
        const modalRef = this.modal.open(ExportInvoiceModalWarningComponent as Component, {
            size: 'lg',
            backdrop: 'static'
        });
        modalRef.componentInstance.empty = empty;
        modalRef.result.then(
            result => {
                this.isSaving = true;
                this.createTransferData();
                this.subscribeToSaveResponse(this.exportInvoicePackageService.createTransferRequest(this.finalData));
            },
            reason => {}
        );
    }

    createTransferData() {
        let transfer: IWarehouseTransferRequest;
        transfer = new Object();
        transfer.fromKeeperId = this.currentAccount.id;
        transfer.toWarehouseId = this.selectedWarehouse.id;
        transfer.toKeeperId = this.selectedWarehouse.keeperId;
        transfer.status = '';
        this.finalData.transferRequest = transfer;
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
        this.jhiAlertService.error('Đã xảy ra lỗi khi thực hiện', null, null);
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
      <p *ngIf="empty">
        <strong>Bạn chưa chọn đơn hàng nào</strong>
      </p>
      <p *ngIf="!empty">
        <strong>Bạn xác nhận muốn xuất kho các đơn hàng này?</strong>
      </p>
    </div>
    <div class="modal-footer">
      <button *ngIf="!empty"
        style="width: 20%;"
        type="button"
        class="btn btn-info"
        (click)="modal.dismiss('Cancel click')"
      >
        Hủy
      </button>
      <button *ngIf="!empty"
        style="margin-left: 51%; width: 20%; margin-right:5%"
        type="button"
        class="btn btn-warning"
        (click)="modal.close('Ok click')"
      >
        Xác nhận
      </button>
    </div>
  `
})
export class ExportModalWarningComponent {
    empty = true;
    constructor(public modal: NgbActiveModal) {}
}

export class TransferInvoicePackageDTO {
    public transferRequest: IWarehouseTransferRequest;
    public invoicePackageList: IInvoicePackageShipment[];
}

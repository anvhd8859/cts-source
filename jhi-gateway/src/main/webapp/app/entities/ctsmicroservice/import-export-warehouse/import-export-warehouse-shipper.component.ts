import { UserProfileService } from 'app/entities/user-profile/user-profile.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IImportExportWarehouse } from 'app/shared/model/ctsmicroservice/import-export-warehouse.model';
import { AccountService, IUser, Principal } from 'app/core';

import { ITEMS_PER_PAGE, CommonString } from 'app/shared';
import { ImportExportWarehouseService } from './import-export-warehouse.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { InvoiceHeaderService } from '../invoice-header';
import { IUserProfile } from 'app/shared/model/user-profile.model';

@Component({
    selector: 'jhi-import-export-shipper-warehouse',
    templateUrl: './import-export-warehouse-shipper.component.html'
})
export class ImportExportWarehouseShipperComponent implements OnInit, OnDestroy {
    currentAccount: any;
    importExportWarehouses: IImportExportWarehouse[];
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
    selectedShipper: any;
    officeId: any;
    typeList: any = [{ id: 'export', text: 'Yêu cầu xuất kho' }, { id: 'import', text: 'Yêu cầu nhập kho' }];
    selectedType: any;
    confirmList: any = [{ id: '0', text: 'Chưa xác nhận' }, { id: '1', text: 'Đã xác nhận' }];
    selectedConfirm: any;
    selectedUserProfile: any;
    lstUser: IUser[] = [];
    currentProfile: IUserProfile;
    profileList: IUserProfile[];
    common: CommonString;

    constructor(
        private importExportWarehouseService: ImportExportWarehouseService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private ngxUiLoaderService: NgxUiLoaderService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.common = new CommonString();
    }

    loadAll() {
        this.ngxUiLoaderService.start();
        this.principal.identity().then(account => {
            this.currentAccount = account;
            this.importExportWarehouseService
                .getImportExportWarehouseByShipper({
                    eid: this.currentAccount.id,
                    type: this.selectedType ? this.selectedType : '',
                    cf: this.selectedConfirm ? this.selectedConfirm : '',
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<IImportExportWarehouse[]>) => {
                        this.paginateImportExportWarehouses(res.body, res.headers);
                        this.ngxUiLoaderService.stop();
                    },
                    (res: HttpErrorResponse) => {
                        this.onError(res.message);
                        this.ngxUiLoaderService.stop();
                    }
                );
        });
    }

    getName(id: number): string {
        for (const obj of this.lstUser) {
            if (obj.id === id) {
                return obj.lastName + ' ' + obj.firstName;
            }
        }
        return '';
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/import-export-warehouse-employee'], {
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
            '/import-export-warehouse-employee',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.registerChangeInImportExportWarehouses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IImportExportWarehouse) {
        return item.id;
    }

    registerChangeInImportExportWarehouses() {
        this.eventSubscriber = this.eventManager.subscribe('importExportWarehouseListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateImportExportWarehouses(data: IImportExportWarehouse[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.importExportWarehouses = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error('Đã xảy ra lỗi khi thực hiện', null, null);
    }
}

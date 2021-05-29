import { CommonString } from './../../../shared/util/request-util';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiParseLinks } from 'ng-jhipster';

import { IWorkingArea, WorkingArea } from 'app/shared/model/ctsmicroservice/working-area.model';
import { AccountService, IUser, Principal } from 'app/core';
import { WorkingAreaService } from './working-area.service';
import { InvoiceHeaderService } from '../invoice-header';
import { IStreet } from 'app/shared/model/ctsmicroservice/street.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE } from 'app/shared';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IProvince } from 'app/shared/model/ctsmicroservice/province.model';
import { IDistrict } from 'app/shared/model/ctsmicroservice/district.model';
import { ISubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';
import { element } from '@angular/core/src/render3/instructions';
import { IUserProfile } from 'app/shared/model/user-profile.model';

@Component({
    selector: 'jhi-working-area',
    templateUrl: './working-area.component.html'
})
export class WorkingAreaComponent implements OnInit, OnDestroy {
    workingArea: IWorkingArea;
    areas: CustomWorkingArea[];
    currentAccount: any;
    eventSubscriber: Subscription;
    lstStreetGetData: IStreet[] = [];
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    lstProvince: IProvince[] = [];
    lstDistrict: IDistrict[] = [];
    lstSubDistrict: ISubDistrict[] = [];
    lstStreet: IStreet[] = [];
    selectedProvince: any;
    selectedDistrict: any;
    selectedSubDistrict: any;
    selectedStreet: any;
    lstUser: IUser[] = [];
    selectedUser: IUser;
    common: CommonString;
    selectedUserProfile: IUserProfile;
    currentProfile: IUserProfile;
    isSaving: boolean;

    constructor(
        private workingAreaService: WorkingAreaService,
        private invoiceHeaderService: InvoiceHeaderService,
        private parseLinks: JhiParseLinks,
        private accountService: AccountService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private ngxUiLoaderService: NgxUiLoaderService,
        private alertService: JhiAlertService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    save() {
        this.workingArea = new WorkingArea();
        this.workingArea.employeeId = this.selectedUser.id;
        this.workingArea.streetId = this.selectedStreet;
        const msg = this.validateInput();
        if (msg === '') {
            this.isSaving = true;
            this.subscribeToSaveResponse(this.workingAreaService.create(this.workingArea));
        } else {
            window.scroll(0, 0);
            this.alertService.error(msg);
        }
    }

    validateInput(): string {
        let msg = '';
        if (!this.selectedUser) {
            msg += 'Hãy lựa chọn nhân viên! <br>';
        }
        if (!this.selectedStreet) {
            msg += 'Đường không được để trống! <br>';
        }
        if (!this.selectedSubDistrict) {
            msg += 'Phường/Xã không được để trống! <br>';
        }
        if (!this.selectedDistrict) {
            msg += 'Quận/Huyện không được để trống! <br>';
        }
        if (!this.selectedProvince) {
            msg += 'Tỉnh/Thành phố không được để trống! <br>';
        }
        // if (msg === '') {
        //     for (const wa of this.areas) {
        //         if (wa.workingArea.streetId === this.workingArea.streetId && this.workingArea.employeeId === wa.workingArea.employeeId) {
        //             msg += 'Khu vực làm việc này đã tồn tại! <br>';
        //             break;
        //         }
        //     }
        // }
        return msg;
    }

    loadAll() {
        this.ngxUiLoaderService.start();
        const param = {
            sid: this.selectedStreet == null ? '' : this.selectedStreet,
            eid: this.selectedUser == null ? '' : this.selectedUser.id,
            page: this.page - 1,
            size: this.itemsPerPage
        };
        this.workingAreaService.getWorkingAreaByFilter(param).subscribe(
            (res: HttpResponse<any>) => {
                this.paginateWorkingArea(res.body, res.headers);
                this.ngxUiLoaderService.stop();
            },
            (res: HttpErrorResponse) => {
                // this.onError(res.message);
                this.ngxUiLoaderService.stop();
            }
        );
    }

    findEmployee(id: number): string {
        const i = this.lstUser.find(e => e.id === id);
        if (i.lastName == null) {
            return '';
        }
        return i.lastName + ' ' + i.firstName;
    }

    findEmail(id: number): string {
        const i = this.lstUser.find(e => e.id === id);
        if (i.email == null) {
            return '';
        }
        return i.email;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    changeUser() {
        this.accountService.findByUserID({ id: this.selectedUser.id }).subscribe(res => {
            this.selectedUserProfile = res.body;
            this.loadAll();
        });
    }

    changeCity() {
        this.lstDistrict = null;
        this.selectedDistrict = null;
        this.lstSubDistrict = null;
        this.selectedSubDistrict = null;
        this.lstStreet = null;
        this.selectedStreet = null;
        const param = { provinceId: this.selectedProvince };
        this.accountService.getLstDistrictByCity(param).subscribe(res => {
            this.lstDistrict = res.body;
        });
    }

    changeDistrict() {
        this.lstSubDistrict = null;
        this.selectedSubDistrict = null;
        this.lstStreet = null;
        this.selectedStreet = null;
        const param = { id: this.selectedDistrict };
        this.accountService.getLstWardByDistrict(param).subscribe(res => {
            this.lstSubDistrict = res.body;
        });
    }

    changeSubDistrict() {
        this.lstStreet = null;
        this.selectedStreet = null;
        const param = { id: this.selectedSubDistrict };
        this.accountService.getLstStreetByWard(param).subscribe(res => {
            this.lstStreet = res.body;
        });
    }

    onChange() {
        this.workingArea.streetId = this.selectedStreet;
    }

    transition() {
        this.router.navigate(['/working-area'], {
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
            '/working-area',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        forkJoin(this.accountService.getLstCity(), this.invoiceHeaderService.getListUserByRole({ role: 'ROLE_SHIPPER' })).subscribe(res => {
            this.lstProvince = res[0].body;
            this.lstUser = res[1].body;
            this.loadAll();
        });
        this.loadAll();
        this.registerChangeInWorkingAreas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWorkingArea) {
        return item.id;
    }

    registerChangeInWorkingAreas() {
        this.eventSubscriber = this.eventManager.subscribe('workingAreaListModification', response => this.loadAll());
    }

    private paginateWorkingArea(data: CustomWorkingArea[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.areas = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IWorkingArea>>) {
        result.subscribe((res: HttpResponse<IWorkingArea>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.eventManager.broadcast({
            name: 'workingAreaListModification',
            content: 'Reload workingArea'
        });
        this.workingArea = null;
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

export interface CustomWorkingArea {
    workingArea?: IWorkingArea;
    streetName?: string;
}

import { CommonString } from './../../../shared/util/request-util';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { forkJoin, Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiParseLinks } from 'ng-jhipster';

import { IWorkingArea } from 'app/shared/model/ctsmicroservice/working-area.model';
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

@Component({
    selector: 'jhi-working-area',
    templateUrl: './working-area.component.html'
})
export class WorkingAreaComponent implements OnInit, OnDestroy {
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
        private ngxUiLoaderService: NgxUiLoaderService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
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
                this.onError(res.message);
                this.ngxUiLoaderService.stop();
            }
        );
    }

    findEmployee(id: number): string {
        const i = this.lstUser.find(element => element.id === id);
        if (i.lastName == null) {
            return '';
        }
        return i.lastName + ' ' + i.firstName;
    }

    findEmail(id: number): string {
        const i = this.lstUser.find(element => element.id === id);
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
        forkJoin(this.accountService.getLstCity(), this.invoiceHeaderService.getLstUser()).subscribe(res => {
            this.lstProvince = res[0].body;
            this.lstUser = res[1].body.filter(e => e.authorities.filter(i => i === 'ROLE_SHIPPER'));
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
}

export interface CustomWorkingArea {
    workingArea?: IWorkingArea;
    streetName?: string;
}

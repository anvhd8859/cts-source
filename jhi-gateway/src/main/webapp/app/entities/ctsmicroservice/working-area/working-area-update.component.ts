import { IStreet, Street } from './../../../shared/model/ctsmicroservice/street.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IWorkingArea } from 'app/shared/model/ctsmicroservice/working-area.model';
import { WorkingAreaService } from './working-area.service';
import { AccountService, IUser, Principal } from 'app/core';
import { District, IDistrict } from 'app/shared/model/ctsmicroservice/district.model';
import { IProvince, Province } from 'app/shared/model/ctsmicroservice/province.model';
import { ISubDistrict, SubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { InvoiceHeaderService } from '../invoice-header/invoice-header.service';
import { Moment } from 'moment';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-working-area-update',
    templateUrl: './working-area-update.component.html'
})
export class WorkingAreaUpdateComponent implements OnInit {
    workingArea: IWorkingArea;
    isSaving: boolean;
    createDate: string;
    updateDate: string;

    lstUser: IUser[] = [];
    lstProvinceFrom: IProvince[] = [];
    lstDistrictFrom: IDistrict[] = [];
    lstSubDistrictFrom: ISubDistrict[] = [];
    lstStreetFrom: IStreet[] = [];
    lstProvinceTo: IProvince[] = [];
    lstDistrictTo: IDistrict[] = [];
    lstSubDistrictTo: ISubDistrict[] = [];
    lstStreetTo: IStreet[] = [];

    selectedProvinceFrom: any;
    selectedDistrictFrom: any;
    selectedSubDistrictFrom: any;
    selectedStreetFrom: any;

    selectedUser: IUser;
    selectedUserProfile: IUserProfile;
    currentProfile: IUserProfile;
    dataStreet: CustomStreet;

    constructor(
        private workingAreaService: WorkingAreaService,
        private invoiceHeaderService: InvoiceHeaderService,
        private accountService: AccountService,
        private alertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ workingArea }) => {
            this.workingArea = workingArea;
            this.createDate = this.workingArea.createDate != null ? this.workingArea.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.workingArea.updateDate != null ? this.workingArea.updateDate.format(DATE_TIME_FORMAT) : null;
        });
        forkJoin(this.invoiceHeaderService.getLstUser(), this.accountService.getLstCity(), this.principal.identity()).subscribe(res => {
            this.lstUser = res[0].body.filter(e => e.authorities.filter(i => i === 'ROLE_SHIPPER'));
            this.lstProvinceFrom = res[1].body;
            this.lstProvinceTo = res[1].body;
            if (this.workingArea.employeeId) {
                this.selectedUser = this.lstUser.find(e => e.id === this.workingArea.employeeId);
                this.changeUser();
                this.accountService.findByUserID({ id: this.workingArea.employeeId }).subscribe(profile => {
                    this.selectedUserProfile = profile.body;
                });
                const param = { id: this.workingArea.streetId };
                this.accountService.getStreetAndParentById(param).subscribe(response => {
                    this.dataStreet = response.body;
                    this.selectedStreetFrom = new Street(this.dataStreet.id, this.dataStreet.streetName, null, null, null);
                    this.selectedSubDistrictFrom = this.dataStreet.subDistrictId;
                    this.selectedDistrictFrom = this.dataStreet.subDistrictId.districtId;
                    this.selectedProvinceFrom = this.dataStreet.subDistrictId.districtId.provinceId;
                });
            }
        });
    }

    changeUser() {
        this.accountService.findByUserID({ id: this.selectedUser.id }).subscribe(res => {
            this.selectedUserProfile = res.body;
        });
    }

    changeCity(opt: any) {
        if (opt === 'from') {
            this.lstDistrictFrom = null;
            this.selectedDistrictFrom = null;
            this.lstSubDistrictFrom = null;
            this.selectedSubDistrictFrom = null;
            this.lstStreetFrom = null;
            this.selectedStreetFrom = null;
            const param = { provinceId: this.selectedProvinceFrom.id };
            this.accountService.getLstDistrictByCity(param).subscribe(res => {
                this.lstDistrictFrom = res.body;
            });
        }
    }

    changeDistrict(opt: any) {
        if (opt === 'from') {
            this.lstSubDistrictFrom = null;
            this.selectedSubDistrictFrom = null;
            this.lstStreetFrom = null;
            this.selectedStreetFrom = null;
            const param = { id: this.selectedDistrictFrom.id };
            this.accountService.getLstWardByDistrict(param).subscribe(res => {
                this.lstSubDistrictFrom = res.body;
            });
        }
    }

    changeSubDistrict(opt: any) {
        if (opt === 'from') {
            this.lstStreetFrom = null;
            this.selectedStreetFrom = null;
            const param = { id: this.selectedSubDistrictFrom.id };
            this.accountService.getLstStreetByWard(param).subscribe(res => {
                this.lstStreetFrom = res.body;
            });
        }
    }

    onChange() {
        this.workingArea.streetId = this.selectedStreetFrom.id;
    }

    previousState() {
        window.history.back();
    }

    validateInput(): string {
        let msg = '';
        if (!this.selectedStreetFrom) {
            msg += 'Đường không được để trống! <br>';
        }
        if (!this.selectedSubDistrictFrom) {
            msg += 'Phường/Xã không được để trống! <br>';
        }
        if (!this.selectedDistrictFrom) {
            msg += 'Quận/Huyện không được để trống! <br>';
        }
        if (!this.selectedProvinceFrom) {
            msg += 'Tỉnh/Thành phố không được để trống! <br>';
        }
        return msg;
    }

    save() {
        const msg = this.validateInput();
        if (msg === '') {
            this.isSaving = true;
            this.workingArea.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
            this.workingArea.updateDate = moment(this.updateDate, DATE_TIME_FORMAT);
            this.workingArea.employeeId = this.selectedUser.id;
            this.workingArea.streetId = this.selectedStreetFrom.id;
            if (this.workingArea.id !== undefined) {
                this.subscribeToSaveResponse(this.workingAreaService.update(this.workingArea));
            } else {
                this.subscribeToSaveResponse(this.workingAreaService.create(this.workingArea));
            }
        } else {
            window.scroll(0, 0);
            this.alertService.error(msg);
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IWorkingArea>>) {
        result.subscribe((res: HttpResponse<IWorkingArea>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

export interface CustomStreet {
    id?: number;
    streetName?: string;
    createDate?: Moment;
    updateDate?: Moment;
    subDistrictId?: CustomSubDistrict;
}

export interface CustomSubDistrict {
    id?: number;
    subDistrictName?: string;
    createDate?: Moment;
    updateDate?: Moment;
    districtId?: CustomDistrict;
}

export interface CustomDistrict {
    id?: number;
    districtName?: string;
    createDate?: Moment;
    updateDate?: Moment;
    provinceId?: CustomProvince;
}

export interface CustomProvince {
    id?: number;
    provinceName?: string;
    createDate?: Moment;
    updateDate?: Moment;
}

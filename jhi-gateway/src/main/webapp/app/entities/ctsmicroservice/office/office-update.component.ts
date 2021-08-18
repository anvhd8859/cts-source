import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IOffice } from 'app/shared/model/ctsmicroservice/office.model';
import { OfficeService } from './office.service';
import { IDistrict } from 'app/shared/model/ctsmicroservice/district.model';
import { IProvince } from 'app/shared/model/ctsmicroservice/province.model';
import { IStreet } from 'app/shared/model/ctsmicroservice/street.model';
import { ISubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';
import { AccountService } from 'app/core';

@Component({
    selector: 'jhi-office-update',
    templateUrl: './office-update.component.html'
})
export class OfficeUpdateComponent implements OnInit {
    office: IOffice;
    isSaving: boolean;
    createDate: string;
    updateDate: string;
    lstProvinceFrom: IProvince[] = [];
    lstDistrictFrom: IDistrict[] = [];
    lstSubDistrictFrom: ISubDistrict[] = [];
    lstStreetFrom: IStreet[] = [];
    selectedProvinceFrom: any;
    selectedDistrictFrom: any;
    selectedSubDistrictFrom: any;
    selectedStreetFrom: any;
    selectedAddressFrom: string;

    constructor(private officeService: OfficeService, private accountService: AccountService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ office }) => {
            this.office = office;
            this.createDate = this.office.createDate != null ? this.office.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.office.updateDate != null ? this.office.updateDate.format(DATE_TIME_FORMAT) : null;
            let arr = this.office.address.split(',');
            if (arr.length === 5) {
                this.office.address = arr[0].trim();
            } else {
                this.office.address = '';
            }
        });
        this.accountService.getLstCity().subscribe(res => {
            this.lstProvinceFrom = res.body;
        });
        if (this.office.id) {
            this.accountService.getStreetAndParentById({ id: this.office.streetId }).subscribe(res => {
                this.selectedStreetFrom = res.body;
                this.selectedSubDistrictFrom = this.selectedStreetFrom.subDistrictId;
                this.selectedDistrictFrom = this.selectedSubDistrictFrom.districtId;
                this.selectedProvinceFrom = this.selectedDistrictFrom.provinceId;
            });
        }
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.office.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.office.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        this.append();
        if (this.office.id !== undefined) {
            this.subscribeToSaveResponse(this.officeService.update(this.office));
        } else {
            this.subscribeToSaveResponse(this.officeService.create(this.office));
        }
    }

    append() {
        this.office.address =
            this.selectedAddressFrom.trim() +
            ', ' +
            this.selectedStreetFrom.streetName +
            ', ' +
            this.selectedSubDistrictFrom.subDistrictName +
            ', ' +
            this.selectedDistrictFrom.districtName +
            this.selectedProvinceFrom.provinceName;
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOffice>>) {
        result.subscribe((res: HttpResponse<IOffice>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

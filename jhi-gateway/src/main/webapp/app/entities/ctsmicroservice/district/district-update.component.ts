import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IDistrict } from 'app/shared/model/ctsmicroservice/district.model';
import { DistrictService } from './district.service';
import { IProvince } from 'app/shared/model/ctsmicroservice/province.model';
import { ProvinceService } from 'app/entities/ctsmicroservice/province';

@Component({
    selector: 'jhi-district-update',
    templateUrl: './district-update.component.html'
})
export class DistrictUpdateComponent implements OnInit {
    district: IDistrict;
    isSaving: boolean;
    provinces: IProvince[];
    createDate: string;
    updateDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private districtService: DistrictService,
        private provinceService: ProvinceService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ district }) => {
            this.district = district;
            this.createDate = this.district.createDate != null ? this.district.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.district.updateDate != null ? this.district.updateDate.format(DATE_TIME_FORMAT) : null;
        });
        this.provinceService.query({ page: 0, size: 99999 }).subscribe(
            (res: HttpResponse<IProvince[]>) => {
                this.provinces = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.district.createDate =
            this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : moment(new Date(), DATE_TIME_FORMAT);
        this.district.updateDate =
            this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : moment(new Date(), DATE_TIME_FORMAT);
        if (this.district.id !== undefined) {
            this.subscribeToSaveResponse(this.districtService.update(this.district));
        } else {
            this.subscribeToSaveResponse(this.districtService.create(this.district));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDistrict>>) {
        result.subscribe((res: HttpResponse<IDistrict>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error('Đã xảy ra lỗi khi thực hiện', null, null);
    }

    trackProvinceById(index: number, item: IProvince) {
        return item.id;
    }
}

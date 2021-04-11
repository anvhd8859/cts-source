import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProvince } from 'app/shared/model/ctsmicroservice/province.model';
import { ProvinceService } from './province.service';

@Component({
    selector: 'jhi-province-update',
    templateUrl: './province-update.component.html'
})
export class ProvinceUpdateComponent implements OnInit {
    province: IProvince;
    isSaving: boolean;
    createDate: string;
    updateDate: string;

    constructor(private provinceService: ProvinceService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ province }) => {
            this.province = province;
            this.createDate = this.province.createDate != null ? this.province.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.province.updateDate != null ? this.province.updateDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.province.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.province.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.province.id !== undefined) {
            this.subscribeToSaveResponse(this.provinceService.update(this.province));
        } else {
            this.subscribeToSaveResponse(this.provinceService.create(this.province));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProvince>>) {
        result.subscribe((res: HttpResponse<IProvince>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

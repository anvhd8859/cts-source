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

    constructor(private provinceService: ProvinceService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ province }) => {
            this.province = province;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.province.createDate == null) this.province.createDate = moment(new Date(), DATE_TIME_FORMAT);
        this.province.updateDate = moment(new Date(), DATE_TIME_FORMAT);
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

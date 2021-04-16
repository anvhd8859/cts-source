import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ISubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';
import { SubDistrictService } from './sub-district.service';
import { IDistrict } from 'app/shared/model/ctsmicroservice/district.model';
import { DistrictService } from 'app/entities/ctsmicroservice/district';

@Component({
    selector: 'jhi-sub-district-update',
    templateUrl: './sub-district-update.component.html'
})
export class SubDistrictUpdateComponent implements OnInit {
    subDistrict: ISubDistrict;
    isSaving: boolean;

    districts: IDistrict[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private subDistrictService: SubDistrictService,
        private districtService: DistrictService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ subDistrict }) => {
            this.subDistrict = subDistrict;
        });
        this.districtService.query().subscribe(
            (res: HttpResponse<IDistrict[]>) => {
                this.districts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.subDistrict.createDate == null) this.subDistrict.createDate = moment(new Date(), DATE_TIME_FORMAT);
        this.subDistrict.updateDate = moment(new Date(), DATE_TIME_FORMAT);
        if (this.subDistrict.id !== undefined) {
            this.subscribeToSaveResponse(this.subDistrictService.update(this.subDistrict));
        } else {
            this.subscribeToSaveResponse(this.subDistrictService.create(this.subDistrict));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISubDistrict>>) {
        result.subscribe((res: HttpResponse<ISubDistrict>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDistrictById(index: number, item: IDistrict) {
        return item.id;
    }
}

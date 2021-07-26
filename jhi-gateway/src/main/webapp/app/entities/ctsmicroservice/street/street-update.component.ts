import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IStreet } from 'app/shared/model/ctsmicroservice/street.model';
import { StreetService } from './street.service';
import { ISubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';
import { SubDistrictService } from 'app/entities/ctsmicroservice/sub-district';

@Component({
    selector: 'jhi-street-update',
    templateUrl: './street-update.component.html'
})
export class StreetUpdateComponent implements OnInit {
    street: IStreet;
    isSaving: boolean;

    subdistricts: ISubDistrict[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private streetService: StreetService,
        private subDistrictService: SubDistrictService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ street }) => {
            this.street = street;
        });
        this.subDistrictService.query({ page: 0, size: 99999 }).subscribe(
            (res: HttpResponse<ISubDistrict[]>) => {
                this.subdistricts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.street.createDate == null) {
            this.street.createDate = moment(new Date(), DATE_TIME_FORMAT);
        }
        this.street.updateDate = moment(new Date(), DATE_TIME_FORMAT);
        if (this.street.id !== undefined) {
            this.subscribeToSaveResponse(this.streetService.update(this.street));
        } else {
            this.subscribeToSaveResponse(this.streetService.create(this.street));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStreet>>) {
        result.subscribe((res: HttpResponse<IStreet>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSubDistrictById(index: number, item: ISubDistrict) {
        return item.id;
    }
}

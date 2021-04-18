import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPersonalShipment } from 'app/shared/model/ctsmicroservice/personal-shipment.model';
import { PersonalShipmentService } from './personal-shipment.service';

@Component({
    selector: 'jhi-personal-shipment-update',
    templateUrl: './personal-shipment-update.component.html'
})
export class PersonalShipmentUpdateComponent implements OnInit {
    personalShipment: IPersonalShipment;
    isSaving: boolean;
    shipTime: string;
    finishTime: string;
    createDate: string;
    updateDate: string;

    constructor(private personalShipmentService: PersonalShipmentService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ personalShipment }) => {
            this.personalShipment = personalShipment;
            this.shipTime = this.personalShipment.shipTime != null ? this.personalShipment.shipTime.format(DATE_TIME_FORMAT) : null;
            this.finishTime = this.personalShipment.finishTime != null ? this.personalShipment.finishTime.format(DATE_TIME_FORMAT) : null;
            this.createDate = this.personalShipment.createDate != null ? this.personalShipment.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.personalShipment.updateDate != null ? this.personalShipment.updateDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.personalShipment.shipTime = this.shipTime != null ? moment(this.shipTime, DATE_TIME_FORMAT) : null;
        this.personalShipment.finishTime = this.finishTime != null ? moment(this.finishTime, DATE_TIME_FORMAT) : null;
        this.personalShipment.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.personalShipment.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
        if (this.personalShipment.id !== undefined) {
            this.subscribeToSaveResponse(this.personalShipmentService.update(this.personalShipment));
        } else {
            this.subscribeToSaveResponse(this.personalShipmentService.create(this.personalShipment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPersonalShipment>>) {
        result.subscribe((res: HttpResponse<IPersonalShipment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

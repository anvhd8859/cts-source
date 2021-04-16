import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersonalShipment } from 'app/shared/model/ctsmicroservice/personal-shipment.model';

@Component({
    selector: 'jhi-personal-shipment-detail',
    templateUrl: './personal-shipment-detail.component.html'
})
export class PersonalShipmentDetailComponent implements OnInit {
    personalShipment: IPersonalShipment;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ personalShipment }) => {
            this.personalShipment = personalShipment;
        });
    }

    previousState() {
        window.history.back();
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProvince } from 'app/shared/model/ctsmicroservice/province.model';

@Component({
    selector: 'jhi-province-detail',
    templateUrl: './province-detail.component.html'
})
export class ProvinceDetailComponent implements OnInit {
    province: IProvince;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ province }) => {
            this.province = province;
        });
    }

    previousState() {
        window.history.back();
    }
}

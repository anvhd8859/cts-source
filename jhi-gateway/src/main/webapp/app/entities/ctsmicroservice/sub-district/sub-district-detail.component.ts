import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';

@Component({
    selector: 'jhi-sub-district-detail',
    templateUrl: './sub-district-detail.component.html'
})
export class SubDistrictDetailComponent implements OnInit {
    subDistrict: ISubDistrict;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subDistrict }) => {
            this.subDistrict = subDistrict;
        });
    }

    previousState() {
        window.history.back();
    }
}

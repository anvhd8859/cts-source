import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStreet } from 'app/shared/model/ctsmicroservice/street.model';

@Component({
    selector: 'jhi-street-detail',
    templateUrl: './street-detail.component.html'
})
export class StreetDetailComponent implements OnInit {
    street: IStreet;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ street }) => {
            this.street = street;
        });
    }

    previousState() {
        window.history.back();
    }
}

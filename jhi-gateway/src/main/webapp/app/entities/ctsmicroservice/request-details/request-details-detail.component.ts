import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRequestDetails } from 'app/shared/model/ctsmicroservice/request-details.model';

@Component({
    selector: 'jhi-request-details-detail',
    templateUrl: './request-details-detail.component.html'
})
export class RequestDetailsDetailComponent implements OnInit {
    requestDetails: IRequestDetails;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ requestDetails }) => {
            this.requestDetails = requestDetails;
        });
    }

    previousState() {
        window.history.back();
    }
}

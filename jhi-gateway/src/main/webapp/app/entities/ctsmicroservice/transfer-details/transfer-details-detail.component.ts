import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransferDetails } from 'app/shared/model/ctsmicroservice/transfer-details.model';

@Component({
    selector: 'jhi-transfer-details-detail',
    templateUrl: './transfer-details-detail.component.html'
})
export class TransferDetailsDetailComponent implements OnInit {
    transferDetails: ITransferDetails;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transferDetails }) => {
            this.transferDetails = transferDetails;
        });
    }

    previousState() {
        window.history.back();
    }
}

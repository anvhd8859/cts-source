import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransferPacking } from 'app/shared/model/ctsmicroservice/transfer-packing.model';

@Component({
    selector: 'jhi-transfer-packing-detail',
    templateUrl: './transfer-packing-detail.component.html'
})
export class TransferPackingDetailComponent implements OnInit {
    transferPacking: ITransferPacking;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transferPacking }) => {
            this.transferPacking = transferPacking;
        });
    }

    previousState() {
        window.history.back();
    }
}

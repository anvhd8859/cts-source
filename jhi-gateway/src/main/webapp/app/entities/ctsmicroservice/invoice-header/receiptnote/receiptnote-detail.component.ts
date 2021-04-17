import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReceiptnote } from 'app/shared/model/ctsmicroservice/receiptnote.model';

@Component({
    selector: 'jhi-receiptnote-detail',
    templateUrl: './receiptnote-detail.component.html'
})
export class ReceiptnoteDetailComponent implements OnInit {
    receiptnote: IReceiptnote;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ receiptnote }) => {
            this.receiptnote = receiptnote;
        });
    }

    previousState() {
        window.history.back();
    }
}

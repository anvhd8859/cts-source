import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConfirmReceiptNote } from 'app/shared/model/ctsmicroservice/confirm-receipt-note.model';

@Component({
    selector: 'jhi-confirm-receipt-note-detail',
    templateUrl: './confirm-receipt-note-detail.component.html'
})
export class ConfirmReceiptNoteDetailComponent implements OnInit {
    confirmReceiptNote: IConfirmReceiptNote;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ confirmReceiptNote }) => {
            this.confirmReceiptNote = confirmReceiptNote;
        });
    }

    previousState() {
        window.history.back();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConfirmReceiptNote } from 'app/shared/model/ctsmicroservice/confirm-receipt-note.model';
import { ConfirmReceiptNoteService } from './confirm-receipt-note.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-confirm-receipt-note-dialog',
    templateUrl: './confirm-receipt-note-dialog.component.html'
})
export class ConfirmReceiptNoteDialogComponent {
    confirmReceiptNote: IConfirmReceiptNote;
    isSaving: boolean;

    constructor(
        private confirmReceiptNoteService: ConfirmReceiptNoteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmReceipt(confirmReceiptNote: IConfirmReceiptNote) {
        this.confirmReceiptNoteService.update(confirmReceiptNote).subscribe(
            (response: HttpResponse<IConfirmReceiptNote>) => {
                this.isSaving = false;
                this.eventManager.broadcast({
                    name: 'confirmReceiptNoteListModification',
                    content: 'Confirmed an ReceiptNote'
                });
                this.activeModal.dismiss(true);
            },
            (response: HttpErrorResponse) => {
                this.isSaving = false;
                this.eventManager.broadcast({
                    name: 'confirmReceiptNoteListModification',
                    content: response.message
                });
                this.activeModal.dismiss(true);
            }
        );
    }
}

@Component({
    selector: 'jhi-confirm-receipt-note-popup',
    template: ''
})
export class ConfirmReceiptNotePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ confirmReceiptNote }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ConfirmReceiptNoteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.confirmReceiptNote = confirmReceiptNote;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

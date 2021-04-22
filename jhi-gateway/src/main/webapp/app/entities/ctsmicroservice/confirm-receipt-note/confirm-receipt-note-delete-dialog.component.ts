import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConfirmReceiptNote } from 'app/shared/model/ctsmicroservice/confirm-receipt-note.model';
import { ConfirmReceiptNoteService } from './confirm-receipt-note.service';

@Component({
    selector: 'jhi-confirm-receipt-note-delete-dialog',
    templateUrl: './confirm-receipt-note-delete-dialog.component.html'
})
export class ConfirmReceiptNoteDeleteDialogComponent {
    confirmReceiptNote: IConfirmReceiptNote;

    constructor(
        private confirmReceiptNoteService: ConfirmReceiptNoteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.confirmReceiptNoteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'confirmReceiptNoteListModification',
                content: 'Deleted an confirmReceiptNote'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-confirm-receipt-note-delete-popup',
    template: ''
})
export class ConfirmReceiptNoteDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ confirmReceiptNote }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ConfirmReceiptNoteDeleteDialogComponent as Component, {
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

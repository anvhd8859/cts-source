import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReceiptnote } from 'app/shared/model/ctsmicroservice/receiptnote.model';
import { ReceiptnoteService } from './receiptnote.service';

@Component({
    selector: 'jhi-receipt-note-user-confirm-dialog',
    templateUrl: './receipt-note-user-confirm-dialog.component.html'
})
export class ReceiptnoteConfirmDialogComponent {
    receiptnote: IReceiptnote;

    constructor(
        private receiptnoteService: ReceiptnoteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmConfirm(receiptnote: IReceiptnote) {
        receiptnote.receiptType = true;
        this.receiptnoteService.update(receiptnote).subscribe(
            (res: HttpResponse<IReceiptnote>) => {
                this.eventManager.broadcast({
                    name: 'receiptnoteListModification',
                    content: 'Confirmed an receiptnote'
                });
                this.activeModal.dismiss(true);
            },
            (res: HttpErrorResponse) => {
                this.eventManager.broadcast({
                    name: 'receiptnoteListModification',
                    content: 'Have an error an receiptnote'
                });
                this.activeModal.dismiss(true);
            }
        );
    }
}

@Component({
    selector: 'jhi-receiptnote-delete-popup',
    template: ''
})
export class ReceiptnoteConfirmPopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ receiptnote }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ReceiptnoteConfirmDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.receiptnote = receiptnote;
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

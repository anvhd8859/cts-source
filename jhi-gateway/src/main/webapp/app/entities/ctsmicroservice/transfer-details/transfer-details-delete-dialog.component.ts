import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransferDetails } from 'app/shared/model/ctsmicroservice/transfer-details.model';
import { TransferDetailsService } from './transfer-details.service';

@Component({
    selector: 'jhi-transfer-details-delete-dialog',
    templateUrl: './transfer-details-delete-dialog.component.html'
})
export class TransferDetailsDeleteDialogComponent {
    transferDetails: ITransferDetails;

    constructor(
        private transferDetailsService: TransferDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transferDetailsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transferDetailsListModification',
                content: 'Deleted an transferDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transfer-details-delete-popup',
    template: ''
})
export class TransferDetailsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transferDetails }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TransferDetailsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transferDetails = transferDetails;
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

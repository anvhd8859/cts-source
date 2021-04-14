import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransferPacking } from 'app/shared/model/ctsmicroservice/transfer-packing.model';
import { TransferPackingService } from './transfer-packing.service';

@Component({
    selector: 'jhi-transfer-packing-delete-dialog',
    templateUrl: './transfer-packing-delete-dialog.component.html'
})
export class TransferPackingDeleteDialogComponent {
    transferPacking: ITransferPacking;

    constructor(
        private transferPackingService: TransferPackingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transferPackingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transferPackingListModification',
                content: 'Deleted an transferPacking'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transfer-packing-delete-popup',
    template: ''
})
export class TransferPackingDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transferPacking }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TransferPackingDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transferPacking = transferPacking;
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

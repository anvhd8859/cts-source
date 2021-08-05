import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWarehouseTransferRequest } from 'app/shared/model/ctsmicroservice/warehouse-transfer-request.model';
import { WarehouseTransferRequestService } from './warehouse-transfer-request.service';

@Component({
    selector: 'jhi-warehouse-transfer-request-delete-dialog',
    templateUrl: './warehouse-transfer-request-delete-dialog.component.html'
})
export class WarehouseTransferRequestDeleteDialogComponent {
    warehouseTransferRequest: IWarehouseTransferRequest;

    constructor(
        private warehouseTransferRequestService: WarehouseTransferRequestService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.warehouseTransferRequestService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'warehouseTransferRequestListModification',
                content: 'Deleted an warehouseTransferRequest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-warehouse-transfer-request-delete-popup',
    template: ''
})
export class WarehouseTransferRequestDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ warehouseTransferRequest }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(WarehouseTransferRequestDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.warehouseTransferRequest = warehouseTransferRequest;
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

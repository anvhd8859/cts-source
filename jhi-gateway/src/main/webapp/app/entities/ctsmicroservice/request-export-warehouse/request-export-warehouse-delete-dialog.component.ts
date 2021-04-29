import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRequestExportWarehouse } from 'app/shared/model/ctsmicroservice/request-export-warehouse.model';
import { RequestExportWarehouseService } from './request-export-warehouse.service';

@Component({
    selector: 'jhi-request-export-warehouse-delete-dialog',
    templateUrl: './request-export-warehouse-delete-dialog.component.html'
})
export class RequestExportWarehouseDeleteDialogComponent {
    requestExportWarehouse: IRequestExportWarehouse;

    constructor(
        private requestExportWarehouseService: RequestExportWarehouseService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.requestExportWarehouseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'requestExportWarehouseListModification',
                content: 'Deleted an requestExportWarehouse'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-request-export-warehouse-delete-popup',
    template: ''
})
export class RequestExportWarehouseDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ requestExportWarehouse }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RequestExportWarehouseDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.requestExportWarehouse = requestExportWarehouse;
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

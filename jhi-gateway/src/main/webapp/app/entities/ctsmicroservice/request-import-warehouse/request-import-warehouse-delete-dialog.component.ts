import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRequestImportWarehouse } from 'app/shared/model/ctsmicroservice/request-import-warehouse.model';
import { RequestImportWarehouseService } from './request-import-warehouse.service';

@Component({
    selector: 'jhi-request-import-warehouse-delete-dialog',
    templateUrl: './request-import-warehouse-delete-dialog.component.html'
})
export class RequestImportWarehouseDeleteDialogComponent {
    requestImportWarehouse: IRequestImportWarehouse;

    constructor(
        private requestImportWarehouseService: RequestImportWarehouseService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.requestImportWarehouseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'requestImportWarehouseListModification',
                content: 'Deleted an requestImportWarehouse'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-request-import-warehouse-delete-popup',
    template: ''
})
export class RequestImportWarehouseDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ requestImportWarehouse }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RequestImportWarehouseDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.requestImportWarehouse = requestImportWarehouse;
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IImportExportWarehouse } from 'app/shared/model/ctsmicroservice/import-export-warehouse.model';
import { ImportExportWarehouseService } from './import-export-warehouse.service';

@Component({
    selector: 'jhi-import-export-warehouse-delete-dialog',
    templateUrl: './import-export-warehouse-delete-dialog.component.html'
})
export class ImportExportWarehouseDeleteDialogComponent {
    importExportWarehouse: IImportExportWarehouse;

    constructor(
        private importExportWarehouseService: ImportExportWarehouseService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.importExportWarehouseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'importExportWarehouseListModification',
                content: 'Deleted an importExportWarehouse'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-import-export-warehouse-delete-popup',
    template: ''
})
export class ImportExportWarehouseDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ importExportWarehouse }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ImportExportWarehouseDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.importExportWarehouse = importExportWarehouse;
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

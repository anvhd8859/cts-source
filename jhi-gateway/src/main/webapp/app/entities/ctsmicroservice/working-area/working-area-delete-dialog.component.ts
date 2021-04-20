import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWorkingArea } from 'app/shared/model/ctsmicroservice/working-area.model';
import { WorkingAreaService } from './working-area.service';

@Component({
    selector: 'jhi-working-area-delete-dialog',
    templateUrl: './working-area-delete-dialog.component.html'
})
export class WorkingAreaDeleteDialogComponent {
    workingArea: IWorkingArea;

    constructor(
        private workingAreaService: WorkingAreaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.workingAreaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'workingAreaListModification',
                content: 'Deleted an workingArea'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-working-area-delete-popup',
    template: ''
})
export class WorkingAreaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ workingArea }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(WorkingAreaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.workingArea = workingArea;
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

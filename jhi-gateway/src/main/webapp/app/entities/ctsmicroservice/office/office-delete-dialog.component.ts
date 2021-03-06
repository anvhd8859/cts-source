import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOffice } from 'app/shared/model/ctsmicroservice/office.model';
import { OfficeService } from './office.service';

@Component({
    selector: 'jhi-office-delete-dialog',
    templateUrl: './office-delete-dialog.component.html'
})
export class OfficeDeleteDialogComponent {
    office: IOffice;

    constructor(private officeService: OfficeService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.officeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'officeListModification',
                content: 'Deleted an office'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-office-delete-popup',
    template: ''
})
export class OfficeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ office }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OfficeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.office = office;
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

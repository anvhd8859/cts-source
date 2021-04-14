import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStreet } from 'app/shared/model/ctsmicroservice/street.model';
import { StreetService } from './street.service';

@Component({
    selector: 'jhi-street-delete-dialog',
    templateUrl: './street-delete-dialog.component.html'
})
export class StreetDeleteDialogComponent {
    street: IStreet;

    constructor(private streetService: StreetService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.streetService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'streetListModification',
                content: 'Deleted an street'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-street-delete-popup',
    template: ''
})
export class StreetDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ street }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StreetDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.street = street;
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

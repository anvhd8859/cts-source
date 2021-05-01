import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRequestDetails } from 'app/shared/model/ctsmicroservice/request-details.model';
import { RequestDetailsService } from './request-details.service';

@Component({
    selector: 'jhi-request-details-delete-dialog',
    templateUrl: './request-details-delete-dialog.component.html'
})
export class RequestDetailsDeleteDialogComponent {
    requestDetails: IRequestDetails;

    constructor(
        private requestDetailsService: RequestDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.requestDetailsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'requestDetailsListModification',
                content: 'Deleted an requestDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-request-details-delete-popup',
    template: ''
})
export class RequestDetailsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ requestDetails }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RequestDetailsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.requestDetails = requestDetails;
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

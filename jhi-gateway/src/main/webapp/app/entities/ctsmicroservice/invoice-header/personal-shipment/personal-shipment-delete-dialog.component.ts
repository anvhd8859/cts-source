import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPersonalShipment } from 'app/shared/model/ctsmicroservice/personal-shipment.model';
import { PersonalShipmentService } from './personal-shipment.service';

@Component({
    selector: 'jhi-personal-shipment-delete-dialog',
    templateUrl: './personal-shipment-delete-dialog.component.html'
})
export class PersonalShipmentDeleteDialogComponent {
    personalShipment: IPersonalShipment;

    constructor(
        private personalShipmentService: PersonalShipmentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.personalShipmentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'personalShipmentListModification',
                content: 'Deleted an personalShipment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-personal-shipment-delete-popup',
    template: ''
})
export class PersonalShipmentDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ personalShipment }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PersonalShipmentDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.personalShipment = personalShipment;
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

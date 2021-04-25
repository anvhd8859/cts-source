import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPersonalShipment } from 'app/shared/model/ctsmicroservice/personal-shipment.model';
import { PersonalShipmentService } from './personal-shipment.service';
import { IUser } from 'app/core';
import { InvoiceHeaderService } from '../invoice-header.service';

@Component({
    selector: 'jhi-personal-shipment-assign-dialog',
    templateUrl: './personal-shipment-assign-dialog.component.html'
})
export class PersonalShipmentAssignDialogComponent {
    personalShipment: IPersonalShipment;
    lstShipper: IUser[];
    currentAssignee: IUser;
    selectedShipper: IUser;

    constructor(
        private personalShipmentService: PersonalShipmentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.personalShipment.employeeId = this.selectedShipper.id;
        console.log(this.personalShipment);
        this.personalShipmentService.update(this.personalShipment).subscribe(response => {
            this.eventManager.broadcast({
                name: 'personalShipmentListModification',
                content: 'Reassign an personalShipment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-personal-shipment-assign-popup',
    template: ''
})
export class PersonalShipmentAssignPopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;
    private lstShipper: IUser[] = [];
    private currentAssignee: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        private invoiceHeaderService: InvoiceHeaderService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ personalShipment }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PersonalShipmentAssignDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                setTimeout(() => {
                    this.invoiceHeaderService.getLstUser().subscribe(res => {
                        this.lstShipper = res.body.filter(e => e.authorities.filter(i => i === 'ROLE_SHIPPER'));
                        this.ngbModalRef.componentInstance.personalShipment = personalShipment;
                        this.ngbModalRef.componentInstance.lstShipper = this.lstShipper;
                        this.ngbModalRef.componentInstance.currentAssignee = this.lstShipper.find(
                            e => e.id === personalShipment.employeeId
                        );
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
                    });
                }, 0);
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';
import { SubDistrictService } from './sub-district.service';

@Component({
    selector: 'jhi-sub-district-delete-dialog',
    templateUrl: './sub-district-delete-dialog.component.html'
})
export class SubDistrictDeleteDialogComponent {
    subDistrict: ISubDistrict;

    constructor(
        private subDistrictService: SubDistrictService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subDistrictService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'subDistrictListModification',
                content: 'Deleted an subDistrict'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sub-district-delete-popup',
    template: ''
})
export class SubDistrictDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subDistrict }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SubDistrictDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.subDistrict = subDistrict;
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProvince } from 'app/shared/model/ctsmicroservice/province.model';
import { ProvinceService } from './province.service';

@Component({
    selector: 'jhi-province-delete-dialog',
    templateUrl: './province-delete-dialog.component.html'
})
export class ProvinceDeleteDialogComponent {
    province: IProvince;

    constructor(private provinceService: ProvinceService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.provinceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'provinceListModification',
                content: 'Deleted an province'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-province-delete-popup',
    template: ''
})
export class ProvinceDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ province }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProvinceDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.province = province;
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

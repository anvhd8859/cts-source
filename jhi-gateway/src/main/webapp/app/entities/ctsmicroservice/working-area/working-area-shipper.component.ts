import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWorkingArea } from 'app/shared/model/ctsmicroservice/working-area.model';
import { Principal } from 'app/core';
import { WorkingAreaService } from './working-area.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CustomWorkingArea } from './working-area.component';

@Component({
    selector: 'jhi-working-area',
    templateUrl: './working-area-shipper.component.html'
})
export class WorkingAreaShipperComponent implements OnInit, OnDestroy {
    workingArea: IWorkingArea;
    areas: CustomWorkingArea[];
    currentAccount: any;
    eventSubscriber: Subscription;
    isSaving: boolean;

    constructor(
        private workingAreaService: WorkingAreaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private ngxUiLoaderService: NgxUiLoaderService
    ) {}

    loadAll() {
        this.ngxUiLoaderService.start();
        const param = {
            id: this.currentAccount.id
        };
        this.workingAreaService.getWorkingAreaByShipper(param).subscribe(
            (res: HttpResponse<any>) => {
                this.areas = res.body;
                this.ngxUiLoaderService.stop();
            },
            (res: HttpErrorResponse) => {
                this.ngxUiLoaderService.stop();
                this.onError();
            }
        );
    }

    ngOnInit() {
        this.registerChangeInWorkingAreas();
        this.principal.identity().then(account => {
            this.currentAccount = account;
            this.loadAll();
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWorkingAreas() {
        this.eventSubscriber = this.eventManager.subscribe('workingAreaListModification', response => this.loadAll());
    }

    private onError() {
        this.jhiAlertService.error('Đã xảy ra lỗi', null, null);
    }
}

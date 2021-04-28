import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { forkJoin, Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWorkingArea } from 'app/shared/model/ctsmicroservice/working-area.model';
import { AccountService, IUser, Principal } from 'app/core';
import { WorkingAreaService } from './working-area.service';
import { InvoiceHeaderService } from '../invoice-header';
import { IStreet } from 'app/shared/model/ctsmicroservice/street.model';

@Component({
    selector: 'jhi-working-area',
    templateUrl: './working-area.component.html'
})
export class WorkingAreaComponent implements OnInit, OnDestroy {
    workingAreas: IWorkingArea[];
    currentAccount: any;
    eventSubscriber: Subscription;
    lstUser: IUser[] = [];
    lstStreetFrom: IStreet[] = [];

    constructor(
        private workingAreaService: WorkingAreaService,
        private invoiceHeaderService: InvoiceHeaderService,
        private accountService: AccountService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.workingAreaService.query().subscribe(
            (res: HttpResponse<IWorkingArea[]>) => {
                this.workingAreas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInWorkingAreas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWorkingArea) {
        return item.id;
    }

    registerChangeInWorkingAreas() {
        this.eventSubscriber = this.eventManager.subscribe('workingAreaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

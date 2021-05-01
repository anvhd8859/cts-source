import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRequestDetails } from 'app/shared/model/ctsmicroservice/request-details.model';
import { Principal } from 'app/core';
import { RequestDetailsService } from './request-details.service';

@Component({
    selector: 'jhi-request-details',
    templateUrl: './request-details.component.html'
})
export class RequestDetailsComponent implements OnInit, OnDestroy {
    requestDetails: IRequestDetails[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private requestDetailsService: RequestDetailsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.requestDetailsService.query().subscribe(
            (res: HttpResponse<IRequestDetails[]>) => {
                this.requestDetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRequestDetails();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRequestDetails) {
        return item.id;
    }

    registerChangeInRequestDetails() {
        this.eventSubscriber = this.eventManager.subscribe('requestDetailsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

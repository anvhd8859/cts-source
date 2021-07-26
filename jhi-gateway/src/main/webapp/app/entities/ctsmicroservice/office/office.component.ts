import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOffice } from 'app/shared/model/ctsmicroservice/office.model';
import { Principal } from 'app/core';
import { OfficeService } from './office.service';

@Component({
    selector: 'jhi-office',
    templateUrl: './office.component.html'
})
export class OfficeComponent implements OnInit, OnDestroy {
    offices: IOffice[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private officeService: OfficeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.officeService.query().subscribe(
            (res: HttpResponse<IOffice[]>) => {
                this.offices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOffices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOffice) {
        return item.id;
    }

    registerChangeInOffices() {
        this.eventSubscriber = this.eventManager.subscribe('officeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error('Đã xảy ra lỗi khi thực hiện', null, null);
    }
}

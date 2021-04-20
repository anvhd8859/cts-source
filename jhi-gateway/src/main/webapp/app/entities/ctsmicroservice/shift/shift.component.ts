import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IShift } from 'app/shared/model/ctsmicroservice/shift.model';
import { Principal } from 'app/core';
import { ShiftService } from './shift.service';

@Component({
    selector: 'jhi-shift',
    templateUrl: './shift.component.html'
})
export class ShiftComponent implements OnInit, OnDestroy {
    shifts: IShift[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private shiftService: ShiftService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.shiftService.query().subscribe(
            (res: HttpResponse<IShift[]>) => {
                this.shifts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInShifts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IShift) {
        return item.id;
    }

    registerChangeInShifts() {
        this.eventSubscriber = this.eventManager.subscribe('shiftListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

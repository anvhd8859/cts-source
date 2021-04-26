import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmReceiptNote } from 'app/shared/model/ctsmicroservice/confirm-receipt-note.model';
import { ConfirmReceiptNoteService } from './confirm-receipt-note.service';
import { ConfirmReceiptNoteComponent } from './confirm-receipt-note.component';
import { ConfirmReceiptNoteDetailComponent } from './confirm-receipt-note-detail.component';
import { ConfirmReceiptNoteUpdateComponent } from './confirm-receipt-note-update.component';
import { ConfirmReceiptNoteDeletePopupComponent } from './confirm-receipt-note-delete-dialog.component';
import { IConfirmReceiptNote } from 'app/shared/model/ctsmicroservice/confirm-receipt-note.model';
import { ConfirmReceiptNotePopupComponent } from './confirm-receipt-note-dialog.component';

@Injectable({ providedIn: 'root' })
export class ConfirmReceiptNoteResolve implements Resolve<IConfirmReceiptNote> {
    constructor(private service: ConfirmReceiptNoteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((confirmReceiptNote: HttpResponse<ConfirmReceiptNote>) => confirmReceiptNote.body));
        }
        return of(new ConfirmReceiptNote());
    }
}

export const confirmReceiptNoteRoute: Routes = [
    {
        path: 'confirm-receipt-note',
        component: ConfirmReceiptNoteComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'ConfirmReceiptNotes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'confirm-receipt-note/:id/view',
        component: ConfirmReceiptNoteDetailComponent,
        resolve: {
            confirmReceiptNote: ConfirmReceiptNoteResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ConfirmReceiptNotes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'confirm-receipt-note/new',
        component: ConfirmReceiptNoteUpdateComponent,
        resolve: {
            confirmReceiptNote: ConfirmReceiptNoteResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ConfirmReceiptNotes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'confirm-receipt-note/:id/edit',
        component: ConfirmReceiptNoteUpdateComponent,
        resolve: {
            confirmReceiptNote: ConfirmReceiptNoteResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ConfirmReceiptNotes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const confirmReceiptNotePopupRoute: Routes = [
    {
        path: 'confirm-receipt-note/:id/delete',
        component: ConfirmReceiptNoteDeletePopupComponent,
        resolve: {
            confirmReceiptNote: ConfirmReceiptNoteResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ConfirmReceiptNotes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'confirm-receipt-note/:id/confirm',
        component: ConfirmReceiptNotePopupComponent,
        resolve: {
            confirmReceiptNote: ConfirmReceiptNoteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ConfirmReceiptNotes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

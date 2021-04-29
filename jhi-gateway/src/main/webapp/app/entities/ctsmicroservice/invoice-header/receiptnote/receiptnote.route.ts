import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Receiptnote } from 'app/shared/model/ctsmicroservice/receiptnote.model';
import { ReceiptnoteService } from './receiptnote.service';
import { ReceiptnoteComponent } from './receiptnote.component';
import { ReceiptnoteDetailComponent } from './receiptnote-detail.component';
import { ReceiptnoteUpdateComponent } from './receiptnote-update.component';
import { ReceiptnoteDeletePopupComponent } from './receiptnote-delete-dialog.component';
import { IReceiptnote } from 'app/shared/model/ctsmicroservice/receiptnote.model';
import { InvoiceHeaderService } from '../invoice-header.service';
import { IInvoiceHeader, InvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { ReceiptnoteUserComponent } from './receipt-note-user.component';
import { ReceiptnoteConfirmPopupComponent } from './receipt-note-user-confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class ReceiptnoteResolve implements Resolve<IReceiptnote> {
    constructor(private service: ReceiptnoteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((receiptnote: HttpResponse<Receiptnote>) => receiptnote.body));
        }
        return of(new Receiptnote());
    }
}

@Injectable({ providedIn: 'root' })
export class ReceiveNoeByInvoiceResolve implements Resolve<IReceiptnote> {
    constructor(private service: ReceiptnoteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const xid = route.params['id'] ? route.params['id'] : null;
        if (xid) {
            return this.service.getReceiveNote({ id: xid }).pipe(map((receiptnote: HttpResponse<Receiptnote>) => receiptnote.body));
        }
        return of(new Receiptnote());
    }
}

@Injectable({ providedIn: 'root' })
export class InvoiceHeaderResolve implements Resolve<IInvoiceHeader> {
    constructor(private service: InvoiceHeaderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((receiptnote: HttpResponse<InvoiceHeader>) => receiptnote.body));
        }
        return of(new InvoiceHeader());
    }
}

export const receiptnoteRoute: Routes = [
    {
        path: 'receiptnote',
        component: ReceiptnoteComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'CTS: Biên lai'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receiptnote/new',
        component: ReceiptnoteUpdateComponent,
        resolve: {
            receiptnote: ReceiptnoteResolve
        },
        data: {
            authorities: ['ROLE_SHIPPER', 'ROLE_ADMIN'],
            pageTitle: 'CTS: Tạo biên lai'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receiptnote/:id/edit',
        component: ReceiptnoteUpdateComponent,
        resolve: {
            receiptnote: ReceiptnoteResolve
        },
        data: {
            authorities: ['ROLE_SHIPPER', 'ROLE_ADMIN'],
            pageTitle: 'CTS: Biên lai'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receiptnote/:id/view',
        component: ReceiptnoteDetailComponent,
        resolve: {
            receiptnote: ReceiveNoeByInvoiceResolve
        },
        data: {
            authorities: ['ROLE_SHIPPER', 'ROLE_ADMIN'],
            pageTitle: 'CTS: Biên lai'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receiptnote/:id/new-receive',
        component: ReceiptnoteUpdateComponent,
        resolve: {
            invoiceHeader: InvoiceHeaderResolve
        },
        data: {
            authorities: ['ROLE_SHIPPER', 'ROLE_ADMIN'],
            pageTitle: 'CTS: Biên lai'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receiptnote-user',
        component: ReceiptnoteUserComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'CTS: Biên lai'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const receiptnotePopupRoute: Routes = [
    {
        path: 'receiptnote/:id/delete',
        component: ReceiptnoteDeletePopupComponent,
        resolve: {
            receiptnote: ReceiptnoteResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Receipt Notes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'receiptnote-user/:id/confirm',
        component: ReceiptnoteConfirmPopupComponent,
        resolve: {
            receiptnote: ReceiptnoteResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'Receipt Notes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

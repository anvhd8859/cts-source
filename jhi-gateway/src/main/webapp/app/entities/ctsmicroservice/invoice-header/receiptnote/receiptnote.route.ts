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
import { InvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';

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
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.getReceiveNote({ id: id }).pipe(map((receiptnote: HttpResponse<Receiptnote>) => receiptnote.body));
        }
        return of(new Receiptnote());
    }
}

@Injectable({ providedIn: 'root' })
export class InvoiceHeaderResolve implements Resolve<IReceiptnote> {
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
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Receiptnotes'
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
            authorities: ['ROLE_USER'],
            pageTitle: 'Receiptnotes'
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
            authorities: ['ROLE_USER'],
            pageTitle: 'Receiptnotes'
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
            authorities: ['ROLE_USER'],
            pageTitle: 'Receive Note'
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
            authorities: ['ROLE_USER'],
            pageTitle: 'Receive Note'
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
            authorities: ['ROLE_USER'],
            pageTitle: 'Receiptnotes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CancelInvoice } from 'app/shared/model/ctsmicroservice/cancel-invoice.model';
import { CancelInvoiceService } from './cancel-invoice.service';
import { CancelInvoiceComponent } from './cancel-invoice.component';
import { CancelInvoiceDetailComponent } from './cancel-invoice-detail.component';
import { CancelInvoiceApprovePopupComponent } from './cancel-invoice-approve-dialog.component';
import { CancelInvoiceDeletePopupComponent } from './cancel-invoice-delete-dialog.component';
import { ICancelInvoice } from 'app/shared/model/ctsmicroservice/cancel-invoice.model';

@Injectable({ providedIn: 'root' })
export class CancelInvoiceResolve implements Resolve<ICancelInvoice> {
    constructor(private service: CancelInvoiceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((cancelInvoice: HttpResponse<CancelInvoice>) => cancelInvoice.body));
        }
        return of(new CancelInvoice());
    }
}

export const cancelInvoiceRoute: Routes = [
    {
        path: 'cancel-invoice',
        component: CancelInvoiceComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'CancelInvoices'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cancel-invoice/:id/view',
        component: CancelInvoiceDetailComponent,
        resolve: {
            cancelInvoice: CancelInvoiceResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'CancelInvoices'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cancelInvoicePopupRoute: Routes = [
    {
        path: 'cancel-invoice/:id/approve',
        component: CancelInvoiceApprovePopupComponent,
        resolve: {
            cancelInvoice: CancelInvoiceResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'CancelInvoices'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cancel-invoice/:id/reject',
        component: CancelInvoiceDeletePopupComponent,
        resolve: {
            cancelInvoice: CancelInvoiceResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'CancelInvoices'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

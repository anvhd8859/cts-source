import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvoiceDetails } from 'app/shared/model/ctsmicroservice/invoice-details.model';
import { InvoiceDetailsService } from './invoice-details.service';
import { InvoiceDetailsComponent } from './invoice-details.component';
import { InvoiceDetailsDetailComponent } from './invoice-details-detail.component';
import { InvoiceDetailsUpdateComponent } from './invoice-details-update.component';
import { InvoiceDetailsDeletePopupComponent } from './invoice-details-delete-dialog.component';
import { IInvoiceDetails } from 'app/shared/model/ctsmicroservice/invoice-details.model';

@Injectable({ providedIn: 'root' })
export class InvoiceDetailsResolve implements Resolve<IInvoiceDetails> {
    constructor(private service: InvoiceDetailsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((invoiceDetails: HttpResponse<InvoiceDetails>) => invoiceDetails.body));
        }
        return of(new InvoiceDetails());
    }
}

export const invoiceDetailsRoute: Routes = [
    {
        path: 'invoice-details',
        component: InvoiceDetailsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'InvoiceDetails'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'invoice-details/:id/view',
        component: InvoiceDetailsDetailComponent,
        resolve: {
            invoiceDetails: InvoiceDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InvoiceDetails'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'invoice-details/new',
        component: InvoiceDetailsUpdateComponent,
        resolve: {
            invoiceDetails: InvoiceDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InvoiceDetails'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'invoice-details/:id/edit',
        component: InvoiceDetailsUpdateComponent,
        resolve: {
            invoiceDetails: InvoiceDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InvoiceDetails'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invoiceDetailsPopupRoute: Routes = [
    {
        path: 'invoice-details/:id/delete',
        component: InvoiceDetailsDeletePopupComponent,
        resolve: {
            invoiceDetails: InvoiceDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InvoiceDetails'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

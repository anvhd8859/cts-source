import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { InvoiceHeaderService } from './invoice-header.service';
import { InvoiceHeaderComponent } from './invoice-header.component';
import { InvoiceHeaderDetailComponent } from './invoice-header-detail.component';
import { InvoiceHeaderUpdateComponent } from './invoice-header-update.component';
import { InvoiceHeaderDeletePopupComponent } from './invoice-header-delete-dialog.component';
import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';

@Injectable({ providedIn: 'root' })
export class InvoiceHeaderResolve implements Resolve<IInvoiceHeader> {
    constructor(private service: InvoiceHeaderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((invoiceHeader: HttpResponse<InvoiceHeader>) => invoiceHeader.body));
        }
        return of(new InvoiceHeader());
    }
}

export const invoiceHeaderRoute: Routes = [
    {
        path: 'invoice-header',
        component: InvoiceHeaderComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'InvoiceHeaders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'invoice-header/:id/view',
        component: InvoiceHeaderDetailComponent,
        resolve: {
            invoiceHeader: InvoiceHeaderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InvoiceHeaders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'invoice-header/new',
        component: InvoiceHeaderUpdateComponent,
        resolve: {
            invoiceHeader: InvoiceHeaderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InvoiceHeaders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'invoice-header/:id/edit',
        component: InvoiceHeaderUpdateComponent,
        resolve: {
            invoiceHeader: InvoiceHeaderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InvoiceHeaders'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invoiceHeaderPopupRoute: Routes = [
    {
        path: 'invoice-header/:id/delete',
        component: InvoiceHeaderDeletePopupComponent,
        resolve: {
            invoiceHeader: InvoiceHeaderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InvoiceHeaders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Payment } from 'app/shared/model/ctsmicroservice/payment.model';
import { PaymentService } from './payment.service';
import { PaymentComponent } from './payment.component';
import { PaymentDetailComponent } from './payment-detail.component';
import { PaymentUpdateComponent } from './payment-update.component';
import { PaymentDeletePopupComponent } from './payment-delete-dialog.component';
import { IPayment } from 'app/shared/model/ctsmicroservice/payment.model';
import { PaymentShipperComponent } from '.';

@Injectable({ providedIn: 'root' })
export class PaymentResolve implements Resolve<IPayment> {
    constructor(private service: PaymentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((payment: HttpResponse<Payment>) => payment.body));
        }
        return of(new Payment());
    }
}

export const paymentRoute: Routes = [
    {
        path: 'payment',
        component: PaymentComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_OFFICER'],
            defaultSort: 'id,asc',
            pageTitle: 'Quản lý thanh toán'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'payment-shipper',
        component: PaymentShipperComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_SHIPPER'],
            defaultSort: 'id,asc',
            pageTitle: 'Quản lý thanh toán'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'payment/:id/view',
        component: PaymentDetailComponent,
        resolve: {
            payment: PaymentResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_OFFICER'],
            pageTitle: 'Quản lý thanh toán'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'payment/new',
        component: PaymentUpdateComponent,
        resolve: {
            payment: PaymentResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Quản lý thanh toán'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'payment/:id/edit',
        component: PaymentUpdateComponent,
        resolve: {
            payment: PaymentResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Quản lý thanh toán'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const paymentPopupRoute: Routes = [
    {
        path: 'payment/:id/delete',
        component: PaymentDeletePopupComponent,
        resolve: {
            payment: PaymentResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Quản lý thanh toán'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

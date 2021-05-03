import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersonalShipment } from 'app/shared/model/ctsmicroservice/personal-shipment.model';
import { PersonalShipmentService } from './personal-shipment.service';
import { PersonalShipmentComponent } from './personal-shipment.component';
import { PersonalShipmentDetailComponent } from './personal-shipment-detail.component';
import { PersonalShipmentUpdateComponent } from './personal-shipment-update.component';
import { PersonalShipmentDeletePopupComponent } from './personal-shipment-delete-dialog.component';
import { IPersonalShipment } from 'app/shared/model/ctsmicroservice/personal-shipment.model';
import { PersonalShipmentAdminComponent, PersonalShipmentCancelInvoiceRequestPopupComponent } from '.';
import { PersonalShipmentAssignPopupComponent } from './personal-shipment-assign-dialog.component';
import { InvoiceHeaderService } from '..';
import { IInvoiceHeader, InvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';

@Injectable({ providedIn: 'root' })
export class PersonalShipmentResolve implements Resolve<IPersonalShipment> {
    constructor(private service: PersonalShipmentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((personalShipment: HttpResponse<PersonalShipment>) => personalShipment.body));
        }
        return of(new PersonalShipment());
    }
}
@Injectable({ providedIn: 'root' })
export class PersonalRequestCancelResolve implements Resolve<IInvoiceHeader> {
    constructor(private service: InvoiceHeaderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((invoiceHeader: HttpResponse<InvoiceHeader>) => invoiceHeader.body));
        }
        return of(new InvoiceHeader());
    }
}

export const personalShipmentRoute: Routes = [
    {
        path: 'personal-shipment',
        component: PersonalShipmentComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_SHIPPER', 'ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'PersonalShipments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'personal-shipment/:id/view',
        component: PersonalShipmentDetailComponent,
        resolve: {
            personalShipment: PersonalShipmentResolve
        },
        data: {
            authorities: ['ROLE_SHIPPER', 'ROLE_ADMIN'],
            pageTitle: 'PersonalShipments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'personal-shipment/new',
        component: PersonalShipmentUpdateComponent,
        resolve: {
            personalShipment: PersonalShipmentResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'PersonalShipments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'personal-shipment/:id/edit',
        component: PersonalShipmentUpdateComponent,
        resolve: {
            personalShipment: PersonalShipmentResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_KEEPER', 'ROLE_OFFICER'],
            pageTitle: 'PersonalShipments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'personal-shipment-admin',
        component: PersonalShipmentAdminComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'Manage Personal Shipment'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personalShipmentPopupRoute: Routes = [
    {
        path: 'personal-shipment/:id/delete',
        component: PersonalShipmentDeletePopupComponent,
        resolve: {
            personalShipment: PersonalShipmentResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'PersonalShipments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'personal-shipment/:id/assign',
        component: PersonalShipmentAssignPopupComponent,
        resolve: {
            personalShipment: PersonalShipmentResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'PersonalShipments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'personal-shipment-cancel-invoice/:id/send-request',
        component: PersonalShipmentCancelInvoiceRequestPopupComponent,
        resolve: {
            invoiceHeader: PersonalRequestCancelResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_SHIPPER'],
            pageTitle: 'PersonalShipments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

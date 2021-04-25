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
import { PersonalShipmentAdminComponent } from '.';

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

export const personalShipmentRoute: Routes = [
    {
        path: 'personal-shipment',
        component: PersonalShipmentComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_SHIPPER'],
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
            authorities: ['ROLE_SHIPPER'],
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
            authorities: ['ROLE_ADMIN'],
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
            authorities: ['ROLE_SHIPPER'],
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
    }
];

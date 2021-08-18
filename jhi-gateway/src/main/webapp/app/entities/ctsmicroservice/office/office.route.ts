import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Office } from 'app/shared/model/ctsmicroservice/office.model';
import { OfficeService } from './office.service';
import { OfficeComponent } from './office.component';
import { OfficeDetailComponent } from './office-detail.component';
import { OfficeUpdateComponent } from './office-update.component';
import { OfficeDeletePopupComponent } from './office-delete-dialog.component';
import { IOffice } from 'app/shared/model/ctsmicroservice/office.model';

@Injectable({ providedIn: 'root' })
export class OfficeResolve implements Resolve<IOffice> {
    constructor(private service: OfficeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((office: HttpResponse<Office>) => office.body));
        }
        return of(new Office());
    }
}

export const officeRoute: Routes = [
    {
        path: 'office',
        component: OfficeComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'CTS: Quản lý văn phòng'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'office/:id/view',
        component: OfficeDetailComponent,
        resolve: {
            office: OfficeResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'CTS: Quản lý văn phòng'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'office/new',
        component: OfficeUpdateComponent,
        resolve: {
            office: OfficeResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'CTS: Quản lý văn phòng'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'office/:id/edit',
        component: OfficeUpdateComponent,
        resolve: {
            office: OfficeResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'CTS: Quản lý văn phòng'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const officePopupRoute: Routes = [
    {
        path: 'office/:id/delete',
        component: OfficeDeletePopupComponent,
        resolve: {
            office: OfficeResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'CTS: Quản lý văn phòng'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

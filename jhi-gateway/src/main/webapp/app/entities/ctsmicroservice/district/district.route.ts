import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { District } from 'app/shared/model/ctsmicroservice/district.model';
import { DistrictService } from './district.service';
import { DistrictComponent } from './district.component';
import { DistrictDetailComponent } from './district-detail.component';
import { DistrictUpdateComponent } from './district-update.component';
import { DistrictDeletePopupComponent } from './district-delete-dialog.component';
import { IDistrict } from 'app/shared/model/ctsmicroservice/district.model';

@Injectable({ providedIn: 'root' })
export class DistrictResolve implements Resolve<IDistrict> {
    constructor(private service: DistrictService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((district: HttpResponse<District>) => district.body));
        }
        return of(new District());
    }
}

export const districtRoute: Routes = [
    {
        path: 'district',
        component: DistrictComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'Districts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'district/:id/view',
        component: DistrictDetailComponent,
        resolve: {
            district: DistrictResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Districts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'district/new',
        component: DistrictUpdateComponent,
        resolve: {
            district: DistrictResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Districts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'district/:id/edit',
        component: DistrictUpdateComponent,
        resolve: {
            district: DistrictResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Districts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const districtPopupRoute: Routes = [
    {
        path: 'district/:id/delete',
        component: DistrictDeletePopupComponent,
        resolve: {
            district: DistrictResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Districts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

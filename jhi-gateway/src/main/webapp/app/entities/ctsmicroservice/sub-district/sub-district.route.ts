import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';
import { SubDistrictService } from './sub-district.service';
import { SubDistrictComponent } from './sub-district.component';
import { SubDistrictDetailComponent } from './sub-district-detail.component';
import { SubDistrictUpdateComponent } from './sub-district-update.component';
import { SubDistrictDeletePopupComponent } from './sub-district-delete-dialog.component';
import { ISubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';

@Injectable({ providedIn: 'root' })
export class SubDistrictResolve implements Resolve<ISubDistrict> {
    constructor(private service: SubDistrictService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((subDistrict: HttpResponse<SubDistrict>) => subDistrict.body));
        }
        return of(new SubDistrict());
    }
}

export const subDistrictRoute: Routes = [
    {
        path: 'sub-district',
        component: SubDistrictComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'SubDistricts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sub-district/:id/view',
        component: SubDistrictDetailComponent,
        resolve: {
            subDistrict: SubDistrictResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'SubDistricts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sub-district/new',
        component: SubDistrictUpdateComponent,
        resolve: {
            subDistrict: SubDistrictResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'SubDistricts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sub-district/:id/edit',
        component: SubDistrictUpdateComponent,
        resolve: {
            subDistrict: SubDistrictResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'SubDistricts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subDistrictPopupRoute: Routes = [
    {
        path: 'sub-district/:id/delete',
        component: SubDistrictDeletePopupComponent,
        resolve: {
            subDistrict: SubDistrictResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'SubDistricts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

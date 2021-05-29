import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Province } from 'app/shared/model/ctsmicroservice/province.model';
import { ProvinceService } from './province.service';
import { ProvinceComponent } from './province.component';
import { ProvinceDetailComponent } from './province-detail.component';
import { ProvinceUpdateComponent } from './province-update.component';
import { ProvinceDeletePopupComponent } from './province-delete-dialog.component';
import { IProvince } from 'app/shared/model/ctsmicroservice/province.model';
import { PolicyComponent } from './policy.component';

@Injectable({ providedIn: 'root' })
export class ProvinceResolve implements Resolve<IProvince> {
    constructor(private service: ProvinceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((province: HttpResponse<Province>) => province.body));
        }
        return of(new Province());
    }
}

export const provinceRoute: Routes = [
    {
        path: 'province',
        component: ProvinceComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'CTS: Quản lý danh sách Tỉnh/Thành phố'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'province/:id/view',
        component: ProvinceDetailComponent,
        resolve: {
            province: ProvinceResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'CTS: Quản lý danh sách Tỉnh/Thành phố'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'province/new',
        component: ProvinceUpdateComponent,
        resolve: {
            province: ProvinceResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'CTS: Quản lý danh sách Tỉnh/Thành phố'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'province/:id/edit',
        component: ProvinceUpdateComponent,
        resolve: {
            province: ProvinceResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'CTS: Quản lý danh sách Tỉnh/Thành phố'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'policy',
        component: PolicyComponent,
        data: {
            authorities: [],
            pageTitle: 'CTS: Policy'
        }
    }
];

export const provincePopupRoute: Routes = [
    {
        path: 'province/:id/delete',
        component: ProvinceDeletePopupComponent,
        resolve: {
            province: ProvinceResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'CTS: Quản lý danh sách Tỉnh/Thành phố'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

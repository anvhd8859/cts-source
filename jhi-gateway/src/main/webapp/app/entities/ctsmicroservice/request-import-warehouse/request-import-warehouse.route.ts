import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestImportWarehouse } from 'app/shared/model/ctsmicroservice/request-import-warehouse.model';
import { RequestImportWarehouseService } from './request-import-warehouse.service';
import { RequestImportWarehouseComponent } from './request-import-warehouse.component';
import { RequestImportWarehouseDetailComponent } from './request-import-warehouse-detail.component';
import { RequestImportWarehouseShipperUpdateComponent } from './request-import-warehouse-shipper-update.component';
import { RequestImportWarehouseDeletePopupComponent } from './request-import-warehouse-delete-dialog.component';
import { IRequestImportWarehouse } from 'app/shared/model/ctsmicroservice/request-import-warehouse.model';
import { RequestImportWarehouseOfficerUpdateComponent } from '.';

@Injectable({ providedIn: 'root' })
export class RequestImportWarehouseResolve implements Resolve<IRequestImportWarehouse> {
    constructor(private service: RequestImportWarehouseService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((requestImportWarehouse: HttpResponse<RequestImportWarehouse>) => requestImportWarehouse.body));
        }
        return of(new RequestImportWarehouse());
    }
}

export const requestImportWarehouseRoute: Routes = [
    {
        path: 'request-import-warehouse',
        component: RequestImportWarehouseComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'CTS: Yêu cầu nhập kho'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'request-import-warehouse/:id/view',
        component: RequestImportWarehouseDetailComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'CTS: Yêu cầu nhập kho'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'request-import-warehouse-shipper',
        component: RequestImportWarehouseShipperUpdateComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_SHIPPER'],
            pageTitle: 'CTS: Yêu cầu nhập kho'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'request-import-warehouse-officer',
        component: RequestImportWarehouseOfficerUpdateComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_OFFICER'],
            pageTitle: 'CTS: Yêu cầu nhập kho'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'request-import-warehouse/:id/edit',
        component: RequestImportWarehouseShipperUpdateComponent,
        resolve: {
            requestImportWarehouse: RequestImportWarehouseResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'CTS: Yêu cầu nhập kho'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const requestImportWarehousePopupRoute: Routes = [
    {
        path: 'request-import-warehouse/:id/delete',
        component: RequestImportWarehouseDeletePopupComponent,
        resolve: {
            requestImportWarehouse: RequestImportWarehouseResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'CTS: Yêu cầu nhập kho'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestExportWarehouse } from 'app/shared/model/ctsmicroservice/request-export-warehouse.model';
import { RequestExportWarehouseService } from './request-export-warehouse.service';
import { RequestExportWarehouseComponent } from './request-export-warehouse.component';
import { RequestExportWarehouseDetailComponent } from './request-export-warehouse-detail.component';
import { RequestExportWarehouseUpdateComponent } from './request-export-warehouse-update.component';
import { RequestExportWarehouseDeletePopupComponent } from './request-export-warehouse-delete-dialog.component';
import { IRequestExportWarehouse } from 'app/shared/model/ctsmicroservice/request-export-warehouse.model';

@Injectable({ providedIn: 'root' })
export class RequestExportWarehouseResolve implements Resolve<IRequestExportWarehouse> {
    constructor(private service: RequestExportWarehouseService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((requestExportWarehouse: HttpResponse<RequestExportWarehouse>) => requestExportWarehouse.body));
        }
        return of(new RequestExportWarehouse());
    }
}

export const requestExportWarehouseRoute: Routes = [
    {
        path: 'request-export-warehouse',
        component: RequestExportWarehouseComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'RequestExportWarehouses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'request-export-warehouse/:id/view',
        component: RequestExportWarehouseDetailComponent,
        resolve: {
            requestExportWarehouse: RequestExportWarehouseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RequestExportWarehouses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'request-export-warehouse/new',
        component: RequestExportWarehouseUpdateComponent,
        resolve: {
            requestExportWarehouse: RequestExportWarehouseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RequestExportWarehouses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'request-export-warehouse/:id/edit',
        component: RequestExportWarehouseUpdateComponent,
        resolve: {
            requestExportWarehouse: RequestExportWarehouseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RequestExportWarehouses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const requestExportWarehousePopupRoute: Routes = [
    {
        path: 'request-export-warehouse/:id/delete',
        component: RequestExportWarehouseDeletePopupComponent,
        resolve: {
            requestExportWarehouse: RequestExportWarehouseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RequestExportWarehouses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

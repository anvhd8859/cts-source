import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { WarehouseTransferRequest } from 'app/shared/model/ctsmicroservice/warehouse-transfer-request.model';
import { WarehouseTransferRequestService } from './warehouse-transfer-request.service';
import { WarehouseTransferRequestComponent } from './warehouse-transfer-request.component';
import { WarehouseTransferRequestDetailComponent } from './warehouse-transfer-request-detail.component';
import { WarehouseTransferRequestUpdateComponent } from './warehouse-transfer-request-update.component';
import { WarehouseTransferRequestDeletePopupComponent } from './warehouse-transfer-request-delete-dialog.component';
import { IWarehouseTransferRequest } from 'app/shared/model/ctsmicroservice/warehouse-transfer-request.model';

@Injectable({ providedIn: 'root' })
export class WarehouseTransferRequestResolve implements Resolve<IWarehouseTransferRequest> {
    constructor(private service: WarehouseTransferRequestService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((warehouseTransferRequest: HttpResponse<WarehouseTransferRequest>) => warehouseTransferRequest.body));
        }
        return of(new WarehouseTransferRequest());
    }
}

export const warehouseTransferRequestRoute: Routes = [
    {
        path: 'warehouse-transfer-request',
        component: WarehouseTransferRequestComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WarehouseTransferRequests'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'warehouse-transfer-request/:id/view',
        component: WarehouseTransferRequestDetailComponent,
        resolve: {
            warehouseTransferRequest: WarehouseTransferRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WarehouseTransferRequests'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'warehouse-transfer-request/new',
        component: WarehouseTransferRequestUpdateComponent,
        resolve: {
            warehouseTransferRequest: WarehouseTransferRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WarehouseTransferRequests'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'warehouse-transfer-request/:id/edit',
        component: WarehouseTransferRequestUpdateComponent,
        resolve: {
            warehouseTransferRequest: WarehouseTransferRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WarehouseTransferRequests'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const warehouseTransferRequestPopupRoute: Routes = [
    {
        path: 'warehouse-transfer-request/:id/delete',
        component: WarehouseTransferRequestDeletePopupComponent,
        resolve: {
            warehouseTransferRequest: WarehouseTransferRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WarehouseTransferRequests'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

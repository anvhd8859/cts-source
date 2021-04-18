import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransferPacking } from 'app/shared/model/ctsmicroservice/transfer-packing.model';
import { TransferPackingService } from './transfer-packing.service';
import { TransferPackingComponent } from './transfer-packing.component';
import { TransferPackingDetailComponent } from './transfer-packing-detail.component';
import { TransferPackingUpdateComponent } from './transfer-packing-update.component';
import { TransferPackingDeletePopupComponent } from './transfer-packing-delete-dialog.component';
import { ITransferPacking } from 'app/shared/model/ctsmicroservice/transfer-packing.model';

@Injectable({ providedIn: 'root' })
export class TransferPackingResolve implements Resolve<ITransferPacking> {
    constructor(private service: TransferPackingService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((transferPacking: HttpResponse<TransferPacking>) => transferPacking.body));
        }
        return of(new TransferPacking());
    }
}

export const transferPackingRoute: Routes = [
    {
        path: 'transfer-packing',
        component: TransferPackingComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'TransferPackings'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transfer-packing/:id/view',
        component: TransferPackingDetailComponent,
        resolve: {
            transferPacking: TransferPackingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransferPackings'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transfer-packing/new',
        component: TransferPackingUpdateComponent,
        resolve: {
            transferPacking: TransferPackingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransferPackings'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transfer-packing/:id/edit',
        component: TransferPackingUpdateComponent,
        resolve: {
            transferPacking: TransferPackingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransferPackings'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transferPackingPopupRoute: Routes = [
    {
        path: 'transfer-packing/:id/delete',
        component: TransferPackingDeletePopupComponent,
        resolve: {
            transferPacking: TransferPackingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransferPackings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransferDetails } from 'app/shared/model/ctsmicroservice/transfer-details.model';
import { TransferDetailsService } from './transfer-details.service';
import { TransferDetailsComponent } from './transfer-details.component';
import { TransferDetailsDetailComponent } from './transfer-details-detail.component';
import { TransferDetailsUpdateComponent } from './transfer-details-update.component';
import { TransferDetailsDeletePopupComponent } from './transfer-details-delete-dialog.component';
import { ITransferDetails } from 'app/shared/model/ctsmicroservice/transfer-details.model';

@Injectable({ providedIn: 'root' })
export class TransferDetailsResolve implements Resolve<ITransferDetails> {
    constructor(private service: TransferDetailsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((transferDetails: HttpResponse<TransferDetails>) => transferDetails.body));
        }
        return of(new TransferDetails());
    }
}

export const transferDetailsRoute: Routes = [
    {
        path: 'transfer-details',
        component: TransferDetailsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'TransferDetails'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transfer-details/:id/view',
        component: TransferDetailsDetailComponent,
        resolve: {
            transferDetails: TransferDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransferDetails'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transfer-details/new',
        component: TransferDetailsUpdateComponent,
        resolve: {
            transferDetails: TransferDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransferDetails'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transfer-details/:id/edit',
        component: TransferDetailsUpdateComponent,
        resolve: {
            transferDetails: TransferDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransferDetails'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transferDetailsPopupRoute: Routes = [
    {
        path: 'transfer-details/:id/delete',
        component: TransferDetailsDeletePopupComponent,
        resolve: {
            transferDetails: TransferDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransferDetails'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

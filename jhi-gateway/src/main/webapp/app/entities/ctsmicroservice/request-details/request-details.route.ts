import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestDetails } from 'app/shared/model/ctsmicroservice/request-details.model';
import { RequestDetailsService } from './request-details.service';
import { RequestDetailsComponent } from './request-details.component';
import { RequestDetailsDetailComponent } from './request-details-detail.component';
import { RequestDetailsUpdateComponent } from './request-details-update.component';
import { RequestDetailsDeletePopupComponent } from './request-details-delete-dialog.component';
import { IRequestDetails } from 'app/shared/model/ctsmicroservice/request-details.model';

@Injectable({ providedIn: 'root' })
export class RequestDetailsResolve implements Resolve<IRequestDetails> {
    constructor(private service: RequestDetailsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((requestDetails: HttpResponse<RequestDetails>) => requestDetails.body));
        }
        return of(new RequestDetails());
    }
}

export const requestDetailsRoute: Routes = [
    {
        path: 'request-details',
        component: RequestDetailsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RequestDetails'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'request-details/:id/view',
        component: RequestDetailsDetailComponent,
        resolve: {
            requestDetails: RequestDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RequestDetails'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'request-details/new',
        component: RequestDetailsUpdateComponent,
        resolve: {
            requestDetails: RequestDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RequestDetails'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'request-details/:id/edit',
        component: RequestDetailsUpdateComponent,
        resolve: {
            requestDetails: RequestDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RequestDetails'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const requestDetailsPopupRoute: Routes = [
    {
        path: 'request-details/:id/delete',
        component: RequestDetailsDeletePopupComponent,
        resolve: {
            requestDetails: RequestDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RequestDetails'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

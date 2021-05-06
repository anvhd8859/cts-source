import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReceiptImage } from 'app/shared/model/ctsmicroservice/receipt-image.model';
import { ReceiptImageService } from './receipt-image.service';
import { ReceiptImageComponent } from './receipt-image.component';
import { ReceiptImageDetailComponent } from './receipt-image-detail.component';
import { ReceiptImageUpdateComponent } from './receipt-image-update.component';
import { ReceiptImageDeletePopupComponent } from './receipt-image-delete-dialog.component';
import { IReceiptImage } from 'app/shared/model/ctsmicroservice/receipt-image.model';

@Injectable({ providedIn: 'root' })
export class ReceiptImageResolve implements Resolve<IReceiptImage> {
    constructor(private service: ReceiptImageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((receiptImage: HttpResponse<ReceiptImage>) => receiptImage.body));
        }
        return of(new ReceiptImage());
    }
}

export const receiptImageRoute: Routes = [
    {
        path: 'receipt-image',
        component: ReceiptImageComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReceiptImages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receipt-image/:id/view',
        component: ReceiptImageDetailComponent,
        resolve: {
            receiptImage: ReceiptImageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReceiptImages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receipt-image/new',
        component: ReceiptImageUpdateComponent,
        resolve: {
            receiptImage: ReceiptImageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReceiptImages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receipt-image/:id/edit',
        component: ReceiptImageUpdateComponent,
        resolve: {
            receiptImage: ReceiptImageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReceiptImages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const receiptImagePopupRoute: Routes = [
    {
        path: 'receipt-image/:id/delete',
        component: ReceiptImageDeletePopupComponent,
        resolve: {
            receiptImage: ReceiptImageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReceiptImages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

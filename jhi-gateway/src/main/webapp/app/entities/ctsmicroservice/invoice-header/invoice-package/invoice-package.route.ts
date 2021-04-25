import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';
import { InvoicePackageService } from './invoice-package.service';
import { InvoicePackageComponent } from './invoice-package.component';
import { InvoicePackageDetailComponent } from './invoice-package-detail.component';
import { InvoicePackageUpdateComponent } from './invoice-package-update.component';
import { InvoicePackageDeletePopupComponent } from './invoice-package-delete-dialog.component';
import { IInvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';

@Injectable({ providedIn: 'root' })
export class InvoicePackageResolve implements Resolve<IInvoicePackage> {
    constructor(private service: InvoicePackageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((invoicePackage: HttpResponse<InvoicePackage>) => invoicePackage.body));
        }
        return of(new InvoicePackage());
    }
}

export const invoicePackageRoute: Routes = [
    {
        path: 'invoice-package',
        component: InvoicePackageComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'InvoicePackages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'invoice-package/:id/view',
        component: InvoicePackageDetailComponent,
        resolve: {
            invoicePackage: InvoicePackageResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'InvoicePackages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'invoice-package/new',
        component: InvoicePackageUpdateComponent,
        resolve: {
            invoicePackage: InvoicePackageResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'InvoicePackages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'invoice-package/:id/edit',
        component: InvoicePackageUpdateComponent,
        resolve: {
            invoicePackage: InvoicePackageResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'InvoicePackages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invoicePackagePopupRoute: Routes = [
    {
        path: 'invoice-package/:id/delete',
        component: InvoicePackageDeletePopupComponent,
        resolve: {
            invoicePackage: InvoicePackageResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'InvoicePackages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { ExportInvoicePackageService } from './export-invoice-package.service';
import { ExportInvoicePackageComponent } from './export-invoice-package.component';
import { ExportInvoicePackageDeletePopupComponent } from './export-invoice-package-delete-dialog.component';
import { IInvoiceHeader, InvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { JhiResolvePagingParams } from 'ng-jhipster';

@Injectable({ providedIn: 'root' })
export class ExportInvoicePackageResolve implements Resolve<IInvoiceHeader> {
    constructor(private service: ExportInvoicePackageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return of((new InvoiceHeader().id = id));
        }
        return of(new InvoiceHeader());
    }
}

export const exportInvoicePackageRoute: Routes = [
    {
        path: 'export-invoice-package',
        component: ExportInvoicePackageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_KEEPER', 'ROLE_ADMIN'],
            pageTitle: 'CTS: Quản lý xuất kho'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const exportInvoicePackagePopupRoute: Routes = [
    {
        path: 'export-invoice-package/:id/export',
        component: ExportInvoicePackageDeletePopupComponent,
        resolve: {
            exportInvoicePackage: ExportInvoicePackageResolve
        },
        data: {
            authorities: ['ROLE_KEEPER', 'ROLE_ADMIN'],
            pageTitle: 'CTS: Quản lý xuất kho'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExportInvoicePackage } from 'app/shared/model/ctsmicroservice/export-invoice-package.model';
import { ExportInvoicePackageService } from './export-invoice-package.service';
import { ExportInvoicePackageComponent } from './export-invoice-package.component';
import { ExportInvoicePackageDetailComponent } from './export-invoice-package-detail.component';
import { ExportInvoicePackageUpdateComponent } from './export-invoice-package-update.component';
import { ExportInvoicePackageDeletePopupComponent } from './export-invoice-package-delete-dialog.component';
import { IExportInvoicePackage } from 'app/shared/model/ctsmicroservice/export-invoice-package.model';

@Injectable({ providedIn: 'root' })
export class ExportInvoicePackageResolve implements Resolve<IExportInvoicePackage> {
    constructor(private service: ExportInvoicePackageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((exportInvoicePackage: HttpResponse<ExportInvoicePackage>) => exportInvoicePackage.body));
        }
        return of(new ExportInvoicePackage());
    }
}

export const exportInvoicePackageRoute: Routes = [
    {
        path: 'export-invoice-package',
        component: ExportInvoicePackageComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExportInvoicePackages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'export-invoice-package/:id/view',
        component: ExportInvoicePackageDetailComponent,
        resolve: {
            exportInvoicePackage: ExportInvoicePackageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExportInvoicePackages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'export-invoice-package/new',
        component: ExportInvoicePackageUpdateComponent,
        resolve: {
            exportInvoicePackage: ExportInvoicePackageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExportInvoicePackages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'export-invoice-package/:id/edit',
        component: ExportInvoicePackageUpdateComponent,
        resolve: {
            exportInvoicePackage: ExportInvoicePackageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExportInvoicePackages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const exportInvoicePackagePopupRoute: Routes = [
    {
        path: 'export-invoice-package/:id/delete',
        component: ExportInvoicePackageDeletePopupComponent,
        resolve: {
            exportInvoicePackage: ExportInvoicePackageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExportInvoicePackages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

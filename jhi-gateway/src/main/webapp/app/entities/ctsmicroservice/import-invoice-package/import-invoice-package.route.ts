import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImportInvoicePackage } from 'app/shared/model/ctsmicroservice/import-invoice-package.model';
import { ImportInvoicePackageService } from './import-invoice-package.service';
import { ImportInvoicePackageComponent } from './import-invoice-package.component';
import { ImportInvoicePackageDetailComponent } from './import-invoice-package-detail.component';
import { ImportInvoicePackageUpdateComponent } from './import-invoice-package-update.component';
import { ImportInvoicePackageDeletePopupComponent } from './import-invoice-package-delete-dialog.component';
import { IImportInvoicePackage } from 'app/shared/model/ctsmicroservice/import-invoice-package.model';

@Injectable({ providedIn: 'root' })
export class ImportInvoicePackageResolve implements Resolve<IImportInvoicePackage> {
    constructor(private service: ImportInvoicePackageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((importInvoicePackage: HttpResponse<ImportInvoicePackage>) => importInvoicePackage.body));
        }
        return of(new ImportInvoicePackage());
    }
}

export const importInvoicePackageRoute: Routes = [
    {
        path: 'import-invoice-package',
        component: ImportInvoicePackageComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ImportInvoicePackages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'import-invoice-package/:id/view',
        component: ImportInvoicePackageDetailComponent,
        resolve: {
            importInvoicePackage: ImportInvoicePackageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ImportInvoicePackages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'import-invoice-package/new',
        component: ImportInvoicePackageUpdateComponent,
        resolve: {
            importInvoicePackage: ImportInvoicePackageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ImportInvoicePackages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'import-invoice-package/:id/edit',
        component: ImportInvoicePackageUpdateComponent,
        resolve: {
            importInvoicePackage: ImportInvoicePackageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ImportInvoicePackages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const importInvoicePackagePopupRoute: Routes = [
    {
        path: 'import-invoice-package/:id/delete',
        component: ImportInvoicePackageDeletePopupComponent,
        resolve: {
            importInvoicePackage: ImportInvoicePackageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ImportInvoicePackages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

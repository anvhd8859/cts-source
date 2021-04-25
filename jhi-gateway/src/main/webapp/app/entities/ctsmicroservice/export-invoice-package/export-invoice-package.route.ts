import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
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
            return this.service.find(id).pipe(map((invoice: HttpResponse<InvoiceHeader>) => invoice.body));
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
            pageTitle: 'ExportInvoicePackages'
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
            pageTitle: 'ExportInvoicePackages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

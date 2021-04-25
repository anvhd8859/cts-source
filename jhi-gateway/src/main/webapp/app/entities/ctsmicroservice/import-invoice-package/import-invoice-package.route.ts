import { IInvoiceHeader } from './../../../shared/model/ctsmicroservice/invoice-header.model';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { ImportInvoicePackageService } from './import-invoice-package.service';
import { ImportInvoicePackageComponent } from './import-invoice-package.component';
import { ImportInvoicePackageImportPopupComponent } from './import-invoice-package-import-dialog.component';
import { InvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { map } from 'rxjs/operators';
import { JhiResolvePagingParams } from 'ng-jhipster';

@Injectable({ providedIn: 'root' })
export class ImportInvoicePackageResolve implements Resolve<IInvoiceHeader> {
    constructor(private service: ImportInvoicePackageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((invoice: HttpResponse<InvoiceHeader>) => invoice.body));
        }
        return of(new InvoiceHeader());
    }
}

export const importInvoicePackageRoute: Routes = [
    {
        path: 'import-invoice-package',
        component: ImportInvoicePackageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
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
        path: 'import-invoice-package/:id/import',
        component: ImportInvoicePackageImportPopupComponent,
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

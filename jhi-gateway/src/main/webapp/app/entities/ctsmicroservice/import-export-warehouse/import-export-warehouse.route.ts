import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImportExportWarehouse } from 'app/shared/model/ctsmicroservice/import-export-warehouse.model';
import { ImportExportWarehouseService } from './import-export-warehouse.service';
import { ImportExportWarehouseComponent } from './import-export-warehouse.component';
import { ImportExportWarehouseDetailComponent } from './import-export-warehouse-detail.component';
import { ImportExportWarehouseUpdateComponent } from './import-export-warehouse-update.component';
import { ImportExportWarehouseDeletePopupComponent } from './import-export-warehouse-delete-dialog.component';
import { IImportExportWarehouse } from 'app/shared/model/ctsmicroservice/import-export-warehouse.model';

@Injectable({ providedIn: 'root' })
export class ImportExportWarehouseResolve implements Resolve<IImportExportWarehouse> {
    constructor(private service: ImportExportWarehouseService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((importExportWarehouse: HttpResponse<ImportExportWarehouse>) => importExportWarehouse.body));
        }
        return of(new ImportExportWarehouse());
    }
}

export const importExportWarehouseRoute: Routes = [
    {
        path: 'import-export-warehouse',
        component: ImportExportWarehouseComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'ImportExportWarehouses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'import-export-warehouse/:id/view',
        component: ImportExportWarehouseDetailComponent,
        resolve: {
            importExportWarehouse: ImportExportWarehouseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ImportExportWarehouses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'import-export-warehouse/new',
        component: ImportExportWarehouseUpdateComponent,
        resolve: {
            importExportWarehouse: ImportExportWarehouseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ImportExportWarehouses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'import-export-warehouse/:id/edit',
        component: ImportExportWarehouseUpdateComponent,
        resolve: {
            importExportWarehouse: ImportExportWarehouseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ImportExportWarehouses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const importExportWarehousePopupRoute: Routes = [
    {
        path: 'import-export-warehouse/:id/delete',
        component: ImportExportWarehouseDeletePopupComponent,
        resolve: {
            importExportWarehouse: ImportExportWarehouseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ImportExportWarehouses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

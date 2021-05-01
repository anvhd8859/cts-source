import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { WorkingArea } from 'app/shared/model/ctsmicroservice/working-area.model';
import { WorkingAreaService } from './working-area.service';
import { WorkingAreaComponent } from './working-area.component';
import { WorkingAreaDetailComponent } from './working-area-detail.component';
import { WorkingAreaUpdateComponent } from './working-area-update.component';
import { WorkingAreaDeletePopupComponent } from './working-area-delete-dialog.component';
import { IWorkingArea } from 'app/shared/model/ctsmicroservice/working-area.model';
import { JhiResolvePagingParams } from 'ng-jhipster';

@Injectable({ providedIn: 'root' })
export class WorkingAreaResolve implements Resolve<IWorkingArea> {
    constructor(private service: WorkingAreaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((workingArea: HttpResponse<WorkingArea>) => workingArea.body));
        }
        return of(new WorkingArea());
    }
}

export const workingAreaRoute: Routes = [
    {
        path: 'working-area',
        component: WorkingAreaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'CTS: Quản lý khi vực làm việc'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'working-area/:id/view',
        component: WorkingAreaDetailComponent,
        resolve: {
            workingArea: WorkingAreaResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'CTS: Chi tiết khu vực làm việc'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'working-area/new',
        component: WorkingAreaUpdateComponent,
        resolve: {
            workingArea: WorkingAreaResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'CTS: Tạo một khu vực làm việc mới'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'working-area/:id/edit',
        component: WorkingAreaUpdateComponent,
        resolve: {
            workingArea: WorkingAreaResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'CTS: Chỉnh sửa khu vực làm việc'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const workingAreaPopupRoute: Routes = [
    {
        path: 'working-area/:id/delete',
        component: WorkingAreaDeletePopupComponent,
        resolve: {
            workingArea: WorkingAreaResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'WorkingAreas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

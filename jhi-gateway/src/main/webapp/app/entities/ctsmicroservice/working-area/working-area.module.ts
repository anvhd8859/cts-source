import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    WorkingAreaComponent,
    WorkingAreaDetailComponent,
    WorkingAreaUpdateComponent,
    WorkingAreaDeletePopupComponent,
    WorkingAreaDeleteDialogComponent,
    workingAreaRoute,
    workingAreaPopupRoute
} from './';

const ENTITY_STATES = [...workingAreaRoute, ...workingAreaPopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        WorkingAreaComponent,
        WorkingAreaDetailComponent,
        WorkingAreaUpdateComponent,
        WorkingAreaDeleteDialogComponent,
        WorkingAreaDeletePopupComponent
    ],
    entryComponents: [WorkingAreaComponent, WorkingAreaUpdateComponent, WorkingAreaDeleteDialogComponent, WorkingAreaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayWorkingAreaModule {}

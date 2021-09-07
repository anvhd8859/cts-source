import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

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
import { WorkingAreaShipperComponent } from './working-area-shipper.component';

const ENTITY_STATES = [...workingAreaRoute, ...workingAreaPopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES), NgSelectModule, FormsModule],
    declarations: [
        WorkingAreaComponent,
        WorkingAreaDetailComponent,
        WorkingAreaUpdateComponent,
        WorkingAreaDeleteDialogComponent,
        WorkingAreaDeletePopupComponent,
        WorkingAreaShipperComponent
    ],
    entryComponents: [
        WorkingAreaComponent,
        WorkingAreaUpdateComponent,
        WorkingAreaDeleteDialogComponent,
        WorkingAreaDeletePopupComponent,
        WorkingAreaShipperComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayWorkingAreaModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    OfficeComponent,
    OfficeDetailComponent,
    OfficeUpdateComponent,
    OfficeDeletePopupComponent,
    OfficeDeleteDialogComponent,
    officeRoute,
    officePopupRoute
} from './';

const ENTITY_STATES = [...officeRoute, ...officePopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES), NgSelectModule, FormsModule],
    declarations: [OfficeComponent, OfficeDetailComponent, OfficeUpdateComponent, OfficeDeleteDialogComponent, OfficeDeletePopupComponent],
    entryComponents: [OfficeComponent, OfficeUpdateComponent, OfficeDeleteDialogComponent, OfficeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayOfficeModule {}

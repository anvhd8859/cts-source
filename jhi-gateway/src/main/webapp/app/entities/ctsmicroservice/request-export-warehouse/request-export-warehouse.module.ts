import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    RequestExportWarehouseComponent,
    RequestExportWarehouseDetailComponent,
    RequestExportWarehouseUpdateComponent,
    RequestExportWarehouseDeletePopupComponent,
    RequestExportWarehouseDeleteDialogComponent,
    requestExportWarehouseRoute,
    requestExportWarehousePopupRoute,
    RequestExportModalConfirmComponent
} from './';

const ENTITY_STATES = [...requestExportWarehouseRoute, ...requestExportWarehousePopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES), NgSelectModule, FormsModule],
    declarations: [
        RequestExportWarehouseComponent,
        RequestExportWarehouseDetailComponent,
        RequestExportWarehouseUpdateComponent,
        RequestExportWarehouseDeleteDialogComponent,
        RequestExportWarehouseDeletePopupComponent,
        RequestExportModalConfirmComponent
    ],
    entryComponents: [
        RequestExportWarehouseComponent,
        RequestExportWarehouseUpdateComponent,
        RequestExportWarehouseDeleteDialogComponent,
        RequestExportWarehouseDeletePopupComponent,
        RequestExportModalConfirmComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayRequestExportWarehouseModule {}

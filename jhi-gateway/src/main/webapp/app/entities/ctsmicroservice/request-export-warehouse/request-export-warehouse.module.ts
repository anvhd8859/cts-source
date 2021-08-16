import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

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
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
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

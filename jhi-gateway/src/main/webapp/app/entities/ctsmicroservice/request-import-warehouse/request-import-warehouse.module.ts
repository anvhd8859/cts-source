import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    RequestImportWarehouseComponent,
    RequestImportWarehouseDetailComponent,
    RequestImportWarehouseUpdateComponent,
    RequestImportWarehouseDeletePopupComponent,
    RequestImportWarehouseDeleteDialogComponent,
    requestImportWarehouseRoute,
    requestImportWarehousePopupRoute
} from './';

const ENTITY_STATES = [...requestImportWarehouseRoute, ...requestImportWarehousePopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RequestImportWarehouseComponent,
        RequestImportWarehouseDetailComponent,
        RequestImportWarehouseUpdateComponent,
        RequestImportWarehouseDeleteDialogComponent,
        RequestImportWarehouseDeletePopupComponent
    ],
    entryComponents: [
        RequestImportWarehouseComponent,
        RequestImportWarehouseUpdateComponent,
        RequestImportWarehouseDeleteDialogComponent,
        RequestImportWarehouseDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayRequestImportWarehouseModule {}

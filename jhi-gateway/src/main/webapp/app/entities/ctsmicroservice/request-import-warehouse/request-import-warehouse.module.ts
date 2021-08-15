import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    RequestImportWarehouseComponent,
    RequestImportWarehouseDetailComponent,
    RequestImportWarehouseShipperUpdateComponent,
    RequestImportWarehouseDeletePopupComponent,
    RequestImportWarehouseDeleteDialogComponent,
    requestImportWarehouseRoute,
    requestImportWarehousePopupRoute,
    RequestImportModalConfirmComponent,
    RequestImportWarehouseOfficerUpdateComponent
} from './';

const ENTITY_STATES = [...requestImportWarehouseRoute, ...requestImportWarehousePopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RequestImportWarehouseComponent,
        RequestImportWarehouseDetailComponent,
        RequestImportWarehouseShipperUpdateComponent,
        RequestImportWarehouseOfficerUpdateComponent,
        RequestImportWarehouseDeleteDialogComponent,
        RequestImportWarehouseDeletePopupComponent,
        RequestImportModalConfirmComponent
    ],
    entryComponents: [
        RequestImportWarehouseComponent,
        RequestImportWarehouseShipperUpdateComponent,
        RequestImportWarehouseOfficerUpdateComponent,
        RequestImportWarehouseDeleteDialogComponent,
        RequestImportWarehouseDeletePopupComponent,
        RequestImportModalConfirmComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayRequestImportWarehouseModule {}

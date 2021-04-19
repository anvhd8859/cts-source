import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    WarehouseComponent,
    WarehouseDetailComponent,
    WarehouseUpdateComponent,
    WarehouseDeletePopupComponent,
    WarehouseDeleteDialogComponent,
    warehouseRoute,
    warehousePopupRoute
} from './';

const ENTITY_STATES = [...warehouseRoute, ...warehousePopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        WarehouseComponent,
        WarehouseDetailComponent,
        WarehouseUpdateComponent,
        WarehouseDeleteDialogComponent,
        WarehouseDeletePopupComponent
    ],
    entryComponents: [WarehouseComponent, WarehouseUpdateComponent, WarehouseDeleteDialogComponent, WarehouseDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayWarehouseModule {}

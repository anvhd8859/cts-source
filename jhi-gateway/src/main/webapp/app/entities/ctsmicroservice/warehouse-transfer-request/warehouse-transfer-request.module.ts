import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    WarehouseTransferRequestComponent,
    WarehouseTransferRequestDetailComponent,
    WarehouseTransferRequestUpdateComponent,
    WarehouseTransferRequestDeletePopupComponent,
    WarehouseTransferRequestDeleteDialogComponent,
    warehouseTransferRequestRoute,
    warehouseTransferRequestPopupRoute,
    WarehouseTransferConfirmModalComponent
} from './';

const ENTITY_STATES = [...warehouseTransferRequestRoute, ...warehouseTransferRequestPopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        WarehouseTransferRequestComponent,
        WarehouseTransferRequestDetailComponent,
        WarehouseTransferRequestUpdateComponent,
        WarehouseTransferRequestDeleteDialogComponent,
        WarehouseTransferRequestDeletePopupComponent,
        WarehouseTransferConfirmModalComponent
    ],
    entryComponents: [
        WarehouseTransferRequestComponent,
        WarehouseTransferRequestUpdateComponent,
        WarehouseTransferRequestDeleteDialogComponent,
        WarehouseTransferRequestDeletePopupComponent,
        WarehouseTransferConfirmModalComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayWarehouseTransferRequestModule {}

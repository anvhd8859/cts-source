import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

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
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES), NgSelectModule, FormsModule],
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

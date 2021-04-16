import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    TransferPackingComponent,
    TransferPackingDetailComponent,
    TransferPackingUpdateComponent,
    TransferPackingDeletePopupComponent,
    TransferPackingDeleteDialogComponent,
    transferPackingRoute,
    transferPackingPopupRoute
} from './';

const ENTITY_STATES = [...transferPackingRoute, ...transferPackingPopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TransferPackingComponent,
        TransferPackingDetailComponent,
        TransferPackingUpdateComponent,
        TransferPackingDeleteDialogComponent,
        TransferPackingDeletePopupComponent
    ],
    entryComponents: [
        TransferPackingComponent,
        TransferPackingUpdateComponent,
        TransferPackingDeleteDialogComponent,
        TransferPackingDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayTransferPackingModule {}

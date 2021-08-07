import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    TransferDetailsComponent,
    TransferDetailsDetailComponent,
    TransferDetailsUpdateComponent,
    TransferDetailsDeletePopupComponent,
    TransferDetailsDeleteDialogComponent,
    transferDetailsRoute,
    transferDetailsPopupRoute
} from './';

const ENTITY_STATES = [...transferDetailsRoute, ...transferDetailsPopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TransferDetailsComponent,
        TransferDetailsDetailComponent,
        TransferDetailsUpdateComponent,
        TransferDetailsDeleteDialogComponent,
        TransferDetailsDeletePopupComponent
    ],
    entryComponents: [
        TransferDetailsComponent,
        TransferDetailsUpdateComponent,
        TransferDetailsDeleteDialogComponent,
        TransferDetailsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayTransferDetailsModule {}

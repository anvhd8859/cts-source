import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    ReceiptImageComponent,
    ReceiptImageDetailComponent,
    ReceiptImageUpdateComponent,
    ReceiptImageDeletePopupComponent,
    ReceiptImageDeleteDialogComponent,
    receiptImageRoute,
    receiptImagePopupRoute
} from './';

const ENTITY_STATES = [...receiptImageRoute, ...receiptImagePopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReceiptImageComponent,
        ReceiptImageDetailComponent,
        ReceiptImageUpdateComponent,
        ReceiptImageDeleteDialogComponent,
        ReceiptImageDeletePopupComponent
    ],
    entryComponents: [
        ReceiptImageComponent,
        ReceiptImageUpdateComponent,
        ReceiptImageDeleteDialogComponent,
        ReceiptImageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayReceiptImageModule {}

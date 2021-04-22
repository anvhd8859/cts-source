import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    ConfirmReceiptNoteComponent,
    ConfirmReceiptNoteDetailComponent,
    ConfirmReceiptNoteUpdateComponent,
    ConfirmReceiptNoteDeletePopupComponent,
    ConfirmReceiptNoteDeleteDialogComponent,
    confirmReceiptNoteRoute,
    confirmReceiptNotePopupRoute,
    ConfirmReceiptNoteDialogComponent,
    ConfirmReceiptNotePopupComponent
} from './';

const ENTITY_STATES = [...confirmReceiptNoteRoute, ...confirmReceiptNotePopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ConfirmReceiptNoteComponent,
        ConfirmReceiptNoteDetailComponent,
        ConfirmReceiptNoteUpdateComponent,
        ConfirmReceiptNoteDeleteDialogComponent,
        ConfirmReceiptNoteDeletePopupComponent,
        ConfirmReceiptNoteDialogComponent,
        ConfirmReceiptNotePopupComponent
    ],
    entryComponents: [
        ConfirmReceiptNoteComponent,
        ConfirmReceiptNoteUpdateComponent,
        ConfirmReceiptNoteDeleteDialogComponent,
        ConfirmReceiptNoteDeletePopupComponent,
        ConfirmReceiptNoteDialogComponent,
        ConfirmReceiptNotePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayConfirmReceiptNoteModule {}

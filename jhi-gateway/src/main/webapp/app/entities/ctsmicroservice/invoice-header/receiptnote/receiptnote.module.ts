import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    ReceiptnoteComponent,
    ReceiptnoteUserComponent,
    ReceiptnoteDetailComponent,
    ReceiptnoteUpdateComponent,
    ReceiptnoteDeletePopupComponent,
    ReceiptnoteDeleteDialogComponent,
    receiptnoteRoute,
    receiptnotePopupRoute,
    ReceiptnoteConfirmPopupComponent,
    ReceiptnoteConfirmDialogComponent
} from './';

const ENTITY_STATES = [...receiptnoteRoute, ...receiptnotePopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES), NgSelectModule, FormsModule],
    declarations: [
        ReceiptnoteComponent,
        ReceiptnoteUserComponent,
        ReceiptnoteDetailComponent,
        ReceiptnoteUpdateComponent,
        ReceiptnoteDeleteDialogComponent,
        ReceiptnoteDeletePopupComponent,
        ReceiptnoteConfirmDialogComponent,
        ReceiptnoteConfirmPopupComponent
    ],
    entryComponents: [
        ReceiptnoteComponent,
        ReceiptnoteUserComponent,
        ReceiptnoteUpdateComponent,
        ReceiptnoteDeleteDialogComponent,
        ReceiptnoteDeletePopupComponent,
        ReceiptnoteConfirmDialogComponent,
        ReceiptnoteConfirmPopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayReceiptnoteModule {}

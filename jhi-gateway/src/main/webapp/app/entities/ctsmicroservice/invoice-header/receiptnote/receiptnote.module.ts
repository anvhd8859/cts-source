import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    ReceiptnoteComponent,
    ReceiptnoteDetailComponent,
    ReceiptnoteUpdateComponent,
    ReceiptnoteDeletePopupComponent,
    ReceiptnoteDeleteDialogComponent,
    receiptnoteRoute,
    receiptnotePopupRoute
} from './';

const ENTITY_STATES = [...receiptnoteRoute, ...receiptnotePopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReceiptnoteComponent,
        ReceiptnoteDetailComponent,
        ReceiptnoteUpdateComponent,
        ReceiptnoteDeleteDialogComponent,
        ReceiptnoteDeletePopupComponent
    ],
    entryComponents: [ReceiptnoteComponent, ReceiptnoteUpdateComponent, ReceiptnoteDeleteDialogComponent, ReceiptnoteDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayReceiptnoteModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    RequestDetailsComponent,
    RequestDetailsDetailComponent,
    RequestDetailsUpdateComponent,
    RequestDetailsDeletePopupComponent,
    RequestDetailsDeleteDialogComponent,
    requestDetailsRoute,
    requestDetailsPopupRoute
} from './';

const ENTITY_STATES = [...requestDetailsRoute, ...requestDetailsPopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RequestDetailsComponent,
        RequestDetailsDetailComponent,
        RequestDetailsUpdateComponent,
        RequestDetailsDeleteDialogComponent,
        RequestDetailsDeletePopupComponent
    ],
    entryComponents: [
        RequestDetailsComponent,
        RequestDetailsUpdateComponent,
        RequestDetailsDeleteDialogComponent,
        RequestDetailsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayRequestDetailsModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    StreetComponent,
    StreetDetailComponent,
    StreetUpdateComponent,
    StreetDeletePopupComponent,
    StreetDeleteDialogComponent,
    streetRoute,
    streetPopupRoute
} from './';

const ENTITY_STATES = [...streetRoute, ...streetPopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [StreetComponent, StreetDetailComponent, StreetUpdateComponent, StreetDeleteDialogComponent, StreetDeletePopupComponent],
    entryComponents: [StreetComponent, StreetUpdateComponent, StreetDeleteDialogComponent, StreetDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayStreetModule {}

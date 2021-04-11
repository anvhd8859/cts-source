import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    SubDistrictComponent,
    SubDistrictDetailComponent,
    SubDistrictUpdateComponent,
    SubDistrictDeletePopupComponent,
    SubDistrictDeleteDialogComponent,
    subDistrictRoute,
    subDistrictPopupRoute
} from './';

const ENTITY_STATES = [...subDistrictRoute, ...subDistrictPopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SubDistrictComponent,
        SubDistrictDetailComponent,
        SubDistrictUpdateComponent,
        SubDistrictDeleteDialogComponent,
        SubDistrictDeletePopupComponent
    ],
    entryComponents: [SubDistrictComponent, SubDistrictUpdateComponent, SubDistrictDeleteDialogComponent, SubDistrictDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewaySubDistrictModule {}

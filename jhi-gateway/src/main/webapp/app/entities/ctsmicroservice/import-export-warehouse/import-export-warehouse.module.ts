import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    ImportExportWarehouseComponent,
    ImportExportWarehouseDetailComponent,
    ImportExportWarehouseUpdateComponent,
    ImportExportWarehouseDeletePopupComponent,
    ImportExportWarehouseDeleteDialogComponent,
    importExportWarehouseRoute,
    importExportWarehousePopupRoute
} from './';

const ENTITY_STATES = [...importExportWarehouseRoute, ...importExportWarehousePopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ImportExportWarehouseComponent,
        ImportExportWarehouseDetailComponent,
        ImportExportWarehouseUpdateComponent,
        ImportExportWarehouseDeleteDialogComponent,
        ImportExportWarehouseDeletePopupComponent
    ],
    entryComponents: [
        ImportExportWarehouseComponent,
        ImportExportWarehouseUpdateComponent,
        ImportExportWarehouseDeleteDialogComponent,
        ImportExportWarehouseDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayImportExportWarehouseModule {}

import { ImportExportWarehouseShipperDetailComponent } from './import-export-warehouse-shipper-detail.component';
import { ImportExportWarehouseShipperComponent } from './import-export-warehouse-shipper.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

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
import { NgbdModalConfirmComponent } from './import-export-warehouse-detail.component';

const ENTITY_STATES = [...importExportWarehouseRoute, ...importExportWarehousePopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES), NgSelectModule, FormsModule],
    declarations: [
        ImportExportWarehouseComponent,
        ImportExportWarehouseDetailComponent,
        ImportExportWarehouseUpdateComponent,
        ImportExportWarehouseDeleteDialogComponent,
        ImportExportWarehouseDeletePopupComponent,
        NgbdModalConfirmComponent,
        ImportExportWarehouseShipperComponent,
        ImportExportWarehouseShipperDetailComponent
    ],
    entryComponents: [
        ImportExportWarehouseComponent,
        ImportExportWarehouseUpdateComponent,
        ImportExportWarehouseDeleteDialogComponent,
        ImportExportWarehouseDeletePopupComponent,
        NgbdModalConfirmComponent,
        ImportExportWarehouseShipperComponent,
        ImportExportWarehouseShipperDetailComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayImportExportWarehouseModule {}

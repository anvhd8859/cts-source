import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    ExportInvoicePackageComponent,
    ExportInvoicePackageDetailComponent,
    ExportInvoicePackageUpdateComponent,
    ExportInvoicePackageDeletePopupComponent,
    ExportInvoicePackageDeleteDialogComponent,
    exportInvoicePackageRoute,
    exportInvoicePackagePopupRoute,
    ExportInvoiceModalWarningComponent
} from './';

const ENTITY_STATES = [...exportInvoicePackageRoute, ...exportInvoicePackagePopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES), NgSelectModule, FormsModule],
    declarations: [
        ExportInvoicePackageComponent,
        ExportInvoicePackageDetailComponent,
        ExportInvoicePackageUpdateComponent,
        ExportInvoicePackageDeleteDialogComponent,
        ExportInvoicePackageDeletePopupComponent,
        ExportInvoiceModalWarningComponent
    ],
    entryComponents: [
        ExportInvoicePackageComponent,
        ExportInvoicePackageUpdateComponent,
        ExportInvoicePackageDeleteDialogComponent,
        ExportInvoicePackageDeletePopupComponent,
        ExportInvoiceModalWarningComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayExportInvoicePackageModule {}

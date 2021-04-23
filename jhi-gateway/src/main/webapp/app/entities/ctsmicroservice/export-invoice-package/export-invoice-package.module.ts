import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    ExportInvoicePackageComponent,
    ExportInvoicePackageDetailComponent,
    ExportInvoicePackageUpdateComponent,
    ExportInvoicePackageDeletePopupComponent,
    ExportInvoicePackageDeleteDialogComponent,
    exportInvoicePackageRoute,
    exportInvoicePackagePopupRoute
} from './';

const ENTITY_STATES = [...exportInvoicePackageRoute, ...exportInvoicePackagePopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ExportInvoicePackageComponent,
        ExportInvoicePackageDetailComponent,
        ExportInvoicePackageUpdateComponent,
        ExportInvoicePackageDeleteDialogComponent,
        ExportInvoicePackageDeletePopupComponent
    ],
    entryComponents: [
        ExportInvoicePackageComponent,
        ExportInvoicePackageUpdateComponent,
        ExportInvoicePackageDeleteDialogComponent,
        ExportInvoicePackageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayExportInvoicePackageModule {}

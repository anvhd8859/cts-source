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
import { ExportModalWarningComponent } from './export-invoice-package.component';

const ENTITY_STATES = [...exportInvoicePackageRoute, ...exportInvoicePackagePopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES), NgSelectModule, FormsModule],
    declarations: [
        ExportInvoicePackageComponent,
        ExportInvoicePackageDetailComponent,
        ExportInvoicePackageUpdateComponent,
        ExportInvoicePackageDeleteDialogComponent,
        ExportInvoicePackageDeletePopupComponent,
        ExportInvoiceModalWarningComponent,
        ExportModalWarningComponent
    ],
    entryComponents: [
        ExportInvoicePackageComponent,
        ExportInvoicePackageUpdateComponent,
        ExportInvoicePackageDeleteDialogComponent,
        ExportInvoicePackageDeletePopupComponent,
        ExportInvoiceModalWarningComponent,
        ExportModalWarningComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayExportInvoicePackageModule {}

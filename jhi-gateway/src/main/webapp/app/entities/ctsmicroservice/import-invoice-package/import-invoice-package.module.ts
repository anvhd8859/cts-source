import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    ImportInvoicePackageComponent,
    importInvoicePackageRoute,
    importInvoicePackagePopupRoute,
    ImportInvoicePackageImportPopupComponent,
    ImportInvoicePackageImportDialogComponent
} from './';

const ENTITY_STATES = [...importInvoicePackageRoute, ...importInvoicePackagePopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ImportInvoicePackageComponent, ImportInvoicePackageImportDialogComponent, ImportInvoicePackageImportPopupComponent],
    entryComponents: [ImportInvoicePackageComponent, ImportInvoicePackageImportDialogComponent, ImportInvoicePackageImportPopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayImportInvoicePackageModule {}

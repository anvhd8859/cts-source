import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    ImportInvoicePackageComponent,
    ImportInvoicePackageDetailComponent,
    ImportInvoicePackageUpdateComponent,
    ImportInvoicePackageDeletePopupComponent,
    ImportInvoicePackageDeleteDialogComponent,
    importInvoicePackageRoute,
    importInvoicePackagePopupRoute
} from './';

const ENTITY_STATES = [...importInvoicePackageRoute, ...importInvoicePackagePopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ImportInvoicePackageComponent,
        ImportInvoicePackageDetailComponent,
        ImportInvoicePackageUpdateComponent,
        ImportInvoicePackageDeleteDialogComponent,
        ImportInvoicePackageDeletePopupComponent
    ],
    entryComponents: [
        ImportInvoicePackageComponent,
        ImportInvoicePackageUpdateComponent,
        ImportInvoicePackageDeleteDialogComponent,
        ImportInvoicePackageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayImportInvoicePackageModule {}

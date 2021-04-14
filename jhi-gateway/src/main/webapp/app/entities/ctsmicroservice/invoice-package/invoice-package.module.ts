import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    InvoicePackageComponent,
    InvoicePackageDetailComponent,
    InvoicePackageUpdateComponent,
    InvoicePackageDeletePopupComponent,
    InvoicePackageDeleteDialogComponent,
    invoicePackageRoute,
    invoicePackagePopupRoute
} from './';

const ENTITY_STATES = [...invoicePackageRoute, ...invoicePackagePopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InvoicePackageComponent,
        InvoicePackageDetailComponent,
        InvoicePackageUpdateComponent,
        InvoicePackageDeleteDialogComponent,
        InvoicePackageDeletePopupComponent
    ],
    entryComponents: [
        InvoicePackageComponent,
        InvoicePackageUpdateComponent,
        InvoicePackageDeleteDialogComponent,
        InvoicePackageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayInvoicePackageModule {}

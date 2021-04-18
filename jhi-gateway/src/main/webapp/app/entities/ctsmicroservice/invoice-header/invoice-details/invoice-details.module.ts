import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    InvoiceDetailsComponent,
    InvoiceDetailsDetailComponent,
    InvoiceDetailsUpdateComponent,
    InvoiceDetailsDeletePopupComponent,
    InvoiceDetailsDeleteDialogComponent,
    invoiceDetailsRoute,
    invoiceDetailsPopupRoute
} from './';

const ENTITY_STATES = [...invoiceDetailsRoute, ...invoiceDetailsPopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InvoiceDetailsComponent,
        InvoiceDetailsDetailComponent,
        InvoiceDetailsUpdateComponent,
        InvoiceDetailsDeleteDialogComponent,
        InvoiceDetailsDeletePopupComponent
    ],
    entryComponents: [
        InvoiceDetailsComponent,
        InvoiceDetailsUpdateComponent,
        InvoiceDetailsDeleteDialogComponent,
        InvoiceDetailsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayInvoiceDetailsModule {}

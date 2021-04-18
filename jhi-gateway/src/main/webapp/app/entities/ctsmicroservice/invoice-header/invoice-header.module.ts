import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    InvoiceHeaderComponent,
    InvoiceHeaderDetailComponent,
    InvoiceHeaderUpdateComponent,
    InvoiceHeaderDeletePopupComponent,
    InvoiceHeaderDeleteDialogComponent,
    invoiceHeaderRoute,
    invoiceHeaderPopupRoute,
    InvoiceHeaderUserUpdateComponent
} from './';

const ENTITY_STATES = [...invoiceHeaderRoute, ...invoiceHeaderPopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES), NgSelectModule, FormsModule],
    declarations: [
        InvoiceHeaderComponent,
        InvoiceHeaderDetailComponent,
        InvoiceHeaderUpdateComponent,
        InvoiceHeaderUserUpdateComponent,
        InvoiceHeaderDeleteDialogComponent,
        InvoiceHeaderDeletePopupComponent
    ],
    entryComponents: [
        InvoiceHeaderComponent,
        InvoiceHeaderUpdateComponent,
        InvoiceHeaderUserUpdateComponent,
        InvoiceHeaderDeleteDialogComponent,
        InvoiceHeaderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayInvoiceHeaderModule {}

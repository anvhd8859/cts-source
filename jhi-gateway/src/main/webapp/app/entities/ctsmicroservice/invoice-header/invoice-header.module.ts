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
    InvoiceHeaderFinishDialogComponent,
    invoiceHeaderRoute,
    invoiceHeaderPopupRoute,
    InvoiceHeaderUserUpdateComponent,
    InvoiceHeaderUserComponent,
    InvoiceHeaderFinishPopupComponent,
    InvoiceHeaderBanItemDialogComponent
} from './';
import { InvoiceHeaderConfirmComponent } from './invoice-header-confirm-modal.component';
import { InvoiceHeaderPricingDialogComponent, InvoiceHeaderPricingPopupComponent } from './invoice-header-pricing-dialog.component';
import { InvoiceHeaderReviewComponent } from './invoice-header-review.component';

const ENTITY_STATES = [...invoiceHeaderRoute, ...invoiceHeaderPopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES), NgSelectModule, FormsModule],
    declarations: [
        InvoiceHeaderComponent,
        InvoiceHeaderDetailComponent,
        InvoiceHeaderUpdateComponent,
        InvoiceHeaderUserUpdateComponent,
        InvoiceHeaderUserComponent,
        InvoiceHeaderDeleteDialogComponent,
        InvoiceHeaderDeletePopupComponent,
        InvoiceHeaderFinishDialogComponent,
        InvoiceHeaderFinishPopupComponent,
        InvoiceHeaderReviewComponent,
        InvoiceHeaderConfirmComponent,
        InvoiceHeaderPricingPopupComponent,
        InvoiceHeaderPricingDialogComponent,
        InvoiceHeaderBanItemDialogComponent
    ],
    entryComponents: [
        InvoiceHeaderComponent,
        InvoiceHeaderUpdateComponent,
        InvoiceHeaderUserUpdateComponent,
        InvoiceHeaderUserComponent,
        InvoiceHeaderDeleteDialogComponent,
        InvoiceHeaderDeletePopupComponent,
        InvoiceHeaderFinishDialogComponent,
        InvoiceHeaderFinishPopupComponent,
        InvoiceHeaderReviewComponent,
        InvoiceHeaderConfirmComponent,
        InvoiceHeaderPricingPopupComponent,
        InvoiceHeaderPricingDialogComponent,
        InvoiceHeaderBanItemDialogComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayInvoiceHeaderModule {}

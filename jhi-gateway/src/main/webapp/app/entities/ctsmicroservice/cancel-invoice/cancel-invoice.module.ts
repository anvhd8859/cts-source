import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    CancelInvoiceComponent,
    CancelInvoiceDetailComponent,
    CancelInvoiceApprovePopupComponent,
    CancelInvoiceApproveDialogComponent,
    CancelInvoiceDeletePopupComponent,
    CancelInvoiceDeleteDialogComponent,
    cancelInvoiceRoute,
    cancelInvoicePopupRoute
} from './';

const ENTITY_STATES = [...cancelInvoiceRoute, ...cancelInvoicePopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CancelInvoiceComponent,
        CancelInvoiceDetailComponent,
        CancelInvoiceApprovePopupComponent,
        CancelInvoiceApproveDialogComponent,
        CancelInvoiceDeleteDialogComponent,
        CancelInvoiceDeletePopupComponent
    ],
    entryComponents: [
        CancelInvoiceComponent,
        CancelInvoiceApprovePopupComponent,
        CancelInvoiceApproveDialogComponent,
        CancelInvoiceDeleteDialogComponent,
        CancelInvoiceDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayCancelInvoiceModule {}

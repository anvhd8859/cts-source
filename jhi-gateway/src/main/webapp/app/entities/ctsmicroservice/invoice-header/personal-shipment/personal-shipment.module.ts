import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    PersonalShipmentComponent,
    PersonalShipmentDetailComponent,
    PersonalShipmentUpdateComponent,
    PersonalShipmentDeletePopupComponent,
    PersonalShipmentDeleteDialogComponent,
    personalShipmentRoute,
    personalShipmentPopupRoute,
    PersonalShipmentAdminComponent,
    PersonalShipmentAssignDialogComponent,
    PersonalShipmentAssignPopupComponent,
    PersonalShipmentCancelInvoiceRequestPopupComponent,
    PersonalShipmentCancelInvoiceRequestDialogComponent
} from './';

const ENTITY_STATES = [...personalShipmentRoute, ...personalShipmentPopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES), NgSelectModule, FormsModule],
    declarations: [
        PersonalShipmentComponent,
        PersonalShipmentDetailComponent,
        PersonalShipmentUpdateComponent,
        PersonalShipmentDeleteDialogComponent,
        PersonalShipmentDeletePopupComponent,
        PersonalShipmentAssignDialogComponent,
        PersonalShipmentAssignPopupComponent,
        PersonalShipmentAdminComponent,
        PersonalShipmentCancelInvoiceRequestDialogComponent,
        PersonalShipmentCancelInvoiceRequestPopupComponent
    ],
    entryComponents: [
        PersonalShipmentComponent,
        PersonalShipmentUpdateComponent,
        PersonalShipmentDeleteDialogComponent,
        PersonalShipmentDeletePopupComponent,
        PersonalShipmentAssignDialogComponent,
        PersonalShipmentAssignPopupComponent,
        PersonalShipmentAdminComponent,
        PersonalShipmentCancelInvoiceRequestDialogComponent,
        PersonalShipmentCancelInvoiceRequestPopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayPersonalShipmentModule {}

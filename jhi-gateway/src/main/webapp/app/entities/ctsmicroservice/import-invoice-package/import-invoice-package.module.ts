import { ImportInvoiceModalWarningComponent } from './import-invoice-modal-warning.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { CtsgatewaySharedModule } from 'app/shared';
import {
    ImportInvoicePackageComponent,
    importInvoicePackageRoute,
    importInvoicePackagePopupRoute,
    ImportInvoicePackageImportPopupComponent,
    ImportInvoicePackageImportDialogComponent
} from './';
import { ImportInvoicePackageDetailComponent } from './import-invoice-package-detail.component';
import { ImportInvoicePackageUpdateComponent } from './import-invoice-package-update.component';
import { ImportModalWarningComponent } from './import-invoice-package.component';

const ENTITY_STATES = [...importInvoicePackageRoute, ...importInvoicePackagePopupRoute];

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild(ENTITY_STATES), NgSelectModule, FormsModule],
    declarations: [
        ImportInvoicePackageComponent,
        ImportInvoicePackageImportDialogComponent,
        ImportInvoicePackageImportPopupComponent,
        ImportInvoicePackageUpdateComponent,
        ImportInvoicePackageDetailComponent,
        ImportInvoiceModalWarningComponent,
        ImportModalWarningComponent
    ],
    entryComponents: [
        ImportInvoicePackageComponent,
        ImportInvoicePackageImportDialogComponent,
        ImportInvoicePackageImportPopupComponent,
        ImportInvoicePackageUpdateComponent,
        ImportInvoicePackageDetailComponent,
        ImportInvoiceModalWarningComponent,
        ImportModalWarningComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayImportInvoicePackageModule {}

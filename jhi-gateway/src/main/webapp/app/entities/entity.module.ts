import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CtsgatewayUserProfileModule } from './user-profile/user-profile.module';
import { CtsgatewayDistrictModule as CtsmicroserviceDistrictModule } from './ctsmicroservice/district/district.module';
import { CtsgatewayProvinceModule as CtsmicroserviceProvinceModule } from './ctsmicroservice/province/province.module';
import { CtsgatewayStreetModule as CtsmicroserviceStreetModule } from './ctsmicroservice/street/street.module';
import { CtsgatewaySubDistrictModule as CtsmicroserviceSubDistrictModule } from './ctsmicroservice/sub-district/sub-district.module';
import { CtsgatewayInvoicePackageModule as CtsmicroserviceInvoicePackageModule } from './ctsmicroservice/invoice-header/invoice-package/invoice-package.module';
import { CtsgatewayInvoiceHeaderModule as CtsmicroserviceInvoiceHeaderModule } from './ctsmicroservice/invoice-header/invoice-header.module';
import { CtsgatewayInvoiceDetailsModule as CtsmicroserviceInvoiceDetailsModule } from './ctsmicroservice/invoice-header/invoice-details/invoice-details.module';
import { CtsgatewayPersonalShipmentModule as CtsmicroservicePersonalShipmentModule } from './ctsmicroservice/invoice-header/personal-shipment/personal-shipment.module';
import { CtsgatewayTransferPackingModule as CtsmicroserviceTransferPackingModule } from './ctsmicroservice/invoice-header/transfer-packing/transfer-packing.module';
import { CtsgatewayReceiptnoteModule as CtsmicroserviceReceiptnoteModule } from 'app/entities/ctsmicroservice/invoice-header/receiptnote/receiptnote.module';
import { CtsgatewayWorkingAreaModule as CtsmicroserviceWorkingAreaModule } from './ctsmicroservice/working-area/working-area.module';
import { CtsgatewayWarehouseModule as CtsmicroserviceWarehouseModule } from './ctsmicroservice/warehouse/warehouse.module';
import { CtsgatewayPaymentModule as CtsmicroservicePaymentModule } from './ctsmicroservice/payment/payment.module';
import { CtsgatewayShiftModule as CtsmicroserviceShiftModule } from './ctsmicroservice/shift/shift.module';
import { CtsgatewayCancelInvoiceModule as CtsmicroserviceCancelInvoiceModule } from './ctsmicroservice/cancel-invoice/cancel-invoice.module';
import { CtsgatewayConfirmReceiptNoteModule as CtsmicroserviceConfirmReceiptNoteModule } from './ctsmicroservice/confirm-receipt-note/confirm-receipt-note.module';
import { CtsgatewayExportInvoicePackageModule as CtsmicroserviceExportInvoicePackageModule } from './ctsmicroservice/export-invoice-package/export-invoice-package.module';
import { CtsgatewayImportInvoicePackageModule as CtsmicroserviceImportInvoicePackageModule } from './ctsmicroservice/import-invoice-package/import-invoice-package.module';
import { CtsgatewayOfficeModule as CtsmicroserviceOfficeModule } from './ctsmicroservice/office/office.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        CtsgatewayUserProfileModule,
        CtsmicroserviceDistrictModule,
        CtsmicroserviceProvinceModule,
        CtsmicroserviceStreetModule,
        CtsmicroserviceSubDistrictModule,
        CtsmicroserviceInvoicePackageModule,
        CtsmicroserviceInvoiceHeaderModule,
        CtsmicroserviceInvoiceDetailsModule,
        CtsmicroservicePersonalShipmentModule,
        CtsmicroserviceTransferPackingModule,
        CtsmicroserviceReceiptnoteModule,
        CtsmicroserviceWorkingAreaModule,
        CtsmicroserviceWarehouseModule,
        CtsmicroservicePaymentModule,
        CtsmicroserviceShiftModule,
        CtsmicroserviceCancelInvoiceModule,
        CtsmicroserviceConfirmReceiptNoteModule,
        CtsmicroserviceExportInvoicePackageModule,
        CtsmicroserviceImportInvoicePackageModule,
        CtsmicroserviceOfficeModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayEntityModule {}

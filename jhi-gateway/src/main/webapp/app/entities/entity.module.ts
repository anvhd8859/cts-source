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
import { CtsgatewayImportExportWarehouseModule as CtsmicroserviceImportExportWarehouseModule } from './ctsmicroservice/import-export-warehouse/import-export-warehouse.module';
import { CtsgatewayRequestImportWarehouseModule as CtsmicroserviceRequestImportWarehouseModule } from './ctsmicroservice/request-import-warehouse/request-import-warehouse.module';
import { CtsgatewayRequestExportWarehouseModule as CtsmicroserviceRequestExportWarehouseModule } from './ctsmicroservice/request-export-warehouse/request-export-warehouse.module';
import { CtsgatewayRequestDetailsModule as CtsmicroserviceRequestDetailsModule } from './ctsmicroservice/request-details/request-details.module';
import { CtsgatewayReceiptImageModule as CtsmicroserviceReceiptImageModule } from './ctsmicroservice/receipt-image/receipt-image.module';
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
        CtsmicroserviceImportExportWarehouseModule,
        CtsmicroserviceRequestImportWarehouseModule,
        CtsmicroserviceRequestExportWarehouseModule,
        CtsmicroserviceRequestDetailsModule,
        CtsmicroserviceReceiptImageModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayEntityModule {}

import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { IInvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';
import { IPersonalShipment } from 'app/shared/model/ctsmicroservice/personal-shipment.model';

export interface IInvoicePackageShipment {
    invoiceHeader?: IInvoiceHeader;
    personalShipment?: IPersonalShipment;
    invoicePackageList?: IInvoicePackage[];
}

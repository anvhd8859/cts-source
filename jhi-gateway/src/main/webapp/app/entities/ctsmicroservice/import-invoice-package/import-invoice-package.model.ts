import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { IInvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';
import { IPersonalShipment } from 'app/shared/model/ctsmicroservice/personal-shipment.model';

export interface IInvoicePackageShipment {
    invoiceHeader?: IInvoiceHeader;
    invoicePackageList?: IInvoicePackage[];
}

export class InvoicePackageShipment implements IInvoicePackageShipment {
    constructor(public invoiceHeader?: IInvoiceHeader, public invoicePackageList?: IInvoicePackage[]) {}
}

import { Moment } from 'moment';

export interface IInvoiceDetails {
    id?: number;
    invoiceHeaderId?: number;
    invoicePackageId?: number;
    itemName?: string;
    itemType?: string;
    weight?: number;
    height?: number;
    length?: number;
    width?: number;
    description?: string;
    originImage?: string;
    damagesImage?: string;
    createDate?: Moment;
    updateDate?: Moment;
}

export class InvoiceDetails implements IInvoiceDetails {
    constructor(
        public id?: number,
        public invoiceHeaderId?: number,
        public invoicePackageId?: number,
        public itemName?: string,
        public itemType?: string,
        public weight?: number,
        public height?: number,
        public length?: number,
        public width?: number,
        public description?: string,
        public originImage?: string,
        public damagesImage?: string,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {}
}

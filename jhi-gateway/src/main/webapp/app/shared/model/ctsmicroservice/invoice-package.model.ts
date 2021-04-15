import { Moment } from 'moment';

export interface IInvoicePackage {
    id?: number;
    invoiceHeaderId?: number;
    itemTotal?: number;
    weight?: number;
    height?: number;
    length?: number;
    width?: number;
    delivered?: boolean;
    status?: string;
    note?: string;
    warehouseId?: number;
    createDate?: Moment;
    updateDate?: Moment;
}

export class InvoicePackage implements IInvoicePackage {
    constructor(
        public id?: number,
        public invoiceHeaderId?: number,
        public itemTotal?: number,
        public weight?: number,
        public height?: number,
        public length?: number,
        public width?: number,
        public delivered?: boolean,
        public status?: string,
        public note?: string,
        public warehouseId?: number,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {
        this.delivered = this.delivered || false;
    }
}

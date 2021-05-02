import { Moment } from 'moment';

export interface IReceiptnote {
    id?: number;
    employeeId?: number;
    invoiceHeaderId?: number;
    shipmentId?: number;
    note?: string;
    imageLink?: string;
    receiptType?: boolean;
    createDate?: Moment;
    updateDate?: Moment;
}

export class Receiptnote implements IReceiptnote {
    constructor();
    constructor(
        public id?: number,
        public employeeId?: number,
        public invoiceHeaderId?: number,
        public shipmentId?: number,
        public note?: string,
        public imageLink?: string,
        public receiptType?: boolean,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {
        this.receiptType = this.receiptType || false;
    }
}

import { Moment } from 'moment';

export interface IReceiptnote {
    id?: number;
    employeeId?: number;
    invoiceHeaderId?: number;
    shipmentId?: number;
    note?: string;
    imageLink?: string;
    receiptType?: string;
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
        public receiptType?: string,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {}
}

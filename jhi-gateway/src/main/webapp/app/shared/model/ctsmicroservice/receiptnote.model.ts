import { Moment } from 'moment';

export interface IReceiptnote {
    id?: number;
    employeeId?: number;
    invoiceHeaderId?: number;
    note?: string;
    customerConfirm?: boolean;
    createDate?: Moment;
    updateDate?: Moment;
}

export class Receiptnote implements IReceiptnote {
    constructor(
        public id?: number,
        public employeeId?: number,
        public invoiceHeaderId?: number,
        public note?: string,
        public customerConfirm?: boolean,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {
        this.customerConfirm = this.customerConfirm || false;
    }
}

import { Moment } from 'moment';

export interface IPayment {
    id?: number;
    invoiceHeaderId?: number;
    employeeId?: number;
    officerId?: number;
    paymentType?: string;
    senderPay?: boolean;
    amountPaid?: number;
    amountDue?: number;
    createDate?: Moment;
    updateDate?: Moment;
}

export class Payment implements IPayment {
    constructor(
        public id?: number,
        public invoiceHeaderId?: number,
        public employeeId?: number,
        public officerId?: number,
        public paymentType?: string,
        public senderPay?: boolean,
        public amountPaid?: number,
        public amountDue?: number,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {
        this.senderPay = this.senderPay || false;
    }
}

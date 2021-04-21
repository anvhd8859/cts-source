import { Moment } from 'moment';

export interface IInvoiceHeader {
    id?: number;
    customerId?: number;
    officeId?: number;
    invoiceNo?: string;
    invoiceType?: string;
    status?: string;
    startAddress?: string;
    startStreetId?: number;
    destinationAddress?: string;
    destinationStreetId?: number;
    receiverName?: string;
    receiverPhone?: string;
    subTotal?: number;
    taxAmount?: number;
    totalDue?: number;
    note?: string;
    cancel?: boolean;
    cancelReason?: string;
    customerConfirm?: boolean;
    changeNote?: string;
    finish?: boolean;
    dueDate?: Moment;
    finishDate?: Moment;
    createDate?: Moment;
    updateDate?: Moment;
}

export class InvoiceHeader implements IInvoiceHeader {
    constructor(
        public id?: number,
        public customerId?: number,
        public officeId?: number,
        public invoiceNo?: string,
        public invoiceType?: string,
        public status?: string,
        public startAddress?: string,
        public startStreetId?: number,
        public destinationAddress?: string,
        public destinationStreetId?: number,
        public receiverName?: string,
        public receiverPhone?: string,
        public subTotal?: number,
        public taxAmount?: number,
        public totalDue?: number,
        public note?: string,
        public cancel?: boolean,
        public cancelReason?: string,
        public customerConfirm?: boolean,
        public changeNote?: string,
        public finish?: boolean,
        public dueDate?: Moment,
        public finishDate?: Moment,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {
        this.cancel = this.cancel || false;
        this.customerConfirm = this.customerConfirm || false;
        this.finish = this.finish || false;
    }
}

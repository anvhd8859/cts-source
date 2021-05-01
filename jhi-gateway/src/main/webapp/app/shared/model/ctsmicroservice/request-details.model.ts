import { Moment } from 'moment';

export interface IRequestDetails {
    id?: number;
    ieWarehouseId?: number;
    invoiceHeaderId?: number;
    createDate?: Moment;
    updateDate?: Moment;
}

export class RequestDetails implements IRequestDetails {
    constructor(
        public id?: number,
        public ieWarehouseId?: number,
        public invoiceHeaderId?: number,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {}
}

import { Moment } from 'moment';

export interface IRequestDetails {
    id?: number;
    requestId?: number;
    invoicePackageId?: number;
    keeperConfirm?: boolean;
    shipperConfirm?: boolean;
    status?: boolean;
    note?: string;
    createDate?: Moment;
    updateDate?: Moment;
}

export class RequestDetails implements IRequestDetails {
    constructor(
        public id?: number,
        public requestId?: number,
        public invoicePackageId?: number,
        public keeperConfirm?: boolean,
        public shipperConfirm?: boolean,
        public status?: boolean,
        public note?: string,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {}
}

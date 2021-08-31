import { Moment } from 'moment';

export interface ITransferDetails {
    id?: number;
    transferId?: number;
    invoicePackageId?: number;
    status?: boolean;
    createDate?: Moment;
    updateDate?: Moment;
    note?: String;
}

export class TransferDetails implements ITransferDetails {
    constructor(
        public id?: number,
        public transferId?: number,
        public invoicePackageId?: number,
        public status?: boolean,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {}
}

import { Moment } from 'moment';

export interface ITransferDetails {
    id?: number;
    transferId?: number;
    invoicePackageIdackageId?: number;
    createDate?: Moment;
    updateDate?: Moment;
}

export class TransferDetails implements ITransferDetails {
    constructor(
        public id?: number,
        public transferId?: number,
        public invoicePackageIdackageId?: number,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {}
}

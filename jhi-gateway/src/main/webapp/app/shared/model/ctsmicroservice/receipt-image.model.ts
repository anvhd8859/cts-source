import { Moment } from 'moment';

export interface IReceiptImage {
    id?: number;
    receiptNoteId?: number;
    imageContentType?: string;
    image?: any;
    createDate?: Moment;
    updateDate?: Moment;
}

export class ReceiptImage implements IReceiptImage {
    constructor(
        public id?: number,
        public receiptNoteId?: number,
        public imageContentType?: string,
        public image?: any,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {}
}

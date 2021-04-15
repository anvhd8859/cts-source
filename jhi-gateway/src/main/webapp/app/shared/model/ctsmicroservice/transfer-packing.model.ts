import { Moment } from 'moment';

export interface ITransferPacking {
    id?: number;
    employeeId?: number;
    invoiceHeaderId?: number;
    packDate?: Moment;
    startHour?: number;
    startMinute?: number;
    endHour?: number;
    endMinute?: number;
    status?: string;
    createDate?: Moment;
    updateDate?: Moment;
}

export class TransferPacking implements ITransferPacking {
    constructor(
        public id?: number,
        public employeeId?: number,
        public invoiceHeaderId?: number,
        public packDate?: Moment,
        public startHour?: number,
        public startMinute?: number,
        public endHour?: number,
        public endMinute?: number,
        public status?: string,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {}
}

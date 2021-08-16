import { Moment } from 'moment';

export interface IWarehouseTransferRequest {
    id?: number;
    fromWarehouseId?: number;
    toWarehouseId?: number;
    fromKeeperId?: number;
    toKeeperId?: number;
    status?: string;
    receiveDate?: Moment;
    createDate?: Moment;
    updateDate?: Moment;
}

export class WarehouseTransferRequest implements IWarehouseTransferRequest {
    constructor(
        public id?: number,
        public fromWarehouseId?: number,
        public toWarehouseId?: number,
        public fromKeeperId?: number,
        public toKeeperId?: number,
        public status?: string,
        public receiveDate?: Moment,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {}
}

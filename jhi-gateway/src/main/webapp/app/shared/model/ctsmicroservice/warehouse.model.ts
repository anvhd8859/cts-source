import { Moment } from 'moment';

export interface IWarehouse {
    id?: number;
    warehouseName?: string;
    keeperId?: number;
    address?: string;
    streetId?: string;
    warehouseType?: string;
    masterWarehouseId?: number;
    createDate?: Moment;
    updateDate?: Moment;
}

export class Warehouse implements IWarehouse {
    constructor(
        public id?: number,
        public warehouseName?: string,
        public keeperId?: number,
        public address?: string,
        public streetId?: string,
        public warehouseType?: string,
        public masterWarehouseId?: number,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {}
}

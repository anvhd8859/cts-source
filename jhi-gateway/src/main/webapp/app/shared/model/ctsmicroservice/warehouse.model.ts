import { Moment } from 'moment';

export interface IWarehouse {
    id?: number;
    warehouseName?: string;
    officeId?: number;
    keeperId?: number;
    address?: string;
    streetId?: number;
    warehouseType?: string;
    masterWarehouseId?: number;
    createDate?: Moment;
    updateDate?: Moment;
}

export class Warehouse implements IWarehouse {
    constructor(
        public id?: number,
        public warehouseName?: string,
        public officeId?: number,
        public keeperId?: number,
        public address?: string,
        public streetId?: number,
        public warehouseType?: string,
        public masterWarehouseId?: number,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {}
}

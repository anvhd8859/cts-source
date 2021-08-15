import { Moment } from 'moment';

export interface IImportExportWarehouse {
    id?: number;
    warehouseId?: number;
    keeperId?: number;
    employeeId?: number;
    type?: string;
    status?: string;
    note?: string;
    keeperConfirm?: boolean;
    shipperConfirm?: boolean;
    shipDate?: Moment;
    createDate?: Moment;
    updateDate?: Moment;
}

export class ImportExportWarehouse implements IImportExportWarehouse {
    constructor(
        public id?: number,
        public warehouseId?: number,
        public keeperId?: number,
        public employeeId?: number,
        public type?: string,
        public status?: string,
        public note?: string,
        public keeperConfirm?: boolean,
        public shipperConfirm?: boolean,
        public shipDate?: Moment,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {
        this.keeperConfirm = this.keeperConfirm || false;
        this.shipperConfirm = this.shipperConfirm || true;
    }
}

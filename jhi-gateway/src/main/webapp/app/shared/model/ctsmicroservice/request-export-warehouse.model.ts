import { Moment } from 'moment';

export interface IRequestExportWarehouse {
    id?: number;
    officeId?: number;
    keeperId?: number;
    employeeId?: number;
    type?: string;
    note?: string;
    keeperConfirm?: boolean;
    shipDate?: Moment;
    createDate?: Moment;
    updateDate?: Moment;
}

export class RequestExportWarehouse implements IRequestExportWarehouse {
    constructor(
        public id?: number,
        public officeId?: number,
        public keeperId?: number,
        public employeeId?: number,
        public type?: string,
        public note?: string,
        public keeperConfirm?: boolean,
        public shipDate?: Moment,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {
        this.keeperConfirm = this.keeperConfirm || false;
    }
}

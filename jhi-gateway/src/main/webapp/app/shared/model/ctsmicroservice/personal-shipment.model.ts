import { Moment } from 'moment';

export interface IPersonalShipment {
    id?: number;
    invoiceHeaderId?: number;
    employeeId?: number;
    shipmentType?: string;
    shipTime?: Moment;
    finishTime?: Moment;
    status?: string;
    createDate?: Moment;
    updateDate?: Moment;
}

export class PersonalShipment implements IPersonalShipment {
    constructor(
        public id?: number,
        public invoiceHeaderId?: number,
        public employeeId?: number,
        public shipmentType?: string,
        public shipTime?: Moment,
        public finishTime?: Moment,
        public status?: string,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {}
}

import { Moment } from 'moment';

export interface IStreet {
    id?: number;
    streetName?: string;
    createDate?: Moment;
    updateDate?: Moment;
    subDistrictIdId?: number;
}

export class Street implements IStreet {
    constructor(
        public id?: number,
        public streetName?: string,
        public createDate?: Moment,
        public updateDate?: Moment,
        public subDistrictIdId?: number
    ) {}
}

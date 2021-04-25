import { Moment } from 'moment';

export interface IOffice {
    id?: number;
    officeName?: string;
    address?: string;
    streetId?: number;
    createDate?: Moment;
    updateDate?: Moment;
}

export class Office implements IOffice {
    constructor(
        public id?: number,
        public officeName?: string,
        public address?: string,
        public streetId?: number,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {}
}

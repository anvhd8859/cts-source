import { Moment } from 'moment';

export interface IShift {
    id?: number;
    shiftName?: string;
    startHour?: number;
    startMinute?: number;
    endHour?: number;
    endMinute?: number;
    createDate?: Moment;
    updateDate?: Moment;
}

export class Shift implements IShift {
    constructor(
        public id?: number,
        public shiftName?: string,
        public startHour?: number,
        public startMinute?: number,
        public endHour?: number,
        public endMinute?: number,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {}
}

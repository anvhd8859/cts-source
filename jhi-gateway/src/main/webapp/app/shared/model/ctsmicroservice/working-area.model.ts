import { Moment } from 'moment';

export interface IWorkingArea {
    id?: number;
    streetId?: number;
    employeeId?: number;
    createDate?: Moment;
    updateDate?: Moment;
}

export class WorkingArea implements IWorkingArea {
    constructor(
        public id?: number,
        public streetId?: number,
        public employeeId?: number,
        public createDate?: Moment,
        public updateDate?: Moment
    ) {}
}

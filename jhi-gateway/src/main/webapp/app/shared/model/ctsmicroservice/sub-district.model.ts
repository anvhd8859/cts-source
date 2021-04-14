import { Moment } from 'moment';
import { IStreet } from 'app/shared/model/ctsmicroservice/street.model';

export interface ISubDistrict {
    id?: number;
    subDistrictName?: string;
    createDate?: Moment;
    updateDate?: Moment;
    streets?: IStreet[];
    districtIdId?: number;
}

export class SubDistrict implements ISubDistrict {
    constructor(
        public id?: number,
        public subDistrictName?: string,
        public createDate?: Moment,
        public updateDate?: Moment,
        public streets?: IStreet[],
        public districtIdId?: number
    ) {}
}

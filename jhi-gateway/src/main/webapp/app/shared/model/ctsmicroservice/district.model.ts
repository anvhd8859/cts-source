import { Moment } from 'moment';
import { ISubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';

export interface IDistrict {
    id?: number;
    districtName?: string;
    createDate?: Moment;
    updateDate?: Moment;
    subDistricts?: ISubDistrict[];
    provinceIdId?: number;
}

export class District implements IDistrict {
    constructor(
        public id?: number,
        public districtName?: string,
        public createDate?: Moment,
        public updateDate?: Moment,
        public subDistricts?: ISubDistrict[],
        public provinceIdId?: number
    ) {}
}

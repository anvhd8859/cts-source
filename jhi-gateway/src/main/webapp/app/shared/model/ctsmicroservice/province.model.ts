import { Moment } from 'moment';
import { IDistrict } from 'app/shared/model/ctsmicroservice/district.model';

export interface IProvince {
    id?: number;
    provinceName?: string;
    createDate?: Moment;
    updateDate?: Moment;
    districts?: IDistrict[];
}

export class Province implements IProvince {
    constructor(
        public id?: number,
        public provinceName?: string,
        public createDate?: Moment,
        public updateDate?: Moment,
        public districts?: IDistrict[]
    ) {}
}

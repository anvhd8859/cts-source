import { Moment } from 'moment';

export interface IUserProfile {
    id?: number;
    userId?: number;
    gender?: string;
    address?: string;
    streetId?: number;
    phoneNumber?: string;
    dateOfBirth?: Moment;
    createdDate?: Moment;
    updatedDate?: Moment;
}

export class UserProfile implements IUserProfile {
    constructor(
        public id?: number,
        public userId?: number,
        public gender?: string,
        public address?: string,
        public streetId?: number,
        public phoneNumber?: string,
        public dateOfBirth?: Moment,
        public createdDate?: Moment,
        public updatedDate?: Moment
    ) {}
}

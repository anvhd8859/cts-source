import { Moment } from 'moment';

export interface IUserProfile {
    id?: number;
    userId?: number;
    gender?: boolean;
    address?: string;
    streetId?: string;
    phoneNumber?: string;
    dateOfBirth?: Moment;
    createdDate?: Moment;
    updatedDate?: Moment;
}

export class UserProfile implements IUserProfile {
    constructor(
        public id?: number,
        public userId?: number,
        public gender?: boolean,
        public address?: string,
        public streetId?: string,
        public phoneNumber?: string,
        public dateOfBirth?: Moment,
        public createdDate?: Moment,
        public updatedDate?: Moment
    ) {
        this.gender = this.gender || false;
    }
}

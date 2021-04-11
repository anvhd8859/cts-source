import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserProfile } from 'app/shared/model/user-profile.model';

type EntityResponseType = HttpResponse<IUserProfile>;
type EntityArrayResponseType = HttpResponse<IUserProfile[]>;

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    public resourceUrl = SERVER_API_URL + 'api/user-profiles';

    constructor(private http: HttpClient) {}

    create(userProfile: IUserProfile): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(userProfile);
        return this.http
            .post<IUserProfile>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(userProfile: IUserProfile): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(userProfile);
        return this.http
            .put<IUserProfile>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IUserProfile>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IUserProfile[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(userProfile: IUserProfile): IUserProfile {
        const copy: IUserProfile = Object.assign({}, userProfile, {
            dateOfBirth: userProfile.dateOfBirth != null && userProfile.dateOfBirth.isValid() ? userProfile.dateOfBirth.toJSON() : null,
            createdDate: userProfile.createdDate != null && userProfile.createdDate.isValid() ? userProfile.createdDate.toJSON() : null,
            updatedDate: userProfile.updatedDate != null && userProfile.updatedDate.isValid() ? userProfile.updatedDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateOfBirth = res.body.dateOfBirth != null ? moment(res.body.dateOfBirth) : null;
        res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        res.body.updatedDate = res.body.updatedDate != null ? moment(res.body.updatedDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((userProfile: IUserProfile) => {
            userProfile.dateOfBirth = userProfile.dateOfBirth != null ? moment(userProfile.dateOfBirth) : null;
            userProfile.createdDate = userProfile.createdDate != null ? moment(userProfile.createdDate) : null;
            userProfile.updatedDate = userProfile.updatedDate != null ? moment(userProfile.updatedDate) : null;
        });
        return res;
    }
}

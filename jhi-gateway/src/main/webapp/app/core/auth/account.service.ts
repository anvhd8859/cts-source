import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { SERVER_API_URL } from 'app/app.constants';
import { IProvince } from 'app/shared/model/ctsmicroservice/province.model';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { createRequestOption } from 'app/shared';
import { map } from 'rxjs/operators';
import { IStreet } from 'app/shared/model/ctsmicroservice/street.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
    public locationResourceUrl = SERVER_API_URL + 'ctsmicroservice/api';
    public profileResourceUrl = SERVER_API_URL + 'api/user-profiles';

    constructor(private http: HttpClient) {}

    get(): Observable<HttpResponse<Account>> {
        return this.http.get<Account>(SERVER_API_URL + 'api/account', { observe: 'response' });
    }

    save(account: any): Observable<HttpResponse<any>> {
        return this.http.post(SERVER_API_URL + 'api/account', account, { observe: 'response' });
    }

    // HaiNM
    getLstCity(): Observable<HttpResponse<IProvince[]>> {
        return this.http.get<IProvince[]>(this.locationResourceUrl + '/provinces', { observe: 'response' }).pipe();
    }

    getLstDistrictByCity(req?: any): Observable<HttpResponse<any[]>> {
        return this.http.get<any[]>(this.locationResourceUrl + '/districts/get-district-by-province', { params: req, observe: 'response' });
    }

    getLstWardByDistrict(req?: any): Observable<HttpResponse<any[]>> {
        return this.http.get<any[]>(this.locationResourceUrl + '/sub-districts/by-district-id', { params: req, observe: 'response' });
    }

    getLstStreetByWard(req?: any): Observable<HttpResponse<any[]>> {
        return this.http.get<any[]>(this.locationResourceUrl + '/streets/by-sub-district', { params: req, observe: 'response' });
    }

    createUserProfile(userProfile: IUserProfile): Observable<HttpResponse<IUserProfile>> {
        return this.http.post<IUserProfile>(this.profileResourceUrl, userProfile, { observe: 'response' }).pipe();
    }

    updateUserProfile(userProfile: IUserProfile): Observable<HttpResponse<IUserProfile>> {
        return this.http.put<IUserProfile>(this.profileResourceUrl, userProfile, { observe: 'response' }).pipe();
    }

    findByUserID(req: any): Observable<HttpResponse<IUserProfile>> {
        return this.http
            .get<IUserProfile>(this.profileResourceUrl + '/find-by-user-id', { params: req, observe: 'response' })
            .pipe(map((res: HttpResponse<IUserProfile>) => this.convertDateFromServerUserProfile(res)));
    }

    getAllDistrict(req?: any): Observable<HttpResponse<any[]>> {
        return this.http.get<any[]>(this.locationResourceUrl + '/districts?size=9999', { observe: 'response' }).pipe();
    }

    getAllSubDistrict(req?: any): Observable<HttpResponse<any[]>> {
        return this.http.get<any[]>(this.locationResourceUrl + '/sub-districts?size=9999', { observe: 'response' }).pipe();
    }

    getAllStreet(req?: any): Observable<HttpResponse<any[]>> {
        return this.http.get<any[]>(this.locationResourceUrl + '/streets?size=9999', { observe: 'response' }).pipe();
    }

    getStreetAndParentById(req?: any): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.locationResourceUrl + '/streets/get-full-address', { params: req, observe: 'response' });
    }

    createProfile(userProfile: IUserProfile): Observable<HttpResponse<IUserProfile>> {
        const copy = this.convertDateFromClientUserProfile(userProfile);
        return this.http
            .post<IUserProfile>(this.profileResourceUrl, copy, { observe: 'response' })
            .pipe(map((res: HttpResponse<IUserProfile>) => this.convertDateFromServerUserProfile(res)));
    }

    updateProfile(userProfile: IUserProfile): Observable<HttpResponse<IUserProfile>> {
        const copy = this.convertDateFromClientUserProfile(userProfile);
        return this.http
            .put<IUserProfile>(this.profileResourceUrl, copy, { observe: 'response' })
            .pipe(map((res: HttpResponse<IUserProfile>) => this.convertDateFromServerUserProfile(res)));
    }

    private convertDateFromClientUserProfile(userProfile: IUserProfile): IUserProfile {
        const copy: IUserProfile = Object.assign({}, userProfile, {
            dateOfBirth: userProfile.dateOfBirth != null && userProfile.dateOfBirth.isValid() ? userProfile.dateOfBirth.toJSON() : null,
            createdDate: userProfile.createdDate != null && userProfile.createdDate.isValid() ? userProfile.createdDate.toJSON() : null,
            updatedDate: userProfile.updatedDate != null && userProfile.updatedDate.isValid() ? userProfile.updatedDate.toJSON() : null,
            hireDate: userProfile.hireDate != null && userProfile.hireDate.isValid() ? userProfile.hireDate.toJSON() : null,
            endDate: userProfile.endDate != null && userProfile.endDate.isValid() ? userProfile.endDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServerUserProfile(res: HttpResponse<IUserProfile>): HttpResponse<IUserProfile> {
        if (res.body !== null) {
            res.body.dateOfBirth = res.body.dateOfBirth != null ? moment(res.body.dateOfBirth) : null;
            res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
            res.body.updatedDate = res.body.updatedDate != null ? moment(res.body.updatedDate) : null;
            res.body.hireDate = res.body.hireDate != null ? moment(res.body.hireDate) : null;
            res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
        }
        return res;
    }

    private convertDateArrayFromServerUserProfile(res: HttpResponse<IUserProfile[]>): HttpResponse<IUserProfile[]> {
        res.body.forEach((userProfile: IUserProfile) => {
            userProfile.dateOfBirth = userProfile.dateOfBirth != null ? moment(userProfile.dateOfBirth) : null;
            userProfile.createdDate = userProfile.createdDate != null ? moment(userProfile.createdDate) : null;
            userProfile.updatedDate = userProfile.updatedDate != null ? moment(userProfile.updatedDate) : null;
        });
        return res;
    }
    // HaiNM
}

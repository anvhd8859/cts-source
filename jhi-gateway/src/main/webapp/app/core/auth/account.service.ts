import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { SERVER_API_URL } from 'app/app.constants';
import { IProvince } from 'app/shared/model/ctsmicroservice/province.model';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { createRequestOption } from 'app/shared';

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
        return this.http.get<IUserProfile>(this.profileResourceUrl + '/find-by-user-id', { params: req, observe: 'response' }).pipe();
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

    private convertDateArrayFromServer(res: HttpResponse<any[]>): HttpResponse<any[]> {
        res.body.forEach((obj: any) => {
            obj.createDate = obj.createDate != null ? moment(obj.createDate) : null;
            obj.updateDate = obj.updateDate != null ? moment(obj.updateDate) : null;
        });
        return res;
    }
    // HaiNM
}

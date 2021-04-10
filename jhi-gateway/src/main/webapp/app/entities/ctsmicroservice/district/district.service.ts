import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDistrict } from 'app/shared/model/ctsmicroservice/district.model';

type EntityResponseType = HttpResponse<IDistrict>;
type EntityArrayResponseType = HttpResponse<IDistrict[]>;

@Injectable({ providedIn: 'root' })
export class DistrictService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/districts';

    constructor(private http: HttpClient) {}

    create(district: IDistrict): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(district);
        return this.http
            .post<IDistrict>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(district: IDistrict): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(district);
        return this.http
            .put<IDistrict>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDistrict>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDistrict[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(district: IDistrict): IDistrict {
        const copy: IDistrict = Object.assign({}, district, {
            createDate: district.createDate != null && district.createDate.isValid() ? district.createDate.toJSON() : null,
            updateDate: district.updateDate != null && district.updateDate.isValid() ? district.updateDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((district: IDistrict) => {
            district.createDate = district.createDate != null ? moment(district.createDate) : null;
            district.updateDate = district.updateDate != null ? moment(district.updateDate) : null;
        });
        return res;
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';

type EntityResponseType = HttpResponse<ISubDistrict>;
type EntityArrayResponseType = HttpResponse<ISubDistrict[]>;

@Injectable({ providedIn: 'root' })
export class SubDistrictService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/sub-districts';

    constructor(private http: HttpClient) {}

    create(subDistrict: ISubDistrict): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(subDistrict);
        return this.http
            .post<ISubDistrict>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(subDistrict: ISubDistrict): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(subDistrict);
        return this.http
            .put<ISubDistrict>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISubDistrict>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISubDistrict[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(subDistrict: ISubDistrict): ISubDistrict {
        const copy: ISubDistrict = Object.assign({}, subDistrict, {
            createDate: subDistrict.createDate != null && subDistrict.createDate.isValid() ? subDistrict.createDate.toJSON() : null,
            updateDate: subDistrict.updateDate != null && subDistrict.updateDate.isValid() ? subDistrict.updateDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((subDistrict: ISubDistrict) => {
            subDistrict.createDate = subDistrict.createDate != null ? moment(subDistrict.createDate) : null;
            subDistrict.updateDate = subDistrict.updateDate != null ? moment(subDistrict.updateDate) : null;
        });
        return res;
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProvince } from 'app/shared/model/ctsmicroservice/province.model';

type EntityResponseType = HttpResponse<IProvince>;
type EntityArrayResponseType = HttpResponse<IProvince[]>;

@Injectable({ providedIn: 'root' })
export class ProvinceService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/provinces';

    constructor(private http: HttpClient) {}

    create(province: IProvince): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(province);
        return this.http
            .post<IProvince>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(province: IProvince): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(province);
        return this.http
            .put<IProvince>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IProvince>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IProvince[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(province: IProvince): IProvince {
        const copy: IProvince = Object.assign({}, province, {
            createDate: province.createDate != null && province.createDate.isValid() ? province.createDate.toJSON() : null,
            updateDate: province.updateDate != null && province.updateDate.isValid() ? province.updateDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((province: IProvince) => {
            province.createDate = province.createDate != null ? moment(province.createDate) : null;
            province.updateDate = province.updateDate != null ? moment(province.updateDate) : null;
        });
        return res;
    }
}

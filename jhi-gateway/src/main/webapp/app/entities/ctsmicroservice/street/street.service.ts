import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStreet } from 'app/shared/model/ctsmicroservice/street.model';

type EntityResponseType = HttpResponse<IStreet>;
type EntityArrayResponseType = HttpResponse<IStreet[]>;

@Injectable({ providedIn: 'root' })
export class StreetService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/streets';

    constructor(private http: HttpClient) {}

    create(street: IStreet): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(street);
        return this.http
            .post<IStreet>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(street: IStreet): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(street);
        return this.http
            .put<IStreet>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IStreet>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStreet[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(street: IStreet): IStreet {
        const copy: IStreet = Object.assign({}, street, {
            createDate: street.createDate != null && street.createDate.isValid() ? street.createDate.toJSON() : null,
            updateDate: street.updateDate != null && street.updateDate.isValid() ? street.updateDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((street: IStreet) => {
            street.createDate = street.createDate != null ? moment(street.createDate) : null;
            street.updateDate = street.updateDate != null ? moment(street.updateDate) : null;
        });
        return res;
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOffice } from 'app/shared/model/ctsmicroservice/office.model';

type EntityResponseType = HttpResponse<IOffice>;
type EntityArrayResponseType = HttpResponse<IOffice[]>;

@Injectable({ providedIn: 'root' })
export class OfficeService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/offices';

    constructor(private http: HttpClient) {}

    create(office: IOffice): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(office);
        return this.http
            .post<IOffice>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(office: IOffice): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(office);
        return this.http
            .put<IOffice>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IOffice>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOffice[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getAvailableOffice(): Observable<EntityArrayResponseType> {
        return this.http
            .get<IOffice[]>(this.resourceUrl + '/warehouse-not-exist', { observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(office: IOffice): IOffice {
        const copy: IOffice = Object.assign({}, office, {
            createDate: office.createDate != null && office.createDate.isValid() ? office.createDate.toJSON() : null,
            updateDate: office.updateDate != null && office.updateDate.isValid() ? office.updateDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((office: IOffice) => {
            office.createDate = office.createDate != null ? moment(office.createDate) : null;
            office.updateDate = office.updateDate != null ? moment(office.updateDate) : null;
        });
        return res;
    }
}

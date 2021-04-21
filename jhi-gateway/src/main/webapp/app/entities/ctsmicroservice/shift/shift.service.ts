import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IShift } from 'app/shared/model/ctsmicroservice/shift.model';

type EntityResponseType = HttpResponse<IShift>;
type EntityArrayResponseType = HttpResponse<IShift[]>;

@Injectable({ providedIn: 'root' })
export class ShiftService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/shifts';

    constructor(private http: HttpClient) {}

    create(shift: IShift): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(shift);
        return this.http
            .post<IShift>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(shift: IShift): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(shift);
        return this.http
            .put<IShift>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IShift>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IShift[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(shift: IShift): IShift {
        const copy: IShift = Object.assign({}, shift, {
            createDate: shift.createDate != null && shift.createDate.isValid() ? shift.createDate.toJSON() : null,
            updateDate: shift.updateDate != null && shift.updateDate.isValid() ? shift.updateDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((shift: IShift) => {
            shift.createDate = shift.createDate != null ? moment(shift.createDate) : null;
            shift.updateDate = shift.updateDate != null ? moment(shift.updateDate) : null;
        });
        return res;
    }
}

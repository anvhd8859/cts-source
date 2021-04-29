import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRequestImportWarehouse } from 'app/shared/model/ctsmicroservice/request-import-warehouse.model';

type EntityResponseType = HttpResponse<IRequestImportWarehouse>;
type EntityArrayResponseType = HttpResponse<IRequestImportWarehouse[]>;

@Injectable({ providedIn: 'root' })
export class RequestImportWarehouseService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/request-import-warehouses';

    constructor(private http: HttpClient) {}

    create(requestImportWarehouse: IRequestImportWarehouse): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(requestImportWarehouse);
        return this.http
            .post<IRequestImportWarehouse>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(requestImportWarehouse: IRequestImportWarehouse): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(requestImportWarehouse);
        return this.http
            .put<IRequestImportWarehouse>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRequestImportWarehouse>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRequestImportWarehouse[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(requestImportWarehouse: IRequestImportWarehouse): IRequestImportWarehouse {
        const copy: IRequestImportWarehouse = Object.assign({}, requestImportWarehouse, {
            shipDate:
                requestImportWarehouse.shipDate != null && requestImportWarehouse.shipDate.isValid()
                    ? requestImportWarehouse.shipDate.toJSON()
                    : null,
            createDate:
                requestImportWarehouse.createDate != null && requestImportWarehouse.createDate.isValid()
                    ? requestImportWarehouse.createDate.toJSON()
                    : null,
            updateDate:
                requestImportWarehouse.updateDate != null && requestImportWarehouse.updateDate.isValid()
                    ? requestImportWarehouse.updateDate.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.shipDate = res.body.shipDate != null ? moment(res.body.shipDate) : null;
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((requestImportWarehouse: IRequestImportWarehouse) => {
            requestImportWarehouse.shipDate = requestImportWarehouse.shipDate != null ? moment(requestImportWarehouse.shipDate) : null;
            requestImportWarehouse.createDate =
                requestImportWarehouse.createDate != null ? moment(requestImportWarehouse.createDate) : null;
            requestImportWarehouse.updateDate =
                requestImportWarehouse.updateDate != null ? moment(requestImportWarehouse.updateDate) : null;
        });
        return res;
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRequestExportWarehouse } from 'app/shared/model/ctsmicroservice/request-export-warehouse.model';

type EntityResponseType = HttpResponse<IRequestExportWarehouse>;
type EntityArrayResponseType = HttpResponse<IRequestExportWarehouse[]>;

@Injectable({ providedIn: 'root' })
export class RequestExportWarehouseService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/request-export-warehouses';

    constructor(private http: HttpClient) {}

    create(requestExportWarehouse: IRequestExportWarehouse): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(requestExportWarehouse);
        return this.http
            .post<IRequestExportWarehouse>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(requestExportWarehouse: IRequestExportWarehouse): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(requestExportWarehouse);
        return this.http
            .put<IRequestExportWarehouse>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRequestExportWarehouse>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRequestExportWarehouse[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(requestExportWarehouse: IRequestExportWarehouse): IRequestExportWarehouse {
        const copy: IRequestExportWarehouse = Object.assign({}, requestExportWarehouse, {
            shipDate:
                requestExportWarehouse.shipDate != null && requestExportWarehouse.shipDate.isValid()
                    ? requestExportWarehouse.shipDate.toJSON()
                    : null,
            createDate:
                requestExportWarehouse.createDate != null && requestExportWarehouse.createDate.isValid()
                    ? requestExportWarehouse.createDate.toJSON()
                    : null,
            updateDate:
                requestExportWarehouse.updateDate != null && requestExportWarehouse.updateDate.isValid()
                    ? requestExportWarehouse.updateDate.toJSON()
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
        res.body.forEach((requestExportWarehouse: IRequestExportWarehouse) => {
            requestExportWarehouse.shipDate = requestExportWarehouse.shipDate != null ? moment(requestExportWarehouse.shipDate) : null;
            requestExportWarehouse.createDate =
                requestExportWarehouse.createDate != null ? moment(requestExportWarehouse.createDate) : null;
            requestExportWarehouse.updateDate =
                requestExportWarehouse.updateDate != null ? moment(requestExportWarehouse.updateDate) : null;
        });
        return res;
    }
}

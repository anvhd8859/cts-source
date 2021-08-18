import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IWarehouse } from 'app/shared/model/ctsmicroservice/warehouse.model';

type EntityResponseType = HttpResponse<IWarehouse>;
type EntityArrayResponseType = HttpResponse<IWarehouse[]>;

@Injectable({ providedIn: 'root' })
export class WarehouseService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/warehouses';

    constructor(private http: HttpClient) {}

    create(warehouse: IWarehouse): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(warehouse);
        return this.http
            .post<IWarehouse>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(warehouse: IWarehouse): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(warehouse);
        return this.http
            .put<IWarehouse>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IWarehouse>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IWarehouse[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    getFullDetail(): Observable<HttpResponse<any[]>> {
        return this.http.get<any[]>(this.resourceUrl + '/full-detail', { observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getWarehouseByOffice(id: number): Observable<EntityResponseType> {
        return this.http.get<any>(`${this.resourceUrl}/office/${id}`, { observe: 'response' });
    }

    findWarehouseExceptEmployee(id: number): Observable<EntityArrayResponseType> {
        return this.http.get<any>(`${this.resourceUrl}/except-keeper/${id}`, { observe: 'response' });
    }

    findWarehouseByEmployee(id: number): Observable<EntityResponseType> {
        return this.http.get<any>(`${this.resourceUrl}/keeper/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(warehouse: IWarehouse): IWarehouse {
        const copy: IWarehouse = Object.assign({}, warehouse, {
            createDate: warehouse.createDate != null && warehouse.createDate.isValid() ? warehouse.createDate.toJSON() : null,
            updateDate: warehouse.updateDate != null && warehouse.updateDate.isValid() ? warehouse.updateDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((warehouse: IWarehouse) => {
            warehouse.createDate = warehouse.createDate != null ? moment(warehouse.createDate) : null;
            warehouse.updateDate = warehouse.updateDate != null ? moment(warehouse.updateDate) : null;
        });
        return res;
    }
}

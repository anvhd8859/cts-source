import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IImportExportWarehouse } from 'app/shared/model/ctsmicroservice/import-export-warehouse.model';

type EntityResponseType = HttpResponse<IImportExportWarehouse>;
type EntityArrayResponseType = HttpResponse<IImportExportWarehouse[]>;

@Injectable({ providedIn: 'root' })
export class ImportExportWarehouseService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/import-export-warehouses';

    constructor(private http: HttpClient) {}

    create(importExportWarehouse: IImportExportWarehouse): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(importExportWarehouse);
        return this.http
            .post<IImportExportWarehouse>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(importExportWarehouse: IImportExportWarehouse): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(importExportWarehouse);
        return this.http
            .put<IImportExportWarehouse>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IImportExportWarehouse>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IImportExportWarehouse[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(importExportWarehouse: IImportExportWarehouse): IImportExportWarehouse {
        const copy: IImportExportWarehouse = Object.assign({}, importExportWarehouse, {
            shipDate:
                importExportWarehouse.shipDate != null && importExportWarehouse.shipDate.isValid()
                    ? importExportWarehouse.shipDate.toJSON()
                    : null,
            createDate:
                importExportWarehouse.createDate != null && importExportWarehouse.createDate.isValid()
                    ? importExportWarehouse.createDate.toJSON()
                    : null,
            updateDate:
                importExportWarehouse.updateDate != null && importExportWarehouse.updateDate.isValid()
                    ? importExportWarehouse.updateDate.toJSON()
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
        res.body.forEach((importExportWarehouse: IImportExportWarehouse) => {
            importExportWarehouse.shipDate = importExportWarehouse.shipDate != null ? moment(importExportWarehouse.shipDate) : null;
            importExportWarehouse.createDate = importExportWarehouse.createDate != null ? moment(importExportWarehouse.createDate) : null;
            importExportWarehouse.updateDate = importExportWarehouse.updateDate != null ? moment(importExportWarehouse.updateDate) : null;
        });
        return res;
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IImportInvoicePackage } from 'app/shared/model/ctsmicroservice/import-invoice-package.model';

type EntityResponseType = HttpResponse<IImportInvoicePackage>;
type EntityArrayResponseType = HttpResponse<IImportInvoicePackage[]>;

@Injectable({ providedIn: 'root' })
export class ImportInvoicePackageService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/import-invoice-packages';

    constructor(private http: HttpClient) {}

    create(importInvoicePackage: IImportInvoicePackage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(importInvoicePackage);
        return this.http
            .post<IImportInvoicePackage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(importInvoicePackage: IImportInvoicePackage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(importInvoicePackage);
        return this.http
            .put<IImportInvoicePackage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IImportInvoicePackage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IImportInvoicePackage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(importInvoicePackage: IImportInvoicePackage): IImportInvoicePackage {
        const copy: IImportInvoicePackage = Object.assign({}, importInvoicePackage, {
            createDate:
                importInvoicePackage.createDate != null && importInvoicePackage.createDate.isValid()
                    ? importInvoicePackage.createDate.toJSON()
                    : null,
            updateDate:
                importInvoicePackage.updateDate != null && importInvoicePackage.updateDate.isValid()
                    ? importInvoicePackage.updateDate.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((importInvoicePackage: IImportInvoicePackage) => {
            importInvoicePackage.createDate = importInvoicePackage.createDate != null ? moment(importInvoicePackage.createDate) : null;
            importInvoicePackage.updateDate = importInvoicePackage.updateDate != null ? moment(importInvoicePackage.updateDate) : null;
        });
        return res;
    }
}

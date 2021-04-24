import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExportInvoicePackage } from 'app/shared/model/ctsmicroservice/export-invoice-package.model';

type EntityResponseType = HttpResponse<IExportInvoicePackage>;
type EntityArrayResponseType = HttpResponse<IExportInvoicePackage[]>;

@Injectable({ providedIn: 'root' })
export class ExportInvoicePackageService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/export-invoice-packages';

    constructor(private http: HttpClient) {}

    create(exportInvoicePackage: IExportInvoicePackage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(exportInvoicePackage);
        return this.http
            .post<IExportInvoicePackage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(exportInvoicePackage: IExportInvoicePackage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(exportInvoicePackage);
        return this.http
            .put<IExportInvoicePackage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IExportInvoicePackage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IExportInvoicePackage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(exportInvoicePackage: IExportInvoicePackage): IExportInvoicePackage {
        const copy: IExportInvoicePackage = Object.assign({}, exportInvoicePackage, {
            createDate:
                exportInvoicePackage.createDate != null && exportInvoicePackage.createDate.isValid()
                    ? exportInvoicePackage.createDate.toJSON()
                    : null,
            updateDate:
                exportInvoicePackage.updateDate != null && exportInvoicePackage.updateDate.isValid()
                    ? exportInvoicePackage.updateDate.toJSON()
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
        res.body.forEach((exportInvoicePackage: IExportInvoicePackage) => {
            exportInvoicePackage.createDate = exportInvoicePackage.createDate != null ? moment(exportInvoicePackage.createDate) : null;
            exportInvoicePackage.updateDate = exportInvoicePackage.updateDate != null ? moment(exportInvoicePackage.updateDate) : null;
        });
        return res;
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';

type EntityResponseType = HttpResponse<IInvoiceHeader>;
type EntityArrayResponseType = HttpResponse<IInvoiceHeader[]>;

@Injectable({ providedIn: 'root' })
export class InvoiceHeaderService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/invoice-headers';

    constructor(private http: HttpClient) {}

    create(invoiceHeader: IInvoiceHeader): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(invoiceHeader);
        return this.http
            .post<IInvoiceHeader>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(invoiceHeader: IInvoiceHeader): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(invoiceHeader);
        return this.http
            .put<IInvoiceHeader>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IInvoiceHeader>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInvoiceHeader[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    // ThangND Start
    searchByParam(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInvoiceHeader[]>(this.resourceUrl + '/search', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }
    // ThangND End

    private convertDateFromClient(invoiceHeader: IInvoiceHeader): IInvoiceHeader {
        const copy: IInvoiceHeader = Object.assign({}, invoiceHeader, {
            dueDate: invoiceHeader.dueDate != null && invoiceHeader.dueDate.isValid() ? invoiceHeader.dueDate.toJSON() : null,
            finishDate: invoiceHeader.finishDate != null && invoiceHeader.finishDate.isValid() ? invoiceHeader.finishDate.toJSON() : null,
            createDate: invoiceHeader.createDate != null && invoiceHeader.createDate.isValid() ? invoiceHeader.createDate.toJSON() : null,
            updateDate: invoiceHeader.updateDate != null && invoiceHeader.updateDate.isValid() ? invoiceHeader.updateDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dueDate = res.body.dueDate != null ? moment(res.body.dueDate) : null;
        res.body.finishDate = res.body.finishDate != null ? moment(res.body.finishDate) : null;
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((invoiceHeader: IInvoiceHeader) => {
            invoiceHeader.dueDate = invoiceHeader.dueDate != null ? moment(invoiceHeader.dueDate) : null;
            invoiceHeader.finishDate = invoiceHeader.finishDate != null ? moment(invoiceHeader.finishDate) : null;
            invoiceHeader.createDate = invoiceHeader.createDate != null ? moment(invoiceHeader.createDate) : null;
            invoiceHeader.updateDate = invoiceHeader.updateDate != null ? moment(invoiceHeader.updateDate) : null;
        });
        return res;
    }
}

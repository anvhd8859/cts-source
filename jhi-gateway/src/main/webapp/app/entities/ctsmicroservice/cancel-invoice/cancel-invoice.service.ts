import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICancelInvoice } from 'app/shared/model/ctsmicroservice/cancel-invoice.model';

type EntityResponseType = HttpResponse<ICancelInvoice>;
type EntityArrayResponseType = HttpResponse<ICancelInvoice[]>;

@Injectable({ providedIn: 'root' })
export class CancelInvoiceService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/invoice-headers';

    constructor(private http: HttpClient) {}

    create(cancelInvoice: ICancelInvoice): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cancelInvoice);
        return this.http
            .post<ICancelInvoice>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(cancelInvoice: ICancelInvoice): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cancelInvoice);
        return this.http
            .put<ICancelInvoice>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    updateMany(req?: any): any {
        return this.http
            .put<any>(this.resourceUrl + '/approve-invoices', req, { observe: 'response' })
            .pipe(map((res: any) => this.convertDateArrayFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICancelInvoice>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICancelInvoice[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    approveCancelInvoiceHeaders(cancelInvoice: ICancelInvoice): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cancelInvoice);
        return this.http.put<any>(this.resourceUrl + '/approve-cancel', copy, { observe: 'response' });
    }

    private convertDateFromClient(cancelInvoice: ICancelInvoice): ICancelInvoice {
        const copy: ICancelInvoice = Object.assign({}, cancelInvoice, {
            dueDate: cancelInvoice.dueDate != null && cancelInvoice.dueDate.isValid() ? cancelInvoice.dueDate.toJSON() : null,
            finishDate: cancelInvoice.finishDate != null && cancelInvoice.finishDate.isValid() ? cancelInvoice.finishDate.toJSON() : null,
            createDate: cancelInvoice.createDate != null && cancelInvoice.createDate.isValid() ? cancelInvoice.createDate.toJSON() : null,
            updateDate: cancelInvoice.updateDate != null && cancelInvoice.updateDate.isValid() ? cancelInvoice.updateDate.toJSON() : null
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
        res.body.forEach((cancelInvoice: ICancelInvoice) => {
            cancelInvoice.dueDate = cancelInvoice.dueDate != null ? moment(cancelInvoice.dueDate) : null;
            cancelInvoice.finishDate = cancelInvoice.finishDate != null ? moment(cancelInvoice.finishDate) : null;
            cancelInvoice.createDate = cancelInvoice.createDate != null ? moment(cancelInvoice.createDate) : null;
            cancelInvoice.updateDate = cancelInvoice.updateDate != null ? moment(cancelInvoice.updateDate) : null;
        });
        return res;
    }

    // new code for request cancel invoiceHeader
    getAllRequestCancelInvoice(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICancelInvoice[]>(this.resourceUrl + '/request-cancel', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }
    // end new code
}

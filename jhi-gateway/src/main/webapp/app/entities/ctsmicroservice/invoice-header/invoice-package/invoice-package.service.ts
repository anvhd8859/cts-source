import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';

type EntityResponseType = HttpResponse<IInvoicePackage>;
type EntityArrayResponseType = HttpResponse<IInvoicePackage[]>;

@Injectable({ providedIn: 'root' })
export class InvoicePackageService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/invoice-packages';

    constructor(private http: HttpClient) {}

    create(invoicePackage: IInvoicePackage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(invoicePackage);
        return this.http
            .post<IInvoicePackage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(invoicePackage: IInvoicePackage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(invoicePackage);
        return this.http
            .put<IInvoicePackage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IInvoicePackage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInvoicePackage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(invoicePackage: IInvoicePackage): IInvoicePackage {
        const copy: IInvoicePackage = Object.assign({}, invoicePackage, {
            createDate:
                invoicePackage.createDate != null && invoicePackage.createDate.isValid() ? invoicePackage.createDate.toJSON() : null,
            updateDate: invoicePackage.updateDate != null && invoicePackage.updateDate.isValid() ? invoicePackage.updateDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((invoicePackage: IInvoicePackage) => {
            invoicePackage.createDate = invoicePackage.createDate != null ? moment(invoicePackage.createDate) : null;
            invoicePackage.updateDate = invoicePackage.updateDate != null ? moment(invoicePackage.updateDate) : null;
        });
        return res;
    }
}

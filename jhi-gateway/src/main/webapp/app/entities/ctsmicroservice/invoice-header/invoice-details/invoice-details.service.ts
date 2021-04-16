import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInvoiceDetails } from 'app/shared/model/ctsmicroservice/invoice-details.model';

type EntityResponseType = HttpResponse<IInvoiceDetails>;
type EntityArrayResponseType = HttpResponse<IInvoiceDetails[]>;

@Injectable({ providedIn: 'root' })
export class InvoiceDetailsService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/invoice-details';

    constructor(private http: HttpClient) {}

    create(invoiceDetails: IInvoiceDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(invoiceDetails);
        return this.http
            .post<IInvoiceDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(invoiceDetails: IInvoiceDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(invoiceDetails);
        return this.http
            .put<IInvoiceDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IInvoiceDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInvoiceDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(invoiceDetails: IInvoiceDetails): IInvoiceDetails {
        const copy: IInvoiceDetails = Object.assign({}, invoiceDetails, {
            createDate:
                invoiceDetails.createDate != null && invoiceDetails.createDate.isValid() ? invoiceDetails.createDate.toJSON() : null,
            updateDate: invoiceDetails.updateDate != null && invoiceDetails.updateDate.isValid() ? invoiceDetails.updateDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((invoiceDetails: IInvoiceDetails) => {
            invoiceDetails.createDate = invoiceDetails.createDate != null ? moment(invoiceDetails.createDate) : null;
            invoiceDetails.updateDate = invoiceDetails.updateDate != null ? moment(invoiceDetails.updateDate) : null;
        });
        return res;
    }
}

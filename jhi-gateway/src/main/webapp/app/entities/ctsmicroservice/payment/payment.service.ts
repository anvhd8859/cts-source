import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPayment } from 'app/shared/model/ctsmicroservice/payment.model';

type EntityResponseType = HttpResponse<IPayment>;
type EntityArrayResponseType = HttpResponse<IPayment[]>;

@Injectable({ providedIn: 'root' })
export class PaymentService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/payments';

    constructor(private http: HttpClient) {}

    create(payment: IPayment): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(payment);
        return this.http
            .post<IPayment>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(payment: IPayment): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(payment);
        return this.http
            .put<IPayment>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPayment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPayment[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(payment: IPayment): IPayment {
        const copy: IPayment = Object.assign({}, payment, {
            createDate: payment.createDate != null && payment.createDate.isValid() ? payment.createDate.toJSON() : null,
            updateDate: payment.updateDate != null && payment.updateDate.isValid() ? payment.updateDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((payment: IPayment) => {
            payment.createDate = payment.createDate != null ? moment(payment.createDate) : null;
            payment.updateDate = payment.updateDate != null ? moment(payment.updateDate) : null;
        });
        return res;
    }
}

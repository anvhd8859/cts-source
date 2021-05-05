import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReceiptnote } from 'app/shared/model/ctsmicroservice/receiptnote.model';
import { IUserReceiptNote } from '.';

type EntityResponseType = HttpResponse<IReceiptnote>;
type EntityArrayResponseType = HttpResponse<IReceiptnote[]>;

@Injectable({ providedIn: 'root' })
export class ReceiptnoteService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/receipt-notes';

    constructor(private http: HttpClient) {}

    create(receiptnote: IReceiptnote): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(receiptnote);
        return this.http
            .post<IReceiptnote>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(receiptnote: IReceiptnote): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(receiptnote);
        return this.http
            .put<IReceiptnote>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IReceiptnote>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IReceiptnote[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    // ThangND
    getReceiveNote(req?: any): Observable<EntityResponseType> {
        return this.http.get<IReceiptnote>(this.resourceUrl + '/by-shipment', { params: req, observe: 'response' });
    }

    getReceiveNoteByInvoiceId(req?: any): Observable<EntityResponseType> {
        return this.http.get<IReceiptnote>(this.resourceUrl + '/by-invoice', { params: req, observe: 'response' });
    }

    getReceiptItemPackage(req?: any): Observable<HttpResponse<any>> {
        return this.http.get<HttpResponse<any>>(this.resourceUrl + '/item-package', { params: req, observe: 'response' });
    }

    createReceiptNoteAndShipmentInvoice(req?: any): any {
        return this.http.post<any>(this.resourceUrl + '/finish-collect', req, { observe: 'response' });
    }

    createReceiptNoteAndFinishInvoice(req?: any): any {
        return this.http.post<any>(this.resourceUrl + '/finish-delivery', req, { observe: 'response' });
    }

    private convertDateFromClient(receiptnote: IReceiptnote): IReceiptnote {
        const copy: IReceiptnote = Object.assign({}, receiptnote, {
            createDate: receiptnote.createDate != null && receiptnote.createDate.isValid() ? receiptnote.createDate.toJSON() : null,
            updateDate: receiptnote.updateDate != null && receiptnote.updateDate.isValid() ? receiptnote.updateDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((receiptnote: IReceiptnote) => {
            receiptnote.createDate = receiptnote.createDate != null ? moment(receiptnote.createDate) : null;
            receiptnote.updateDate = receiptnote.updateDate != null ? moment(receiptnote.updateDate) : null;
        });
        return res;
    }

    getAllReceiptNotConfirmByUser(param: any): Observable<HttpResponse<IUserReceiptNote[]>> {
        const options = createRequestOption(param);
        return this.http
            .get<IUserReceiptNote[]>(this.resourceUrl + '/by-user', { params: options, observe: 'response' })
            .pipe(map((res: HttpResponse<IUserReceiptNote[]>) => this.convertUserNoteArrayFromServer(res)));
    }
    private convertUserNoteArrayFromServer(res: HttpResponse<IUserReceiptNote[]>): HttpResponse<IUserReceiptNote[]> {
        res.body.forEach((userReceiptNote: IUserReceiptNote) => {
            const invoice = userReceiptNote.invoiceHeader;
            const receiptnote = userReceiptNote.receiptNote;

            invoice.dueDate = invoice.dueDate != null ? moment(invoice.dueDate) : null;
            invoice.finishDate = invoice.finishDate != null ? moment(invoice.finishDate) : null;
            invoice.createDate = invoice.createDate != null ? moment(invoice.createDate) : null;
            invoice.updateDate = invoice.updateDate != null ? moment(invoice.updateDate) : null;

            receiptnote.createDate = receiptnote.createDate != null ? moment(receiptnote.createDate) : null;
            receiptnote.updateDate = receiptnote.updateDate != null ? moment(receiptnote.updateDate) : null;
        });
        return res;
    }
}

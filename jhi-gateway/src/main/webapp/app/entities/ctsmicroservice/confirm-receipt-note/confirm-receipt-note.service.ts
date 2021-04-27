import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IConfirmReceiptNote } from 'app/shared/model/ctsmicroservice/confirm-receipt-note.model';

type EntityResponseType = HttpResponse<IConfirmReceiptNote>;
type EntityArrayResponseType = HttpResponse<IConfirmReceiptNote[]>;

@Injectable({ providedIn: 'root' })
export class ConfirmReceiptNoteService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/confirm-receipt-notes';

    constructor(private http: HttpClient) {}

    create(confirmReceiptNote: IConfirmReceiptNote): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(confirmReceiptNote);
        return this.http
            .post<IConfirmReceiptNote>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(confirmReceiptNote: IConfirmReceiptNote): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(confirmReceiptNote);
        return this.http
            .put<IConfirmReceiptNote>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IConfirmReceiptNote>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IConfirmReceiptNote[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(confirmReceiptNote: IConfirmReceiptNote): IConfirmReceiptNote {
        const copy: IConfirmReceiptNote = Object.assign({}, confirmReceiptNote, {
            createDate:
                confirmReceiptNote.createDate != null && confirmReceiptNote.createDate.isValid()
                    ? confirmReceiptNote.createDate.toJSON()
                    : null,
            updateDate:
                confirmReceiptNote.updateDate != null && confirmReceiptNote.updateDate.isValid()
                    ? confirmReceiptNote.updateDate.toJSON()
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
        res.body.forEach((confirmReceiptNote: IConfirmReceiptNote) => {
            confirmReceiptNote.createDate = confirmReceiptNote.createDate != null ? moment(confirmReceiptNote.createDate) : null;
            confirmReceiptNote.updateDate = confirmReceiptNote.updateDate != null ? moment(confirmReceiptNote.updateDate) : null;
        });
        return res;
    }
}

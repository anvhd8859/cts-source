import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReceiptImage } from 'app/shared/model/ctsmicroservice/receipt-image.model';

type EntityResponseType = HttpResponse<IReceiptImage>;
type EntityArrayResponseType = HttpResponse<IReceiptImage[]>;

@Injectable({ providedIn: 'root' })
export class ReceiptImageService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/receipt-images';

    constructor(private http: HttpClient) {}

    create(id: number, file: File): Observable<EntityResponseType> {
        const data: FormData = new FormData();
        data.append('data', file);
        return this.http.post<any>(`${this.resourceUrl}/${id}`, data, {
            reportProgress: true,
            observe: 'response'
        });
    }

    findByNoteId(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IReceiptImage>(`${this.resourceUrl}/note/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(receiptImage: IReceiptImage): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(receiptImage);
        return this.http
            .put<IReceiptImage>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IReceiptImage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IReceiptImage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(receiptImage: IReceiptImage): IReceiptImage {
        const copy: IReceiptImage = Object.assign({}, receiptImage, {
            createDate: receiptImage.createDate != null && receiptImage.createDate.isValid() ? receiptImage.createDate.toJSON() : null,
            updateDate: receiptImage.updateDate != null && receiptImage.updateDate.isValid() ? receiptImage.updateDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((receiptImage: IReceiptImage) => {
            receiptImage.createDate = receiptImage.createDate != null ? moment(receiptImage.createDate) : null;
            receiptImage.updateDate = receiptImage.updateDate != null ? moment(receiptImage.updateDate) : null;
        });
        return res;
    }
}

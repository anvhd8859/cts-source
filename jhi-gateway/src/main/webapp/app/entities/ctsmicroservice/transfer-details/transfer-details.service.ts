import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransferDetails } from 'app/shared/model/ctsmicroservice/transfer-details.model';

type EntityResponseType = HttpResponse<ITransferDetails>;
type EntityArrayResponseType = HttpResponse<ITransferDetails[]>;

@Injectable({ providedIn: 'root' })
export class TransferDetailsService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/transfer-details';

    constructor(private http: HttpClient) {}

    create(transferDetails: ITransferDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(transferDetails);
        return this.http
            .post<ITransferDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(transferDetails: ITransferDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(transferDetails);
        return this.http
            .put<ITransferDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITransferDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITransferDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(transferDetails: ITransferDetails): ITransferDetails {
        const copy: ITransferDetails = Object.assign({}, transferDetails, {
            createDate:
                transferDetails.createDate != null && transferDetails.createDate.isValid() ? transferDetails.createDate.toJSON() : null,
            updateDate:
                transferDetails.updateDate != null && transferDetails.updateDate.isValid() ? transferDetails.updateDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((transferDetails: ITransferDetails) => {
            transferDetails.createDate = transferDetails.createDate != null ? moment(transferDetails.createDate) : null;
            transferDetails.updateDate = transferDetails.updateDate != null ? moment(transferDetails.updateDate) : null;
        });
        return res;
    }
}

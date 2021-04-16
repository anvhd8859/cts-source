import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransferPacking } from 'app/shared/model/ctsmicroservice/transfer-packing.model';

type EntityResponseType = HttpResponse<ITransferPacking>;
type EntityArrayResponseType = HttpResponse<ITransferPacking[]>;

@Injectable({ providedIn: 'root' })
export class TransferPackingService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/transfer-packings';

    constructor(private http: HttpClient) {}

    create(transferPacking: ITransferPacking): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(transferPacking);
        return this.http
            .post<ITransferPacking>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(transferPacking: ITransferPacking): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(transferPacking);
        return this.http
            .put<ITransferPacking>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITransferPacking>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITransferPacking[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(transferPacking: ITransferPacking): ITransferPacking {
        const copy: ITransferPacking = Object.assign({}, transferPacking, {
            packDate: transferPacking.packDate != null && transferPacking.packDate.isValid() ? transferPacking.packDate.toJSON() : null,
            createDate:
                transferPacking.createDate != null && transferPacking.createDate.isValid() ? transferPacking.createDate.toJSON() : null,
            updateDate:
                transferPacking.updateDate != null && transferPacking.updateDate.isValid() ? transferPacking.updateDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.packDate = res.body.packDate != null ? moment(res.body.packDate) : null;
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((transferPacking: ITransferPacking) => {
            transferPacking.packDate = transferPacking.packDate != null ? moment(transferPacking.packDate) : null;
            transferPacking.createDate = transferPacking.createDate != null ? moment(transferPacking.createDate) : null;
            transferPacking.updateDate = transferPacking.updateDate != null ? moment(transferPacking.updateDate) : null;
        });
        return res;
    }
}

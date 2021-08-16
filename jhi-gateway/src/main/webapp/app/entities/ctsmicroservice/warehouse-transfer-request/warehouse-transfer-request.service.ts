import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IWarehouseTransferRequest } from 'app/shared/model/ctsmicroservice/warehouse-transfer-request.model';

type EntityResponseType = HttpResponse<IWarehouseTransferRequest>;
type EntityArrayResponseType = HttpResponse<IWarehouseTransferRequest[]>;

@Injectable({ providedIn: 'root' })
export class WarehouseTransferRequestService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/warehouse-transfer-requests';

    constructor(private http: HttpClient) {}

    create(warehouseTransferRequest: IWarehouseTransferRequest): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(warehouseTransferRequest);
        return this.http
            .post<IWarehouseTransferRequest>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(warehouseTransferRequest: IWarehouseTransferRequest): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(warehouseTransferRequest);
        return this.http
            .put<IWarehouseTransferRequest>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IWarehouseTransferRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IWarehouseTransferRequest[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getWarehouseTransferData(id: number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/full-detail/${id}`, { observe: 'response' });
    }

    approveTransferRequest(param?: any): Observable<HttpResponse<any>> {
        return this.http.post<IWarehouseTransferRequest>(this.resourceUrl + '/approve', param, { observe: 'response' });
    }

    private convertDateFromClient(warehouseTransferRequest: IWarehouseTransferRequest): IWarehouseTransferRequest {
        const copy: IWarehouseTransferRequest = Object.assign({}, warehouseTransferRequest, {
            receiveDate:
                warehouseTransferRequest.receiveDate != null && warehouseTransferRequest.receiveDate.isValid()
                    ? warehouseTransferRequest.receiveDate.toJSON()
                    : null,
            createDate:
                warehouseTransferRequest.createDate != null && warehouseTransferRequest.createDate.isValid()
                    ? warehouseTransferRequest.createDate.toJSON()
                    : null,
            updateDate:
                warehouseTransferRequest.updateDate != null && warehouseTransferRequest.updateDate.isValid()
                    ? warehouseTransferRequest.updateDate.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.receiveDate = res.body.receiveDate != null ? moment(res.body.receiveDate) : null;
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((warehouseTransferRequest: IWarehouseTransferRequest) => {
            warehouseTransferRequest.receiveDate =
                warehouseTransferRequest.receiveDate != null ? moment(warehouseTransferRequest.receiveDate) : null;
            warehouseTransferRequest.createDate =
                warehouseTransferRequest.createDate != null ? moment(warehouseTransferRequest.createDate) : null;
            warehouseTransferRequest.updateDate =
                warehouseTransferRequest.updateDate != null ? moment(warehouseTransferRequest.updateDate) : null;
        });
        return res;
    }

    getWarehouseTransferByOffice(options?: any): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.resourceUrl + '/office', { params: options, observe: 'response' });
    }
}

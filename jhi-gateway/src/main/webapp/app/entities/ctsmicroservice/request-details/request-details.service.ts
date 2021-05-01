import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRequestDetails } from 'app/shared/model/ctsmicroservice/request-details.model';
import { InvoicePackageDetailDTO } from '../import-export-warehouse';

type EntityResponseType = HttpResponse<IRequestDetails>;
type EntityArrayResponseType = HttpResponse<IRequestDetails[]>;

@Injectable({ providedIn: 'root' })
export class RequestDetailsService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/request-details';

    constructor(private http: HttpClient) {}

    create(requestDetails: IRequestDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(requestDetails);
        return this.http
            .post<IRequestDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(requestDetails: IRequestDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(requestDetails);
        return this.http
            .put<IRequestDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRequestDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRequestDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(requestDetails: IRequestDetails): IRequestDetails {
        const copy: IRequestDetails = Object.assign({}, requestDetails, {
            createDate:
                requestDetails.createDate != null && requestDetails.createDate.isValid() ? requestDetails.createDate.toJSON() : null,
            updateDate: requestDetails.updateDate != null && requestDetails.updateDate.isValid() ? requestDetails.updateDate.toJSON() : null
        });
        return copy;
    }

    getRequestDetailsByHeaderId(req?: any): Observable<HttpResponse<InvoicePackageDetailDTO[]>> {
        const options = createRequestOption(req);
        return this.http.get<InvoicePackageDetailDTO[]>(this.resourceUrl + '/header', { params: options, observe: 'response' });
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((requestDetails: IRequestDetails) => {
            requestDetails.createDate = requestDetails.createDate != null ? moment(requestDetails.createDate) : null;
            requestDetails.updateDate = requestDetails.updateDate != null ? moment(requestDetails.updateDate) : null;
        });
        return res;
    }
}

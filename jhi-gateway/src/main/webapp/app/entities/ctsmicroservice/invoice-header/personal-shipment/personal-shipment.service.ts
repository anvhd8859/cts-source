import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPersonalShipment } from 'app/shared/model/ctsmicroservice/personal-shipment.model';

type EntityResponseType = HttpResponse<IPersonalShipment>;
type EntityArrayResponseType = HttpResponse<IPersonalShipment[]>;

@Injectable({ providedIn: 'root' })
export class PersonalShipmentService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/personal-shipments';

    constructor(private http: HttpClient) {}

    create(personalShipment: IPersonalShipment): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(personalShipment);
        return this.http
            .post<IPersonalShipment>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(personalShipment: IPersonalShipment): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(personalShipment);
        return this.http
            .put<IPersonalShipment>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPersonalShipment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPersonalShipment[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(personalShipment: IPersonalShipment): IPersonalShipment {
        const copy: IPersonalShipment = Object.assign({}, personalShipment, {
            shipTime: personalShipment.shipTime != null && personalShipment.shipTime.isValid() ? personalShipment.shipTime.toJSON() : null,
            finishTime:
                personalShipment.finishTime != null && personalShipment.finishTime.isValid() ? personalShipment.finishTime.toJSON() : null,
            createDate:
                personalShipment.createDate != null && personalShipment.createDate.isValid() ? personalShipment.createDate.toJSON() : null,
            updateDate:
                personalShipment.updateDate != null && personalShipment.updateDate.isValid() ? personalShipment.updateDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.shipTime = res.body.shipTime != null ? moment(res.body.shipTime) : null;
        res.body.finishTime = res.body.finishTime != null ? moment(res.body.finishTime) : null;
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((personalShipment: IPersonalShipment) => {
            personalShipment.shipTime = personalShipment.shipTime != null ? moment(personalShipment.shipTime) : null;
            personalShipment.finishTime = personalShipment.finishTime != null ? moment(personalShipment.finishTime) : null;
            personalShipment.createDate = personalShipment.createDate != null ? moment(personalShipment.createDate) : null;
            personalShipment.updateDate = personalShipment.updateDate != null ? moment(personalShipment.updateDate) : null;
        });
        return res;
    }
}
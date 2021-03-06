import { IInvoicePackage } from './../../../../shared/model/ctsmicroservice/invoice-package.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPersonalShipment } from 'app/shared/model/ctsmicroservice/personal-shipment.model';
import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';

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

    // HaiNM
    getAllShipmentByParam(req?: any): Observable<HttpResponse<any>> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl + '/get-all', { params: options, observe: 'response' });
    }

    getAllShipmentByRequestId(req?: any): Observable<HttpResponse<IShipmentInvoice[]>> {
        const options = createRequestOption(req);
        return this.http.get<IShipmentInvoice[]>(this.resourceUrl + '/request-id', { params: options, observe: 'response' });
    }

    getCollectByInvoice(req?: any): Observable<HttpResponse<any>> {
        const options = createRequestOption(req);
        return this.http.get<IShipmentInvoice[]>(this.resourceUrl + '/collect/invoice', { params: options, observe: 'response' });
    }

    getDeliveryByInvoice(req?: any): Observable<HttpResponse<any>> {
        const options = createRequestOption(req);
        return this.http.get<IShipmentInvoice[]>(this.resourceUrl + '/delivery/invoice', { params: options, observe: 'response' });
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

    getPersonalShipmentByShipper(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<any>(this.resourceUrl + '/by-shipper', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayShipInvoice(res)));
    }

    getImportShipmentByShipper(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<any>(this.resourceUrl + '/import/by-shipper', { params: options, observe: 'response' })
            .pipe(map((res: any) => this.convertDateArrayShipInvoice(res)));
    }

    getExportShipmentByShipper(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<any>(this.resourceUrl + '/export/by-shipper', { params: options, observe: 'response' })
            .pipe(map((res: any) => this.convertDateArrayShipInvoice(res)));
    }

    private convertDateArrayShipInvoice(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((shipmentInvoice: any) => {
            shipmentInvoice.invoiceHeaderDTO.dueDate =
                shipmentInvoice.invoiceHeaderDTO.dueDate != null ? moment(shipmentInvoice.invoiceHeaderDTO.dueDate) : null;
            shipmentInvoice.invoiceHeaderDTO.finishDate =
                shipmentInvoice.invoiceHeaderDTO.finishDate != null ? moment(shipmentInvoice.invoiceHeaderDTO.finishDate) : null;
            shipmentInvoice.invoiceHeaderDTO.createDate =
                shipmentInvoice.invoiceHeaderDTO.createDate != null ? moment(shipmentInvoice.invoiceHeaderDTO.createDate) : null;
            shipmentInvoice.invoiceHeaderDTO.updateDate =
                shipmentInvoice.invoiceHeaderDTO.updateDate != null ? moment(shipmentInvoice.invoiceHeaderDTO.updateDate) : null;
            shipmentInvoice.personalShipmentDTO.shipTime =
                shipmentInvoice.personalShipmentDTO.shipTime != null ? moment(shipmentInvoice.personalShipmentDTO.shipTime) : null;
            shipmentInvoice.personalShipmentDTO.finishTime =
                shipmentInvoice.personalShipmentDTO.finishTime != null ? moment(shipmentInvoice.personalShipmentDTO.finishTime) : null;
            shipmentInvoice.personalShipmentDTO.createDate =
                shipmentInvoice.personalShipmentDTO.createDate != null ? moment(shipmentInvoice.personalShipmentDTO.createDate) : null;
            shipmentInvoice.personalShipmentDTO.updateDate =
                shipmentInvoice.personalShipmentDTO.updateDate != null ? moment(shipmentInvoice.personalShipmentDTO.updateDate) : null;
        });
        return res;
    }
}

export interface IShipmentInvoice {
    personalShipmentDTO?: IPersonalShipment;
    invoiceHeaderDTO?: IInvoiceHeader;
}

export interface IShipmentInvoicePackages {
    personalShipmentDTO?: IPersonalShipment;
    invoiceHeaderDTO?: IInvoiceHeader;
    packageList?: IInvoicePackage[];
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInvoicePackageShipment } from '.';
import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';

type EntityResponseType = HttpResponse<IInvoicePackageShipment>;
type EntityArrayResponseType = HttpResponse<IInvoicePackageShipment[]>;

@Injectable({ providedIn: 'root' })
export class ImportInvoicePackageService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/invoice-packages';

    constructor(private http: HttpClient) {}

    create(importInvoicePackage: IInvoicePackageShipment): Observable<EntityResponseType> {
        const copy = importInvoicePackage;
        return this.http
            .post<IInvoicePackageShipment>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(importInvoicePackage: IInvoicePackageShipment): Observable<EntityResponseType> {
        const copy = importInvoicePackage;
        return this.http
            .put<IInvoicePackageShipment>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<any> {
        return this.http
            .get<IInvoiceHeader>(`${SERVER_API_URL + 'ctsmicroservice/api/invoice-headers'}/${id}`, { observe: 'response' })
            .pipe(map((res: any) => this.invoiceDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInvoicePackageShipment[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    // get Import Package By Office Id and Status
    getImportPackage(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInvoicePackageShipment[]>(this.resourceUrl + '/import-package', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    // update list invoice, package, shipment
    updateListInvoicePackageShipment(req?: any): Observable<EntityResponseType> {
        const copy = req;
        return this.http
            .put<IInvoicePackageShipment>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    private invoiceDateFromServer(res: any): any {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
    }

    saveListImportInvoiceHeader(req?: any): any {
        const copy = req;
        return this.http
            .put<IInvoiceHeader>(this.resourceUrl + '/import-invoices', copy, { observe: 'response' })
            .pipe(map((res: any) => this.convertInvoiceArrayDateFromServer(res)));
    }

    private convertInvoiceArrayDateFromServer(res: HttpResponse<IInvoiceHeader[]>): HttpResponse<IInvoiceHeader[]> {
        res.body.forEach((invoiceHeader: IInvoiceHeader) => {
            invoiceHeader.dueDate = invoiceHeader.dueDate != null ? moment(invoiceHeader.dueDate) : null;
            invoiceHeader.finishDate = invoiceHeader.finishDate != null ? moment(invoiceHeader.finishDate) : null;
            invoiceHeader.createDate = invoiceHeader.createDate != null ? moment(invoiceHeader.createDate) : null;
            invoiceHeader.updateDate = invoiceHeader.updateDate != null ? moment(invoiceHeader.updateDate) : null;
        });
        return res;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.invoiceHeader.dueDate = res.body.invoiceHeader.dueDate != null ? moment(res.body.invoiceHeader.dueDate) : null;
        res.body.invoiceHeader.finishDate = res.body.invoiceHeader.finishDate != null ? moment(res.body.invoiceHeader.finishDate) : null;
        res.body.invoiceHeader.createDate = res.body.invoiceHeader.createDate != null ? moment(res.body.invoiceHeader.createDate) : null;
        res.body.invoiceHeader.updateDate = res.body.invoiceHeader.updateDate != null ? moment(res.body.invoiceHeader.updateDate) : null;

        res.body.personalShipment.shipTime = res.body.personalShipment.shipTime != null ? moment(res.body.personalShipment.shipTime) : null;
        res.body.personalShipment.finishTime =
            res.body.personalShipment.finishTime != null ? moment(res.body.personalShipment.finishTime) : null;
        res.body.personalShipment.createDate =
            res.body.personalShipment.createDate != null ? moment(res.body.personalShipment.createDate) : null;
        res.body.personalShipment.updateDate =
            res.body.personalShipment.updateDate != null ? moment(res.body.personalShipment.updateDate) : null;

        for (let i in res.body.invoicePackageList) {
            let crDate = res.body.invoicePackageList[i].createDate;
            let udDate = res.body.invoicePackageList[i].updateDate;
            res.body.invoicePackageList[i].createDate = crDate != null ? moment(crDate) : null;
            res.body.invoicePackageList[i].updateDate = udDate != null ? moment(udDate) : null;
        }
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((invoicePackageShipment: IInvoicePackageShipment) => {
            invoicePackageShipment.invoiceHeader.dueDate =
                invoicePackageShipment.invoiceHeader.dueDate != null ? moment(invoicePackageShipment.invoiceHeader.dueDate) : null;
            invoicePackageShipment.invoiceHeader.finishDate =
                invoicePackageShipment.invoiceHeader.finishDate != null ? moment(invoicePackageShipment.invoiceHeader.finishDate) : null;
            invoicePackageShipment.invoiceHeader.createDate =
                invoicePackageShipment.invoiceHeader.createDate != null ? moment(invoicePackageShipment.invoiceHeader.createDate) : null;
            invoicePackageShipment.invoiceHeader.updateDate =
                invoicePackageShipment.invoiceHeader.updateDate != null ? moment(invoicePackageShipment.invoiceHeader.updateDate) : null;

            invoicePackageShipment.personalShipment.shipTime =
                invoicePackageShipment.personalShipment.shipTime != null ? moment(invoicePackageShipment.personalShipment.shipTime) : null;
            invoicePackageShipment.personalShipment.finishTime =
                invoicePackageShipment.personalShipment.finishTime != null
                    ? moment(invoicePackageShipment.personalShipment.finishTime)
                    : null;
            invoicePackageShipment.personalShipment.createDate =
                invoicePackageShipment.personalShipment.createDate != null
                    ? moment(invoicePackageShipment.personalShipment.createDate)
                    : null;
            invoicePackageShipment.personalShipment.updateDate =
                invoicePackageShipment.personalShipment.updateDate != null
                    ? moment(invoicePackageShipment.personalShipment.updateDate)
                    : null;

            for (let i in invoicePackageShipment.invoicePackageList) {
                let crDate = invoicePackageShipment.invoicePackageList[i].createDate;
                let udDate = invoicePackageShipment.invoicePackageList[i].updateDate;
                invoicePackageShipment.invoicePackageList[i].createDate = crDate != null ? moment(crDate) : null;
                invoicePackageShipment.invoicePackageList[i].updateDate = udDate != null ? moment(udDate) : null;
            }
        });
        return res;
    }
}

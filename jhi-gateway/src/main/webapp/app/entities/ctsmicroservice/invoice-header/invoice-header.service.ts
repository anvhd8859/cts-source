import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { IUser } from 'app/core';
import { ReceiptInvoice } from './receiptnote';

type EntityResponseType = HttpResponse<IInvoiceHeader>;
type EntityArrayResponseType = HttpResponse<IInvoiceHeader[]>;

@Injectable({ providedIn: 'root' })
export class InvoiceHeaderService {
    public userResourceUrl = SERVER_API_URL + 'api/users';
    public packageResourceUrl = SERVER_API_URL + 'ctsmicroservice/api/invoice-packages';
    public detailResourceUrl = SERVER_API_URL + 'ctsmicroservice/api/invoice-details';
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/invoice-headers';
    public receiptEmailURL = SERVER_API_URL + 'api/sendReceiptNoteEmail';
    public notifyShipmentEmail = SERVER_API_URL + 'api/sendNotifyShipmentEmail';
    public notifyShipmentEmailList = SERVER_API_URL + 'api/sendListNotifyShipmentEmail';
    public confirmPaymentEmail = SERVER_API_URL + 'api/sendConfirmPaymentEmail';

    constructor(private http: HttpClient) {}

    create(invoiceHeader: IInvoiceHeader): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(invoiceHeader);
        return this.http
            .post<IInvoiceHeader>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(invoiceHeader: IInvoiceHeader): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(invoiceHeader);
        return this.http
            .put<IInvoiceHeader>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IInvoiceHeader>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInvoiceHeader[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    searchByParam(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInvoiceHeader[]>(this.resourceUrl + '/search', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    getWaitingReview(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInvoiceHeader[]>(this.resourceUrl + '/get-waiting', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    getLstUser(req?: any): Observable<HttpResponse<IUser[]>> {
        const options = createRequestOption(req);
        return this.http.get<IUser[]>(this.userResourceUrl, { params: options, observe: 'response' });
    }

    getListUserByRole(req?: any): Observable<HttpResponse<IUser[]>> {
        const options = createRequestOption(req);
        return this.http.get<IUser[]>(this.userResourceUrl + '/by-role', { params: options, observe: 'response' });
    }

    getListShipperByOfficerId(req?: any): Observable<HttpResponse<IUser[]>> {
        return this.http.get<IUser[]>(this.userResourceUrl + '/shipper-office', { params: req, observe: 'response' });
    }

    getListKeeperByOffice(req: any): Observable<HttpResponse<IUser[]>> {
        return this.http.get<IUser[]>(this.userResourceUrl + '/keeper', { params: req, observe: 'response' });
    }

    createNewInvoice(req?: any, collect?: number): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${this.resourceUrl + '/invoice-detail'}/${collect}`, req, { observe: 'response' });
    }

    updateExistedInvoice(req?: any): Observable<HttpResponse<any>> {
        return this.http.put<any>(this.resourceUrl + '/invoice-detail', req, { observe: 'response' });
    }

    getPackageByInvoiceId(req?: any): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.packageResourceUrl + '/by-invoice-header', { params: req, observe: 'response' });
    }

    getDetailByInvoiceId(req?: any): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.detailResourceUrl + '/by-invoice-header', { params: req, observe: 'response' });
    }

    getInvoiceByUserId(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInvoiceHeader[]>(this.resourceUrl + '/by-customer', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    getUserByID(req?: any): Observable<HttpResponse<IUser>> {
        return this.http.get<IUser>(this.userResourceUrl + '/by-id', { params: req, observe: 'response' });
    }

    updateReviewApproveInvoice(invoiceHeader: IInvoiceHeader): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(invoiceHeader);
        return this.http
            .put<IInvoiceHeader>(this.resourceUrl + '/approve-review', copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    updateReviewRejectInvoice(invoiceHeader: IInvoiceHeader): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(invoiceHeader);
        return this.http
            .put<IInvoiceHeader>(this.resourceUrl + '/reject-review', copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    getInvoiceByWarehouse(options?: any): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.resourceUrl + '/warehouse', { params: options, observe: 'response' });
    }

    private convertDateFromClient(invoiceHeader: IInvoiceHeader): IInvoiceHeader {
        const copy: IInvoiceHeader = Object.assign({}, invoiceHeader, {
            reviewDate: invoiceHeader.reviewDate != null && invoiceHeader.reviewDate.isValid() ? invoiceHeader.reviewDate.toJSON() : null,
            dueDate: invoiceHeader.dueDate != null && invoiceHeader.dueDate.isValid() ? invoiceHeader.dueDate.toJSON() : null,
            finishDate: invoiceHeader.finishDate != null && invoiceHeader.finishDate.isValid() ? invoiceHeader.finishDate.toJSON() : null,
            createDate: invoiceHeader.createDate != null && invoiceHeader.createDate.isValid() ? invoiceHeader.createDate.toJSON() : null,
            updateDate: invoiceHeader.updateDate != null && invoiceHeader.updateDate.isValid() ? invoiceHeader.updateDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.reviewDate = res.body.reviewDate != null ? moment(res.body.reviewDate) : null;
        res.body.dueDate = res.body.dueDate != null ? moment(res.body.dueDate) : null;
        res.body.finishDate = res.body.finishDate != null ? moment(res.body.finishDate) : null;
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((invoiceHeader: IInvoiceHeader) => {
            invoiceHeader.reviewDate = invoiceHeader.reviewDate != null ? moment(invoiceHeader.reviewDate) : null;
            invoiceHeader.dueDate = invoiceHeader.dueDate != null ? moment(invoiceHeader.dueDate) : null;
            invoiceHeader.finishDate = invoiceHeader.finishDate != null ? moment(invoiceHeader.finishDate) : null;
            invoiceHeader.createDate = invoiceHeader.createDate != null ? moment(invoiceHeader.createDate) : null;
            invoiceHeader.updateDate = invoiceHeader.updateDate != null ? moment(invoiceHeader.updateDate) : null;
        });
        return res;
    }

    // AnhVD start
    searchInvoiceByStatus(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInvoiceHeader[]>(this.resourceUrl + '/by-shipper', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }
    // AnhVD end

    // new code for request cancel invoiceHeader
    getAllRequestCancelInvoice(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInvoiceHeader[]>(this.resourceUrl + '/request-cancel', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }
    // end new code

    updateFinishInvoicePersonalShipment(invoiceHeader: IInvoiceHeader): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(invoiceHeader);
        return this.http
            .put<IInvoiceHeader>(this.resourceUrl + '/finish', copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    sendReceiptNoteEmail(param?: ReceiptInvoice): any {
        return this.http.post<any>(this.receiptEmailURL, param, { observe: 'response' });
    }

    sendNotifyShipmentEmail(param?: any): any {
        return this.http.post<any>(this.notifyShipmentEmail, param, { observe: 'response' });
    }

    sendListNotifyShipmentEmail(param?: any): any {
        return this.http.post<any>(this.notifyShipmentEmailList, param, { observe: 'response' });
    }

    sendConfirmPaymentEmail(options?: any): any {
        return this.http.post<any>(this.confirmPaymentEmail, { params: options, observe: 'response' });
    }

    getImportInvoiceByOfficer(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http.get<any>(this.resourceUrl + '/import/by-officer', { params: options, observe: 'response' });
    }
}

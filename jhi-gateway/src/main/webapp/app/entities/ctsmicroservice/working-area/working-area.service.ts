import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IWorkingArea } from 'app/shared/model/ctsmicroservice/working-area.model';

type EntityResponseType = HttpResponse<IWorkingArea>;
type EntityArrayResponseType = HttpResponse<IWorkingArea[]>;

@Injectable({ providedIn: 'root' })
export class WorkingAreaService {
    public resourceUrl = SERVER_API_URL + 'ctsmicroservice/api/working-areas';

    constructor(private http: HttpClient) {}

    create(workingArea: IWorkingArea): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(workingArea);
        return this.http
            .post<IWorkingArea>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(workingArea: IWorkingArea): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(workingArea);
        return this.http
            .put<IWorkingArea>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IWorkingArea>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IWorkingArea[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(workingArea: IWorkingArea): IWorkingArea {
        const copy: IWorkingArea = Object.assign({}, workingArea, {
            createDate: workingArea.createDate != null && workingArea.createDate.isValid() ? workingArea.createDate.toJSON() : null,
            updateDate: workingArea.updateDate != null && workingArea.updateDate.isValid() ? workingArea.updateDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((workingArea: IWorkingArea) => {
            workingArea.createDate = workingArea.createDate != null ? moment(workingArea.createDate) : null;
            workingArea.updateDate = workingArea.updateDate != null ? moment(workingArea.updateDate) : null;
        });
        return res;
    }
}

/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { RequestImportWarehouseService } from 'app/entities/ctsmicroservice/request-import-warehouse/request-import-warehouse.service';
import { IRequestImportWarehouse, RequestImportWarehouse } from 'app/shared/model/ctsmicroservice/request-import-warehouse.model';

describe('Service Tests', () => {
    describe('RequestImportWarehouse Service', () => {
        let injector: TestBed;
        let service: RequestImportWarehouseService;
        let httpMock: HttpTestingController;
        let elemDefault: IRequestImportWarehouse;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(RequestImportWarehouseService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new RequestImportWarehouse(0, 0, 0, 0, 'AAAAAAA', 'AAAAAAA', false, currentDate, currentDate, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        shipDate: currentDate.format(DATE_TIME_FORMAT),
                        createDate: currentDate.format(DATE_TIME_FORMAT),
                        updateDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a RequestImportWarehouse', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        shipDate: currentDate.format(DATE_TIME_FORMAT),
                        createDate: currentDate.format(DATE_TIME_FORMAT),
                        updateDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        shipDate: currentDate,
                        createDate: currentDate,
                        updateDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new RequestImportWarehouse(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a RequestImportWarehouse', async () => {
                const returnedFromService = Object.assign(
                    {
                        officeId: 1,
                        keeperId: 1,
                        employeeId: 1,
                        type: 'BBBBBB',
                        note: 'BBBBBB',
                        keeperConfirm: true,
                        shipDate: currentDate.format(DATE_TIME_FORMAT),
                        createDate: currentDate.format(DATE_TIME_FORMAT),
                        updateDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        shipDate: currentDate,
                        createDate: currentDate,
                        updateDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of RequestImportWarehouse', async () => {
                const returnedFromService = Object.assign(
                    {
                        officeId: 1,
                        keeperId: 1,
                        employeeId: 1,
                        type: 'BBBBBB',
                        note: 'BBBBBB',
                        keeperConfirm: true,
                        shipDate: currentDate.format(DATE_TIME_FORMAT),
                        createDate: currentDate.format(DATE_TIME_FORMAT),
                        updateDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        shipDate: currentDate,
                        createDate: currentDate,
                        updateDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(take(1), map(resp => resp.body))
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a RequestImportWarehouse', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});

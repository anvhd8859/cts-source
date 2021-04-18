/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ITransferPacking, TransferPacking } from 'app/shared/model/ctsmicroservice/transfer-packing.model';
import { TransferPackingService } from 'app/entities/ctsmicroservice/invoice-header/transfer-packing';

describe('Service Tests', () => {
    describe('TransferPacking Service', () => {
        let injector: TestBed;
        let service: TransferPackingService;
        let httpMock: HttpTestingController;
        let elemDefault: ITransferPacking;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(TransferPackingService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new TransferPacking(0, 0, 0, currentDate, 0, 0, 0, 0, 'AAAAAAA', currentDate, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        packDate: currentDate.format(DATE_TIME_FORMAT),
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

            it('should create a TransferPacking', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        packDate: currentDate.format(DATE_TIME_FORMAT),
                        createDate: currentDate.format(DATE_TIME_FORMAT),
                        updateDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        packDate: currentDate,
                        createDate: currentDate,
                        updateDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new TransferPacking(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a TransferPacking', async () => {
                const returnedFromService = Object.assign(
                    {
                        employeeId: 1,
                        invoiceHeaderId: 1,
                        packDate: currentDate.format(DATE_TIME_FORMAT),
                        startHour: 1,
                        startMinute: 1,
                        endHour: 1,
                        endMinute: 1,
                        status: 'BBBBBB',
                        createDate: currentDate.format(DATE_TIME_FORMAT),
                        updateDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        packDate: currentDate,
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

            it('should return a list of TransferPacking', async () => {
                const returnedFromService = Object.assign(
                    {
                        employeeId: 1,
                        invoiceHeaderId: 1,
                        packDate: currentDate.format(DATE_TIME_FORMAT),
                        startHour: 1,
                        startMinute: 1,
                        endHour: 1,
                        endMinute: 1,
                        status: 'BBBBBB',
                        createDate: currentDate.format(DATE_TIME_FORMAT),
                        updateDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        packDate: currentDate,
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

            it('should delete a TransferPacking', async () => {
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

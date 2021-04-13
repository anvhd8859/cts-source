/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { InvoiceHeaderService } from 'app/entities/ctsmicroservice/invoice-header/invoice-header.service';
import { IInvoiceHeader, InvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';

describe('Service Tests', () => {
    describe('InvoiceHeader Service', () => {
        let injector: TestBed;
        let service: InvoiceHeaderService;
        let httpMock: HttpTestingController;
        let elemDefault: IInvoiceHeader;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(InvoiceHeaderService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new InvoiceHeader(
                0,
                0,
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                0,
                'AAAAAAA',
                0,
                0,
                0,
                0,
                'AAAAAAA',
                false,
                'AAAAAAA',
                false,
                'AAAAAAA',
                false,
                currentDate,
                currentDate,
                currentDate,
                currentDate
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dueDate: currentDate.format(DATE_TIME_FORMAT),
                        finishDate: currentDate.format(DATE_TIME_FORMAT),
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

            it('should create a InvoiceHeader', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dueDate: currentDate.format(DATE_TIME_FORMAT),
                        finishDate: currentDate.format(DATE_TIME_FORMAT),
                        createDate: currentDate.format(DATE_TIME_FORMAT),
                        updateDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dueDate: currentDate,
                        finishDate: currentDate,
                        createDate: currentDate,
                        updateDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new InvoiceHeader(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a InvoiceHeader', async () => {
                const returnedFromService = Object.assign(
                    {
                        customerId: 1,
                        officeId: 1,
                        invoiceNo: 'BBBBBB',
                        invoiceType: 'BBBBBB',
                        status: 'BBBBBB',
                        startAddress: 'BBBBBB',
                        startStreetId: 1,
                        destinationAddress: 'BBBBBB',
                        destinationStreetId: 1,
                        subTotal: 1,
                        taxAmount: 1,
                        totalDue: 1,
                        note: 'BBBBBB',
                        cancel: true,
                        cancelReason: 'BBBBBB',
                        customerConfirm: true,
                        changeNote: 'BBBBBB',
                        finish: true,
                        dueDate: currentDate.format(DATE_TIME_FORMAT),
                        finishDate: currentDate.format(DATE_TIME_FORMAT),
                        createDate: currentDate.format(DATE_TIME_FORMAT),
                        updateDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dueDate: currentDate,
                        finishDate: currentDate,
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

            it('should return a list of InvoiceHeader', async () => {
                const returnedFromService = Object.assign(
                    {
                        customerId: 1,
                        officeId: 1,
                        invoiceNo: 'BBBBBB',
                        invoiceType: 'BBBBBB',
                        status: 'BBBBBB',
                        startAddress: 'BBBBBB',
                        startStreetId: 1,
                        destinationAddress: 'BBBBBB',
                        destinationStreetId: 1,
                        subTotal: 1,
                        taxAmount: 1,
                        totalDue: 1,
                        note: 'BBBBBB',
                        cancel: true,
                        cancelReason: 'BBBBBB',
                        customerConfirm: true,
                        changeNote: 'BBBBBB',
                        finish: true,
                        dueDate: currentDate.format(DATE_TIME_FORMAT),
                        finishDate: currentDate.format(DATE_TIME_FORMAT),
                        createDate: currentDate.format(DATE_TIME_FORMAT),
                        updateDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dueDate: currentDate,
                        finishDate: currentDate,
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

            it('should delete a InvoiceHeader', async () => {
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

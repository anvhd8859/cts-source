/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ImportInvoicePackageService } from 'app/entities/ctsmicroservice/import-invoice-package/import-invoice-package.service';
import { IImportInvoicePackage, ImportInvoicePackage } from 'app/shared/model/ctsmicroservice/import-invoice-package.model';

describe('Service Tests', () => {
    describe('ImportInvoicePackage Service', () => {
        let injector: TestBed;
        let service: ImportInvoicePackageService;
        let httpMock: HttpTestingController;
        let elemDefault: IImportInvoicePackage;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ImportInvoicePackageService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new ImportInvoicePackage(0, 0, 0, 0, 0, 0, 0, false, 'AAAAAAA', 'AAAAAAA', 0, currentDate, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
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

            it('should create a ImportInvoicePackage', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        createDate: currentDate.format(DATE_TIME_FORMAT),
                        updateDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        createDate: currentDate,
                        updateDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Object(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });
            it('should update a ImportInvoicePackage', async () => {
                const returnedFromService = Object.assign(
                    {
                        invoiceHeaderId: 1,
                        itemTotal: 1,
                        weight: 1,
                        height: 1,
                        length: 1,
                        width: 1,
                        delivered: true,
                        status: 'BBBBBB',
                        note: 'BBBBBB',
                        warehouseId: 1,
                        createDate: currentDate.format(DATE_TIME_FORMAT),
                        updateDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        createDate: currentDate,
                        updateDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(null)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of ImportInvoicePackage', async () => {
                const returnedFromService = Object.assign(
                    {
                        invoiceHeaderId: 1,
                        itemTotal: 1,
                        weight: 1,
                        height: 1,
                        length: 1,
                        width: 1,
                        delivered: true,
                        status: 'BBBBBB',
                        note: 'BBBBBB',
                        warehouseId: 1,
                        createDate: currentDate.format(DATE_TIME_FORMAT),
                        updateDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
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

            it('should delete a ImportInvoicePackage', async () => {
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

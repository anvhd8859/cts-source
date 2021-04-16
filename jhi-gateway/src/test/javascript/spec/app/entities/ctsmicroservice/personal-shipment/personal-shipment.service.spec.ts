/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IPersonalShipment, PersonalShipment } from 'app/shared/model/ctsmicroservice/personal-shipment.model';
import { PersonalShipmentService } from 'app/entities/ctsmicroservice/invoice-header/personal-shipment';

describe('Service Tests', () => {
    describe('PersonalShipment Service', () => {
        let injector: TestBed;
        let service: PersonalShipmentService;
        let httpMock: HttpTestingController;
        let elemDefault: IPersonalShipment;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PersonalShipmentService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new PersonalShipment(0, 0, 0, 'AAAAAAA', currentDate, currentDate, 'AAAAAAA', currentDate, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        shipTime: currentDate.format(DATE_TIME_FORMAT),
                        finishTime: currentDate.format(DATE_TIME_FORMAT),
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

            it('should create a PersonalShipment', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        shipTime: currentDate.format(DATE_TIME_FORMAT),
                        finishTime: currentDate.format(DATE_TIME_FORMAT),
                        createDate: currentDate.format(DATE_TIME_FORMAT),
                        updateDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        shipTime: currentDate,
                        finishTime: currentDate,
                        createDate: currentDate,
                        updateDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new PersonalShipment(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a PersonalShipment', async () => {
                const returnedFromService = Object.assign(
                    {
                        invoiceHeaderId: 1,
                        employeeId: 1,
                        shipmentType: 'BBBBBB',
                        shipTime: currentDate.format(DATE_TIME_FORMAT),
                        finishTime: currentDate.format(DATE_TIME_FORMAT),
                        status: 'BBBBBB',
                        createDate: currentDate.format(DATE_TIME_FORMAT),
                        updateDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        shipTime: currentDate,
                        finishTime: currentDate,
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

            it('should return a list of PersonalShipment', async () => {
                const returnedFromService = Object.assign(
                    {
                        invoiceHeaderId: 1,
                        employeeId: 1,
                        shipmentType: 'BBBBBB',
                        shipTime: currentDate.format(DATE_TIME_FORMAT),
                        finishTime: currentDate.format(DATE_TIME_FORMAT),
                        status: 'BBBBBB',
                        createDate: currentDate.format(DATE_TIME_FORMAT),
                        updateDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        shipTime: currentDate,
                        finishTime: currentDate,
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

            it('should delete a PersonalShipment', async () => {
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

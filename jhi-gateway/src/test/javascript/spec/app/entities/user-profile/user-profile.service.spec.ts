/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { UserProfileService } from 'app/entities/user-profile/user-profile.service';
import { IUserProfile, UserProfile } from 'app/shared/model/user-profile.model';

describe('Service Tests', () => {
    describe('UserProfile Service', () => {
        let injector: TestBed;
        let service: UserProfileService;
        let httpMock: HttpTestingController;
        let elemDefault: IUserProfile;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(UserProfileService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new UserProfile(0, 0, 'AAAAAAA', 'AAAAAAA', 0, 'AAAAAAA', currentDate, currentDate, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateOfBirth: currentDate.format(DATE_TIME_FORMAT),
                        createdDate: currentDate.format(DATE_TIME_FORMAT),
                        updatedDate: currentDate.format(DATE_TIME_FORMAT)
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

            it('should create a UserProfile', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dateOfBirth: currentDate.format(DATE_TIME_FORMAT),
                        createdDate: currentDate.format(DATE_TIME_FORMAT),
                        updatedDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateOfBirth: currentDate,
                        createdDate: currentDate,
                        updatedDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new UserProfile(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a UserProfile', async () => {
                const returnedFromService = Object.assign(
                    {
                        userId: 1,
                        gender: true,
                        address: 'BBBBBB',
                        streetId: 'BBBBBB',
                        phoneNumber: 'BBBBBB',
                        dateOfBirth: currentDate.format(DATE_TIME_FORMAT),
                        createdDate: currentDate.format(DATE_TIME_FORMAT),
                        updatedDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dateOfBirth: currentDate,
                        createdDate: currentDate,
                        updatedDate: currentDate
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

            it('should return a list of UserProfile', async () => {
                const returnedFromService = Object.assign(
                    {
                        userId: 1,
                        gender: true,
                        address: 'BBBBBB',
                        streetId: 'BBBBBB',
                        phoneNumber: 'BBBBBB',
                        dateOfBirth: currentDate.format(DATE_TIME_FORMAT),
                        createdDate: currentDate.format(DATE_TIME_FORMAT),
                        updatedDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateOfBirth: currentDate,
                        createdDate: currentDate,
                        updatedDate: currentDate
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

            it('should delete a UserProfile', async () => {
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

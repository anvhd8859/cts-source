/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { RequestDetailsService } from 'app/entities/ctsmicroservice/request-details/request-details.service';
import { IRequestDetails, RequestDetails } from 'app/shared/model/ctsmicroservice/request-details.model';

describe('Service Tests', () => {
    describe('RequestDetails Service', () => {
        let injector: TestBed;
        let service: RequestDetailsService;
        let httpMock: HttpTestingController;
        let elemDefault: IRequestDetails;
        let currentDate: moment.Moment;
        beforeEach(() => {
            injector = getTestBed();
            service = injector.get(RequestDetailsService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new RequestDetails();
        });
    });
});

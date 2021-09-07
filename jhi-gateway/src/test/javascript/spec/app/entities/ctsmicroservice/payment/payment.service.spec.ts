/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PaymentService } from 'app/entities/ctsmicroservice/payment/payment.service';
import { IPayment, Payment } from 'app/shared/model/ctsmicroservice/payment.model';

describe('Service Tests', () => {
    describe('Payment Service', () => {
        let injector: TestBed;
        let service: PaymentService;
        let httpMock: HttpTestingController;
        let elemDefault: IPayment;
        let currentDate: moment.Moment;
    });
});

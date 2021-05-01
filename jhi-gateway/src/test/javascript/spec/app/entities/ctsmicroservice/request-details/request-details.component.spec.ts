/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CtsgatewayTestModule } from '../../../../test.module';
import { RequestDetailsComponent } from 'app/entities/ctsmicroservice/request-details/request-details.component';
import { RequestDetailsService } from 'app/entities/ctsmicroservice/request-details/request-details.service';
import { RequestDetails } from 'app/shared/model/ctsmicroservice/request-details.model';

describe('Component Tests', () => {
    describe('RequestDetails Management Component', () => {
        let comp: RequestDetailsComponent;
        let fixture: ComponentFixture<RequestDetailsComponent>;
        let service: RequestDetailsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [RequestDetailsComponent],
                providers: []
            })
                .overrideTemplate(RequestDetailsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RequestDetailsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequestDetailsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new RequestDetails(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.requestDetails[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

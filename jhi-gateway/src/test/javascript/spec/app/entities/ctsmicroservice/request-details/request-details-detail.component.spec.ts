/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { RequestDetailsDetailComponent } from 'app/entities/ctsmicroservice/request-details/request-details-detail.component';
import { RequestDetails } from 'app/shared/model/ctsmicroservice/request-details.model';

describe('Component Tests', () => {
    describe('RequestDetails Management Detail Component', () => {
        let comp: RequestDetailsDetailComponent;
        let fixture: ComponentFixture<RequestDetailsDetailComponent>;
        const route = ({ data: of({ requestDetails: new RequestDetails(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [RequestDetailsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RequestDetailsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RequestDetailsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.requestDetails).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

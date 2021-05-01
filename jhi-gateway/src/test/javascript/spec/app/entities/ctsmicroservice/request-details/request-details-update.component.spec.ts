/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { RequestDetailsUpdateComponent } from 'app/entities/ctsmicroservice/request-details/request-details-update.component';
import { RequestDetailsService } from 'app/entities/ctsmicroservice/request-details/request-details.service';
import { RequestDetails } from 'app/shared/model/ctsmicroservice/request-details.model';

describe('Component Tests', () => {
    describe('RequestDetails Management Update Component', () => {
        let comp: RequestDetailsUpdateComponent;
        let fixture: ComponentFixture<RequestDetailsUpdateComponent>;
        let service: RequestDetailsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [RequestDetailsUpdateComponent]
            })
                .overrideTemplate(RequestDetailsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RequestDetailsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequestDetailsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RequestDetails(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.requestDetails = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RequestDetails();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.requestDetails = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});

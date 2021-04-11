/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { StreetUpdateComponent } from 'app/entities/ctsmicroservice/street/street-update.component';
import { StreetService } from 'app/entities/ctsmicroservice/street/street.service';
import { Street } from 'app/shared/model/ctsmicroservice/street.model';

describe('Component Tests', () => {
    describe('Street Management Update Component', () => {
        let comp: StreetUpdateComponent;
        let fixture: ComponentFixture<StreetUpdateComponent>;
        let service: StreetService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [StreetUpdateComponent]
            })
                .overrideTemplate(StreetUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StreetUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StreetService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Street(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.street = entity;
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
                    const entity = new Street();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.street = entity;
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

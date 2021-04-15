/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { PersonalShipmentUpdateComponent } from 'app/entities/ctsmicroservice/personal-shipment/personal-shipment-update.component';
import { PersonalShipmentService } from 'app/entities/ctsmicroservice/personal-shipment/personal-shipment.service';
import { PersonalShipment } from 'app/shared/model/ctsmicroservice/personal-shipment.model';

describe('Component Tests', () => {
    describe('PersonalShipment Management Update Component', () => {
        let comp: PersonalShipmentUpdateComponent;
        let fixture: ComponentFixture<PersonalShipmentUpdateComponent>;
        let service: PersonalShipmentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [PersonalShipmentUpdateComponent]
            })
                .overrideTemplate(PersonalShipmentUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PersonalShipmentUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonalShipmentService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PersonalShipment(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.personalShipment = entity;
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
                    const entity = new PersonalShipment();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.personalShipment = entity;
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

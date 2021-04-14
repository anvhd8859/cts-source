/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { SubDistrictUpdateComponent } from 'app/entities/ctsmicroservice/sub-district/sub-district-update.component';
import { SubDistrictService } from 'app/entities/ctsmicroservice/sub-district/sub-district.service';
import { SubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';

describe('Component Tests', () => {
    describe('SubDistrict Management Update Component', () => {
        let comp: SubDistrictUpdateComponent;
        let fixture: ComponentFixture<SubDistrictUpdateComponent>;
        let service: SubDistrictService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [SubDistrictUpdateComponent]
            })
                .overrideTemplate(SubDistrictUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SubDistrictUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubDistrictService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SubDistrict(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.subDistrict = entity;
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
                    const entity = new SubDistrict();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.subDistrict = entity;
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

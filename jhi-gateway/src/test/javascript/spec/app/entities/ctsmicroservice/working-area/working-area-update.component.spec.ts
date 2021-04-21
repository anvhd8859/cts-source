/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { WorkingAreaUpdateComponent } from 'app/entities/ctsmicroservice/working-area/working-area-update.component';
import { WorkingAreaService } from 'app/entities/ctsmicroservice/working-area/working-area.service';
import { WorkingArea } from 'app/shared/model/ctsmicroservice/working-area.model';

describe('Component Tests', () => {
    describe('WorkingArea Management Update Component', () => {
        let comp: WorkingAreaUpdateComponent;
        let fixture: ComponentFixture<WorkingAreaUpdateComponent>;
        let service: WorkingAreaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [WorkingAreaUpdateComponent]
            })
                .overrideTemplate(WorkingAreaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WorkingAreaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkingAreaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new WorkingArea(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.workingArea = entity;
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
                    const entity = new WorkingArea();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.workingArea = entity;
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

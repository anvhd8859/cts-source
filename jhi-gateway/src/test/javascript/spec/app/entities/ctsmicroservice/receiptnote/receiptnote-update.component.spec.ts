/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ReceiptnoteUpdateComponent } from 'app/entities/ctsmicroservice/invoice-header/receiptnote/receiptnote-update.component';
import { ReceiptnoteService } from 'app/entities/ctsmicroservice/invoice-header/receiptnote/receiptnote.service';
import { Receiptnote } from 'app/shared/model/ctsmicroservice/receiptnote.model';

describe('Component Tests', () => {
    describe('Receiptnote Management Update Component', () => {
        let comp: ReceiptnoteUpdateComponent;
        let fixture: ComponentFixture<ReceiptnoteUpdateComponent>;
        let service: ReceiptnoteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ReceiptnoteUpdateComponent]
            })
                .overrideTemplate(ReceiptnoteUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReceiptnoteUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiptnoteService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Receiptnote(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.receiptnote = entity;
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
                    const entity = new Receiptnote();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.receiptnote = entity;
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

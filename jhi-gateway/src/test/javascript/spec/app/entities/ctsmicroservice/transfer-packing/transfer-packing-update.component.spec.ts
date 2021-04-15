/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { TransferPackingUpdateComponent } from 'app/entities/ctsmicroservice/transfer-packing/transfer-packing-update.component';
import { TransferPackingService } from 'app/entities/ctsmicroservice/transfer-packing/transfer-packing.service';
import { TransferPacking } from 'app/shared/model/ctsmicroservice/transfer-packing.model';

describe('Component Tests', () => {
    describe('TransferPacking Management Update Component', () => {
        let comp: TransferPackingUpdateComponent;
        let fixture: ComponentFixture<TransferPackingUpdateComponent>;
        let service: TransferPackingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [TransferPackingUpdateComponent]
            })
                .overrideTemplate(TransferPackingUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransferPackingUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransferPackingService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TransferPacking(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transferPacking = entity;
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
                    const entity = new TransferPacking();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transferPacking = entity;
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

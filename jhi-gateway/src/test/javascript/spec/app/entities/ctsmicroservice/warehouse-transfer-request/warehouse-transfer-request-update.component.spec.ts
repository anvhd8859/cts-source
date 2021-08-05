/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { WarehouseTransferRequestUpdateComponent } from 'app/entities/ctsmicroservice/warehouse-transfer-request/warehouse-transfer-request-update.component';
import { WarehouseTransferRequestService } from 'app/entities/ctsmicroservice/warehouse-transfer-request/warehouse-transfer-request.service';
import { WarehouseTransferRequest } from 'app/shared/model/ctsmicroservice/warehouse-transfer-request.model';

describe('Component Tests', () => {
    describe('WarehouseTransferRequest Management Update Component', () => {
        let comp: WarehouseTransferRequestUpdateComponent;
        let fixture: ComponentFixture<WarehouseTransferRequestUpdateComponent>;
        let service: WarehouseTransferRequestService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [WarehouseTransferRequestUpdateComponent]
            })
                .overrideTemplate(WarehouseTransferRequestUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WarehouseTransferRequestUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseTransferRequestService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new WarehouseTransferRequest(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.warehouseTransferRequest = entity;
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
                    const entity = new WarehouseTransferRequest();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.warehouseTransferRequest = entity;
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

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { RequestImportWarehouseShipperUpdateComponent } from 'app/entities/ctsmicroservice/request-import-warehouse/request-import-warehouse-shipper-update.component';
import { RequestImportWarehouseService } from 'app/entities/ctsmicroservice/request-import-warehouse/request-import-warehouse.service';
import { RequestImportWarehouse } from 'app/shared/model/ctsmicroservice/request-import-warehouse.model';

describe('Component Tests', () => {
    describe('RequestImportWarehouse Management Update Component', () => {
        let comp: RequestImportWarehouseShipperUpdateComponent;
        let fixture: ComponentFixture<RequestImportWarehouseShipperUpdateComponent>;
        let service: RequestImportWarehouseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [RequestImportWarehouseShipperUpdateComponent]
            })
                .overrideTemplate(RequestImportWarehouseShipperUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RequestImportWarehouseShipperUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequestImportWarehouseService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RequestImportWarehouse(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    // WHEN
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
                    const entity = new RequestImportWarehouse();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    // WHEN
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});

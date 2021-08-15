/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { RequestExportWarehouseUpdateComponent } from 'app/entities/ctsmicroservice/request-export-warehouse/request-export-warehouse-update.component';
import { RequestExportWarehouseService } from 'app/entities/ctsmicroservice/request-export-warehouse/request-export-warehouse.service';
import { RequestExportWarehouse } from 'app/shared/model/ctsmicroservice/request-export-warehouse.model';

describe('Component Tests', () => {
    describe('RequestExportWarehouse Management Update Component', () => {
        let comp: RequestExportWarehouseUpdateComponent;
        let fixture: ComponentFixture<RequestExportWarehouseUpdateComponent>;
        let service: RequestExportWarehouseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [RequestExportWarehouseUpdateComponent]
            })
                .overrideTemplate(RequestExportWarehouseUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RequestExportWarehouseUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequestExportWarehouseService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RequestExportWarehouse(123);
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
                    const entity = new RequestExportWarehouse();
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

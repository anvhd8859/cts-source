/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ImportExportWarehouseUpdateComponent } from 'app/entities/ctsmicroservice/import-export-warehouse/import-export-warehouse-update.component';
import { ImportExportWarehouseService } from 'app/entities/ctsmicroservice/import-export-warehouse/import-export-warehouse.service';
import { ImportExportWarehouse } from 'app/shared/model/ctsmicroservice/import-export-warehouse.model';

describe('Component Tests', () => {
    describe('ImportExportWarehouse Management Update Component', () => {
        let comp: ImportExportWarehouseUpdateComponent;
        let fixture: ComponentFixture<ImportExportWarehouseUpdateComponent>;
        let service: ImportExportWarehouseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ImportExportWarehouseUpdateComponent]
            })
                .overrideTemplate(ImportExportWarehouseUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ImportExportWarehouseUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImportExportWarehouseService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ImportExportWarehouse(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.importExportWarehouse = entity;
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
                    const entity = new ImportExportWarehouse();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.importExportWarehouse = entity;
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

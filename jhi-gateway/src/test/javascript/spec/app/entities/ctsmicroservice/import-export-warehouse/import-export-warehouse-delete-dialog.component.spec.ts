/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ImportExportWarehouseDeleteDialogComponent } from 'app/entities/ctsmicroservice/import-export-warehouse/import-export-warehouse-delete-dialog.component';
import { ImportExportWarehouseService } from 'app/entities/ctsmicroservice/import-export-warehouse/import-export-warehouse.service';

describe('Component Tests', () => {
    describe('ImportExportWarehouse Management Delete Component', () => {
        let comp: ImportExportWarehouseDeleteDialogComponent;
        let fixture: ComponentFixture<ImportExportWarehouseDeleteDialogComponent>;
        let service: ImportExportWarehouseService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ImportExportWarehouseDeleteDialogComponent]
            })
                .overrideTemplate(ImportExportWarehouseDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ImportExportWarehouseDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImportExportWarehouseService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});

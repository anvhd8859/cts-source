/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import { RequestExportWarehouseDeleteDialogComponent } from 'app/entities/ctsmicroservice/request-export-warehouse/request-export-warehouse-delete-dialog.component';
import { RequestExportWarehouseService } from 'app/entities/ctsmicroservice/request-export-warehouse/request-export-warehouse.service';

describe('Component Tests', () => {
    describe('RequestExportWarehouse Management Delete Component', () => {
        let comp: RequestExportWarehouseDeleteDialogComponent;
        let fixture: ComponentFixture<RequestExportWarehouseDeleteDialogComponent>;
        let service: RequestExportWarehouseService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [RequestExportWarehouseDeleteDialogComponent]
            })
                .overrideTemplate(RequestExportWarehouseDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RequestExportWarehouseDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequestExportWarehouseService);
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

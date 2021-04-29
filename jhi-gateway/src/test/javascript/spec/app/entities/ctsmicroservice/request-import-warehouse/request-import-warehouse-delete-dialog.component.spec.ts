/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import { RequestImportWarehouseDeleteDialogComponent } from 'app/entities/ctsmicroservice/request-import-warehouse/request-import-warehouse-delete-dialog.component';
import { RequestImportWarehouseService } from 'app/entities/ctsmicroservice/request-import-warehouse/request-import-warehouse.service';

describe('Component Tests', () => {
    describe('RequestImportWarehouse Management Delete Component', () => {
        let comp: RequestImportWarehouseDeleteDialogComponent;
        let fixture: ComponentFixture<RequestImportWarehouseDeleteDialogComponent>;
        let service: RequestImportWarehouseService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [RequestImportWarehouseDeleteDialogComponent]
            })
                .overrideTemplate(RequestImportWarehouseDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RequestImportWarehouseDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequestImportWarehouseService);
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

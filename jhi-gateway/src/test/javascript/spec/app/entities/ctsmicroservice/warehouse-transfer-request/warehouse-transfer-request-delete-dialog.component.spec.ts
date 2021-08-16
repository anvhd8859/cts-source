/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import { WarehouseTransferRequestDeleteDialogComponent } from 'app/entities/ctsmicroservice/warehouse-transfer-request/warehouse-transfer-request-delete-dialog.component';
import { WarehouseTransferRequestService } from 'app/entities/ctsmicroservice/warehouse-transfer-request/warehouse-transfer-request.service';

describe('Component Tests', () => {
    describe('WarehouseTransferRequest Management Delete Component', () => {
        let comp: WarehouseTransferRequestDeleteDialogComponent;
        let fixture: ComponentFixture<WarehouseTransferRequestDeleteDialogComponent>;
        let service: WarehouseTransferRequestService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [WarehouseTransferRequestDeleteDialogComponent]
            })
                .overrideTemplate(WarehouseTransferRequestDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WarehouseTransferRequestDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseTransferRequestService);
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

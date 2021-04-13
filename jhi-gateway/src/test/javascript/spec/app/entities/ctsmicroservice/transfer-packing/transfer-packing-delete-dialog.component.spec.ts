/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import { TransferPackingDeleteDialogComponent } from 'app/entities/ctsmicroservice/transfer-packing/transfer-packing-delete-dialog.component';
import { TransferPackingService } from 'app/entities/ctsmicroservice/transfer-packing/transfer-packing.service';

describe('Component Tests', () => {
    describe('TransferPacking Management Delete Component', () => {
        let comp: TransferPackingDeleteDialogComponent;
        let fixture: ComponentFixture<TransferPackingDeleteDialogComponent>;
        let service: TransferPackingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [TransferPackingDeleteDialogComponent]
            })
                .overrideTemplate(TransferPackingDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransferPackingDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransferPackingService);
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

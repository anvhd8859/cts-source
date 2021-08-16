/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import { TransferDetailsDeleteDialogComponent } from 'app/entities/ctsmicroservice/transfer-details/transfer-details-delete-dialog.component';
import { TransferDetailsService } from 'app/entities/ctsmicroservice/transfer-details/transfer-details.service';

describe('Component Tests', () => {
    describe('TransferDetails Management Delete Component', () => {
        let comp: TransferDetailsDeleteDialogComponent;
        let fixture: ComponentFixture<TransferDetailsDeleteDialogComponent>;
        let service: TransferDetailsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [TransferDetailsDeleteDialogComponent]
            })
                .overrideTemplate(TransferDetailsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransferDetailsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransferDetailsService);
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

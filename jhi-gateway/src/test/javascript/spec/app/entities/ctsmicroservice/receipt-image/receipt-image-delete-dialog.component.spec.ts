/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ReceiptImageDeleteDialogComponent } from 'app/entities/ctsmicroservice/receipt-image/receipt-image-delete-dialog.component';
import { ReceiptImageService } from 'app/entities/ctsmicroservice/receipt-image/receipt-image.service';

describe('Component Tests', () => {
    describe('ReceiptImage Management Delete Component', () => {
        let comp: ReceiptImageDeleteDialogComponent;
        let fixture: ComponentFixture<ReceiptImageDeleteDialogComponent>;
        let service: ReceiptImageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ReceiptImageDeleteDialogComponent]
            })
                .overrideTemplate(ReceiptImageDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReceiptImageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiptImageService);
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

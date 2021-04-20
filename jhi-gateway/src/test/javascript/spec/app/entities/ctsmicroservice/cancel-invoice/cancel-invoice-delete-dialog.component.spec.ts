/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import { CancelInvoiceDeleteDialogComponent } from 'app/entities/ctsmicroservice/cancel-invoice/cancel-invoice-delete-dialog.component';
import { CancelInvoiceService } from 'app/entities/ctsmicroservice/cancel-invoice/cancel-invoice.service';
import { CancelInvoice } from 'app/shared/model/ctsmicroservice/cancel-invoice.model';

describe('Component Tests', () => {
    describe('CancelInvoice Management Delete Component', () => {
        let comp: CancelInvoiceDeleteDialogComponent;
        let fixture: ComponentFixture<CancelInvoiceDeleteDialogComponent>;
        let service: CancelInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [CancelInvoiceDeleteDialogComponent]
            })
                .overrideTemplate(CancelInvoiceDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CancelInvoiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CancelInvoiceService);
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
                        const entity = new CancelInvoice(123);
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(entity);
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

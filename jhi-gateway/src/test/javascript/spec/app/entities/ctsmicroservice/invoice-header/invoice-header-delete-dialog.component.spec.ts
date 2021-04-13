/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import { InvoiceHeaderDeleteDialogComponent } from 'app/entities/ctsmicroservice/invoice-header/invoice-header-delete-dialog.component';
import { InvoiceHeaderService } from 'app/entities/ctsmicroservice/invoice-header/invoice-header.service';

describe('Component Tests', () => {
    describe('InvoiceHeader Management Delete Component', () => {
        let comp: InvoiceHeaderDeleteDialogComponent;
        let fixture: ComponentFixture<InvoiceHeaderDeleteDialogComponent>;
        let service: InvoiceHeaderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [InvoiceHeaderDeleteDialogComponent]
            })
                .overrideTemplate(InvoiceHeaderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InvoiceHeaderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceHeaderService);
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

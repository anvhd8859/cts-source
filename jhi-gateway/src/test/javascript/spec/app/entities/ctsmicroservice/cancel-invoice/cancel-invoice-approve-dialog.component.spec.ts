/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import { CancelInvoiceApproveDialogComponent } from 'app/entities/ctsmicroservice/cancel-invoice/cancel-invoice-approve-dialog.component';
import { CancelInvoiceService } from 'app/entities/ctsmicroservice/cancel-invoice/cancel-invoice.service';
import { CancelInvoice } from 'app/shared/model/ctsmicroservice/cancel-invoice.model';
import { HttpResponse } from '@angular/common/http';

describe('Component Tests', () => {
    describe('CancelInvoice Management Approve Component', () => {
        let comp: CancelInvoiceApproveDialogComponent;
        let fixture: ComponentFixture<CancelInvoiceApproveDialogComponent>;
        let service: CancelInvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [CancelInvoiceApproveDialogComponent]
            })
                .overrideTemplate(CancelInvoiceApproveDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CancelInvoiceApproveDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CancelInvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmApprove', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CancelInvoice(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cancelInvoice = entity;
                    // WHEN
                    comp.confirmApprove(entity);
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            );
        });
    });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ReceiptnoteDeleteDialogComponent } from 'app/entities/ctsmicroservice/invoice-header/receiptnote/receiptnote-delete-dialog.component';
import { ReceiptnoteService } from 'app/entities/ctsmicroservice/invoice-header/receiptnote/receiptnote.service';

describe('Component Tests', () => {
    describe('Receiptnote Management Delete Component', () => {
        let comp: ReceiptnoteDeleteDialogComponent;
        let fixture: ComponentFixture<ReceiptnoteDeleteDialogComponent>;
        let service: ReceiptnoteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ReceiptnoteDeleteDialogComponent]
            })
                .overrideTemplate(ReceiptnoteDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReceiptnoteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiptnoteService);
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

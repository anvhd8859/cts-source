/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import { RequestDetailsDeleteDialogComponent } from 'app/entities/ctsmicroservice/request-details/request-details-delete-dialog.component';
import { RequestDetailsService } from 'app/entities/ctsmicroservice/request-details/request-details.service';

describe('Component Tests', () => {
    describe('RequestDetails Management Delete Component', () => {
        let comp: RequestDetailsDeleteDialogComponent;
        let fixture: ComponentFixture<RequestDetailsDeleteDialogComponent>;
        let service: RequestDetailsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [RequestDetailsDeleteDialogComponent]
            })
                .overrideTemplate(RequestDetailsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RequestDetailsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequestDetailsService);
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

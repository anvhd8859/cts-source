/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import {
    PersonalShipmentDeleteDialogComponent,
    PersonalShipmentService
} from 'app/entities/ctsmicroservice/invoice-header/personal-shipment';

describe('Component Tests', () => {
    describe('PersonalShipment Management Delete Component', () => {
        let comp: PersonalShipmentDeleteDialogComponent;
        let fixture: ComponentFixture<PersonalShipmentDeleteDialogComponent>;
        let service: PersonalShipmentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [PersonalShipmentDeleteDialogComponent]
            })
                .overrideTemplate(PersonalShipmentDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PersonalShipmentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonalShipmentService);
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

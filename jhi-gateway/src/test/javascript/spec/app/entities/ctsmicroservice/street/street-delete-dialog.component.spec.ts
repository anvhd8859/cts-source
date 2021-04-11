/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import { StreetDeleteDialogComponent } from 'app/entities/ctsmicroservice/street/street-delete-dialog.component';
import { StreetService } from 'app/entities/ctsmicroservice/street/street.service';

describe('Component Tests', () => {
    describe('Street Management Delete Component', () => {
        let comp: StreetDeleteDialogComponent;
        let fixture: ComponentFixture<StreetDeleteDialogComponent>;
        let service: StreetService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [StreetDeleteDialogComponent]
            })
                .overrideTemplate(StreetDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StreetDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StreetService);
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

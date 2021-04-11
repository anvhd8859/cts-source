/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import { DistrictDeleteDialogComponent } from 'app/entities/ctsmicroservice/district/district-delete-dialog.component';
import { DistrictService } from 'app/entities/ctsmicroservice/district/district.service';

describe('Component Tests', () => {
    describe('District Management Delete Component', () => {
        let comp: DistrictDeleteDialogComponent;
        let fixture: ComponentFixture<DistrictDeleteDialogComponent>;
        let service: DistrictService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [DistrictDeleteDialogComponent]
            })
                .overrideTemplate(DistrictDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DistrictDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DistrictService);
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

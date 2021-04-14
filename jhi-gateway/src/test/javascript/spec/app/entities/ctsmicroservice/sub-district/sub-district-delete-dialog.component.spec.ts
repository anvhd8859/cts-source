/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import { SubDistrictDeleteDialogComponent } from 'app/entities/ctsmicroservice/sub-district/sub-district-delete-dialog.component';
import { SubDistrictService } from 'app/entities/ctsmicroservice/sub-district/sub-district.service';

describe('Component Tests', () => {
    describe('SubDistrict Management Delete Component', () => {
        let comp: SubDistrictDeleteDialogComponent;
        let fixture: ComponentFixture<SubDistrictDeleteDialogComponent>;
        let service: SubDistrictService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [SubDistrictDeleteDialogComponent]
            })
                .overrideTemplate(SubDistrictDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubDistrictDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubDistrictService);
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

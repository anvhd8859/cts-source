/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import { WorkingAreaDeleteDialogComponent } from 'app/entities/ctsmicroservice/working-area/working-area-delete-dialog.component';
import { WorkingAreaService } from 'app/entities/ctsmicroservice/working-area/working-area.service';

describe('Component Tests', () => {
    describe('WorkingArea Management Delete Component', () => {
        let comp: WorkingAreaDeleteDialogComponent;
        let fixture: ComponentFixture<WorkingAreaDeleteDialogComponent>;
        let service: WorkingAreaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [WorkingAreaDeleteDialogComponent]
            })
                .overrideTemplate(WorkingAreaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WorkingAreaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkingAreaService);
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

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import { InvoicePackageDeleteDialogComponent } from 'app/entities/ctsmicroservice/invoice-package/invoice-package-delete-dialog.component';
import { InvoicePackageService } from 'app/entities/ctsmicroservice/invoice-package/invoice-package.service';

describe('Component Tests', () => {
    describe('InvoicePackage Management Delete Component', () => {
        let comp: InvoicePackageDeleteDialogComponent;
        let fixture: ComponentFixture<InvoicePackageDeleteDialogComponent>;
        let service: InvoicePackageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [InvoicePackageDeleteDialogComponent]
            })
                .overrideTemplate(InvoicePackageDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InvoicePackageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoicePackageService);
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

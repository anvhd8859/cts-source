/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ExportInvoicePackageDeleteDialogComponent } from 'app/entities/ctsmicroservice/export-invoice-package/export-invoice-package-delete-dialog.component';
import { ExportInvoicePackageService } from 'app/entities/ctsmicroservice/export-invoice-package/export-invoice-package.service';

describe('Component Tests', () => {
    describe('ExportInvoicePackage Management Delete Component', () => {
        let comp: ExportInvoicePackageDeleteDialogComponent;
        let fixture: ComponentFixture<ExportInvoicePackageDeleteDialogComponent>;
        let service: ExportInvoicePackageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ExportInvoicePackageDeleteDialogComponent]
            })
                .overrideTemplate(ExportInvoicePackageDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ExportInvoicePackageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExportInvoicePackageService);
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

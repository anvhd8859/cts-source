/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ImportInvoicePackageDeleteDialogComponent } from 'app/entities/ctsmicroservice/import-invoice-package/import-invoice-package-delete-dialog.component';
import { ImportInvoicePackageService } from 'app/entities/ctsmicroservice/import-invoice-package/import-invoice-package.service';

describe('Component Tests', () => {
    describe('ImportInvoicePackage Management Delete Component', () => {
        let comp: ImportInvoicePackageDeleteDialogComponent;
        let fixture: ComponentFixture<ImportInvoicePackageDeleteDialogComponent>;
        let service: ImportInvoicePackageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ImportInvoicePackageDeleteDialogComponent]
            })
                .overrideTemplate(ImportInvoicePackageDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ImportInvoicePackageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImportInvoicePackageService);
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

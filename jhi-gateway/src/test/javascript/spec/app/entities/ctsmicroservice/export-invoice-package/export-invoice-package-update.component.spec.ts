/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ExportInvoicePackageUpdateComponent } from 'app/entities/ctsmicroservice/export-invoice-package/export-invoice-package-update.component';
import { ExportInvoicePackageService } from 'app/entities/ctsmicroservice/export-invoice-package/export-invoice-package.service';
import { ExportInvoicePackage } from 'app/shared/model/ctsmicroservice/export-invoice-package.model';

describe('Component Tests', () => {
    describe('ExportInvoicePackage Management Update Component', () => {
        let comp: ExportInvoicePackageUpdateComponent;
        let fixture: ComponentFixture<ExportInvoicePackageUpdateComponent>;
        let service: ExportInvoicePackageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ExportInvoicePackageUpdateComponent]
            })
                .overrideTemplate(ExportInvoicePackageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ExportInvoicePackageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExportInvoicePackageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ExportInvoicePackage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.exportInvoicePackage = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ExportInvoicePackage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.exportInvoicePackage = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});

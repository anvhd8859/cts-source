/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ImportInvoicePackageUpdateComponent } from 'app/entities/ctsmicroservice/import-invoice-package/import-invoice-package-update.component';
import { ImportInvoicePackageService } from 'app/entities/ctsmicroservice/import-invoice-package/import-invoice-package.service';
import { ImportInvoicePackage } from 'app/shared/model/ctsmicroservice/import-invoice-package.model';

describe('Component Tests', () => {
    describe('ImportInvoicePackage Management Update Component', () => {
        let comp: ImportInvoicePackageUpdateComponent;
        let fixture: ComponentFixture<ImportInvoicePackageUpdateComponent>;
        let service: ImportInvoicePackageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ImportInvoicePackageUpdateComponent]
            })
                .overrideTemplate(ImportInvoicePackageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ImportInvoicePackageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImportInvoicePackageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ImportInvoicePackage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.importInvoicePackage = entity;
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
                    const entity = new ImportInvoicePackage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.importInvoicePackage = entity;
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

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { InvoicePackageUpdateComponent } from 'app/entities/ctsmicroservice/invoice-header/invoice-package/invoice-package-update.component';
import { InvoicePackageService } from 'app/entities/ctsmicroservice/invoice-header/invoice-package/invoice-package.service';
import { InvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';

describe('Component Tests', () => {
    describe('InvoicePackage Management Update Component', () => {
        let comp: InvoicePackageUpdateComponent;
        let fixture: ComponentFixture<InvoicePackageUpdateComponent>;
        let service: InvoicePackageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [InvoicePackageUpdateComponent]
            })
                .overrideTemplate(InvoicePackageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InvoicePackageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoicePackageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new InvoicePackage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.invoicePackage = entity;
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
                    const entity = new InvoicePackage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.invoicePackage = entity;
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

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { InvoiceHeaderUpdateComponent } from 'app/entities/ctsmicroservice/invoice-header/invoice-header-update.component';
import { InvoiceHeaderService } from 'app/entities/ctsmicroservice/invoice-header/invoice-header.service';
import { InvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';

describe('Component Tests', () => {
    describe('InvoiceHeader Management Update Component', () => {
        let comp: InvoiceHeaderUpdateComponent;
        let fixture: ComponentFixture<InvoiceHeaderUpdateComponent>;
        let service: InvoiceHeaderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [InvoiceHeaderUpdateComponent]
            })
                .overrideTemplate(InvoiceHeaderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InvoiceHeaderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceHeaderService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new InvoiceHeader(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.invoiceHeader = entity;
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
                    const entity = new InvoiceHeader();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.invoiceHeader = entity;
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

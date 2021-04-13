/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { InvoiceDetailsUpdateComponent } from 'app/entities/ctsmicroservice/invoice-details/invoice-details-update.component';
import { InvoiceDetailsService } from 'app/entities/ctsmicroservice/invoice-details/invoice-details.service';
import { InvoiceDetails } from 'app/shared/model/ctsmicroservice/invoice-details.model';

describe('Component Tests', () => {
    describe('InvoiceDetails Management Update Component', () => {
        let comp: InvoiceDetailsUpdateComponent;
        let fixture: ComponentFixture<InvoiceDetailsUpdateComponent>;
        let service: InvoiceDetailsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [InvoiceDetailsUpdateComponent]
            })
                .overrideTemplate(InvoiceDetailsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InvoiceDetailsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceDetailsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new InvoiceDetails(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.invoiceDetails = entity;
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
                    const entity = new InvoiceDetails();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.invoiceDetails = entity;
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

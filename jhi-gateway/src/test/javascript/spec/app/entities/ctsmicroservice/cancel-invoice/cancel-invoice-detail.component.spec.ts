/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { CancelInvoiceDetailComponent } from 'app/entities/ctsmicroservice/cancel-invoice/cancel-invoice-detail.component';
import { CancelInvoice } from 'app/shared/model/ctsmicroservice/cancel-invoice.model';

describe('Component Tests', () => {
    describe('CancelInvoice Management Detail Component', () => {
        let comp: CancelInvoiceDetailComponent;
        let fixture: ComponentFixture<CancelInvoiceDetailComponent>;
        const route = ({ data: of({ cancelInvoice: new CancelInvoice(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [CancelInvoiceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CancelInvoiceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CancelInvoiceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cancelInvoice).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

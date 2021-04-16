/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { InvoicePackageDetailComponent } from 'app/entities/ctsmicroservice/invoice-header/invoice-package/invoice-package-detail.component';
import { InvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';

describe('Component Tests', () => {
    describe('InvoicePackage Management Detail Component', () => {
        let comp: InvoicePackageDetailComponent;
        let fixture: ComponentFixture<InvoicePackageDetailComponent>;
        const route = ({ data: of({ invoicePackage: new InvoicePackage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [InvoicePackageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InvoicePackageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InvoicePackageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.invoicePackage).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

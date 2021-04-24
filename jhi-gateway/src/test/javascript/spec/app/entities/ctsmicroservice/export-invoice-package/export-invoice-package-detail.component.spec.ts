/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ExportInvoicePackageDetailComponent } from 'app/entities/ctsmicroservice/export-invoice-package/export-invoice-package-detail.component';
import { ExportInvoicePackage } from 'app/shared/model/ctsmicroservice/export-invoice-package.model';

describe('Component Tests', () => {
    describe('ExportInvoicePackage Management Detail Component', () => {
        let comp: ExportInvoicePackageDetailComponent;
        let fixture: ComponentFixture<ExportInvoicePackageDetailComponent>;
        const route = ({ data: of({ exportInvoicePackage: new ExportInvoicePackage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ExportInvoicePackageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ExportInvoicePackageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ExportInvoicePackageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.exportInvoicePackage).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ImportInvoicePackageDetailComponent } from 'app/entities/ctsmicroservice/import-invoice-package/import-invoice-package-detail.component';
import { ImportInvoicePackage } from 'app/shared/model/ctsmicroservice/import-invoice-package.model';

describe('Component Tests', () => {
    describe('ImportInvoicePackage Management Detail Component', () => {
        let comp: ImportInvoicePackageDetailComponent;
        let fixture: ComponentFixture<ImportInvoicePackageDetailComponent>;
        const route = ({ data: of({ importInvoicePackage: new ImportInvoicePackage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ImportInvoicePackageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ImportInvoicePackageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ImportInvoicePackageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.importInvoicePackage).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

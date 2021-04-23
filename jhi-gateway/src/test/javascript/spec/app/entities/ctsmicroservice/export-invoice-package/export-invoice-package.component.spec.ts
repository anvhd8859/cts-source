/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ExportInvoicePackageComponent } from 'app/entities/ctsmicroservice/export-invoice-package/export-invoice-package.component';
import { ExportInvoicePackageService } from 'app/entities/ctsmicroservice/export-invoice-package/export-invoice-package.service';
import { ExportInvoicePackage } from 'app/shared/model/ctsmicroservice/export-invoice-package.model';

describe('Component Tests', () => {
    describe('ExportInvoicePackage Management Component', () => {
        let comp: ExportInvoicePackageComponent;
        let fixture: ComponentFixture<ExportInvoicePackageComponent>;
        let service: ExportInvoicePackageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ExportInvoicePackageComponent],
                providers: []
            })
                .overrideTemplate(ExportInvoicePackageComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ExportInvoicePackageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExportInvoicePackageService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ExportInvoicePackage(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.exportInvoicePackages[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ImportInvoicePackageComponent } from 'app/entities/ctsmicroservice/import-invoice-package/import-invoice-package.component';
import { ImportInvoicePackageService } from 'app/entities/ctsmicroservice/import-invoice-package/import-invoice-package.service';
import { ImportInvoicePackage } from 'app/shared/model/ctsmicroservice/import-invoice-package.model';

describe('Component Tests', () => {
    describe('ImportInvoicePackage Management Component', () => {
        let comp: ImportInvoicePackageComponent;
        let fixture: ComponentFixture<ImportInvoicePackageComponent>;
        let service: ImportInvoicePackageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ImportInvoicePackageComponent],
                providers: []
            })
                .overrideTemplate(ImportInvoicePackageComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ImportInvoicePackageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImportInvoicePackageService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ImportInvoicePackage(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
        });
    });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CtsgatewayTestModule } from '../../../../test.module';
import { InvoicePackageComponent } from 'app/entities/ctsmicroservice/invoice-header/invoice-package/invoice-package.component';
import { InvoicePackageService } from 'app/entities/ctsmicroservice/invoice-header/invoice-package/invoice-package.service';
import { InvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';

describe('Component Tests', () => {
    describe('InvoicePackage Management Component', () => {
        let comp: InvoicePackageComponent;
        let fixture: ComponentFixture<InvoicePackageComponent>;
        let service: InvoicePackageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [InvoicePackageComponent],
                providers: []
            })
                .overrideTemplate(InvoicePackageComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InvoicePackageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoicePackageService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new InvoicePackage(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.invoicePackages[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

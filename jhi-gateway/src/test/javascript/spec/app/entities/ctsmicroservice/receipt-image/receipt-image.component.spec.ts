/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ReceiptImageComponent } from 'app/entities/ctsmicroservice/receipt-image/receipt-image.component';
import { ReceiptImageService } from 'app/entities/ctsmicroservice/receipt-image/receipt-image.service';
import { ReceiptImage } from 'app/shared/model/ctsmicroservice/receipt-image.model';

describe('Component Tests', () => {
    describe('ReceiptImage Management Component', () => {
        let comp: ReceiptImageComponent;
        let fixture: ComponentFixture<ReceiptImageComponent>;
        let service: ReceiptImageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ReceiptImageComponent],
                providers: []
            })
                .overrideTemplate(ReceiptImageComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReceiptImageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiptImageService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ReceiptImage(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.receiptImages[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

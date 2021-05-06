/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ReceiptImageDetailComponent } from 'app/entities/ctsmicroservice/receipt-image/receipt-image-detail.component';
import { ReceiptImage } from 'app/shared/model/ctsmicroservice/receipt-image.model';

describe('Component Tests', () => {
    describe('ReceiptImage Management Detail Component', () => {
        let comp: ReceiptImageDetailComponent;
        let fixture: ComponentFixture<ReceiptImageDetailComponent>;
        const route = ({ data: of({ receiptImage: new ReceiptImage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ReceiptImageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ReceiptImageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReceiptImageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.receiptImage).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

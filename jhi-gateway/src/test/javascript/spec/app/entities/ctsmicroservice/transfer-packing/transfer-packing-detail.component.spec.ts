/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { TransferPacking } from 'app/shared/model/ctsmicroservice/transfer-packing.model';
import { TransferPackingDetailComponent } from 'app/entities/ctsmicroservice/invoice-header/transfer-packing';

describe('Component Tests', () => {
    describe('TransferPacking Management Detail Component', () => {
        let comp: TransferPackingDetailComponent;
        let fixture: ComponentFixture<TransferPackingDetailComponent>;
        const route = ({ data: of({ transferPacking: new TransferPacking(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [TransferPackingDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TransferPackingDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransferPackingDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.transferPacking).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

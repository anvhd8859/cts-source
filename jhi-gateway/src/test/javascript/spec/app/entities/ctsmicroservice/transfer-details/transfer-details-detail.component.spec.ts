/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { TransferDetailsDetailComponent } from 'app/entities/ctsmicroservice/transfer-details/transfer-details-detail.component';
import { TransferDetails } from 'app/shared/model/ctsmicroservice/transfer-details.model';

describe('Component Tests', () => {
    describe('TransferDetails Management Detail Component', () => {
        let comp: TransferDetailsDetailComponent;
        let fixture: ComponentFixture<TransferDetailsDetailComponent>;
        const route = ({ data: of({ transferDetails: new TransferDetails(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [TransferDetailsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TransferDetailsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransferDetailsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.transferDetails).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { WarehouseTransferRequestDetailComponent } from 'app/entities/ctsmicroservice/warehouse-transfer-request/warehouse-transfer-request-detail.component';
import { WarehouseTransferRequest } from 'app/shared/model/ctsmicroservice/warehouse-transfer-request.model';

describe('Component Tests', () => {
    describe('WarehouseTransferRequest Management Detail Component', () => {
        let comp: WarehouseTransferRequestDetailComponent;
        let fixture: ComponentFixture<WarehouseTransferRequestDetailComponent>;
        const route = ({ data: of({ warehouseTransferRequest: new WarehouseTransferRequest(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [WarehouseTransferRequestDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(WarehouseTransferRequestDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WarehouseTransferRequestDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
            });
        });
    });
});

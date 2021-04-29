/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { RequestExportWarehouseDetailComponent } from 'app/entities/ctsmicroservice/request-export-warehouse/request-export-warehouse-detail.component';
import { RequestExportWarehouse } from 'app/shared/model/ctsmicroservice/request-export-warehouse.model';

describe('Component Tests', () => {
    describe('RequestExportWarehouse Management Detail Component', () => {
        let comp: RequestExportWarehouseDetailComponent;
        let fixture: ComponentFixture<RequestExportWarehouseDetailComponent>;
        const route = ({ data: of({ requestExportWarehouse: new RequestExportWarehouse(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [RequestExportWarehouseDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RequestExportWarehouseDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RequestExportWarehouseDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.requestExportWarehouse).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

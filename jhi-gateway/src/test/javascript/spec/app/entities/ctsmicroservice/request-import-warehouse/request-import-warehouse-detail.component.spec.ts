/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { RequestImportWarehouseDetailComponent } from 'app/entities/ctsmicroservice/request-import-warehouse/request-import-warehouse-detail.component';
import { RequestImportWarehouse } from 'app/shared/model/ctsmicroservice/request-import-warehouse.model';

describe('Component Tests', () => {
    describe('RequestImportWarehouse Management Detail Component', () => {
        let comp: RequestImportWarehouseDetailComponent;
        let fixture: ComponentFixture<RequestImportWarehouseDetailComponent>;
        const route = ({ data: of({ requestImportWarehouse: new RequestImportWarehouse(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [RequestImportWarehouseDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RequestImportWarehouseDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RequestImportWarehouseDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.requestImportWarehouse).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

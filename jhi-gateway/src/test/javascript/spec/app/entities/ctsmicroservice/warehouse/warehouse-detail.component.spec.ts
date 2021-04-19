/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { WarehouseDetailComponent } from 'app/entities/ctsmicroservice/warehouse/warehouse-detail.component';
import { Warehouse } from 'app/shared/model/ctsmicroservice/warehouse.model';

describe('Component Tests', () => {
    describe('Warehouse Management Detail Component', () => {
        let comp: WarehouseDetailComponent;
        let fixture: ComponentFixture<WarehouseDetailComponent>;
        const route = ({ data: of({ warehouse: new Warehouse(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [WarehouseDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(WarehouseDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WarehouseDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.warehouse).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

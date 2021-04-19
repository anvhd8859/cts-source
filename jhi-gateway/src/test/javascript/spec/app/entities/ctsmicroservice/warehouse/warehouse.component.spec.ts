/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CtsgatewayTestModule } from '../../../../test.module';
import { WarehouseComponent } from 'app/entities/ctsmicroservice/warehouse/warehouse.component';
import { WarehouseService } from 'app/entities/ctsmicroservice/warehouse/warehouse.service';
import { Warehouse } from 'app/shared/model/ctsmicroservice/warehouse.model';

describe('Component Tests', () => {
    describe('Warehouse Management Component', () => {
        let comp: WarehouseComponent;
        let fixture: ComponentFixture<WarehouseComponent>;
        let service: WarehouseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [WarehouseComponent],
                providers: []
            })
                .overrideTemplate(WarehouseComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WarehouseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Warehouse(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.warehouses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

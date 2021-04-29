/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ImportExportWarehouseDetailComponent } from 'app/entities/ctsmicroservice/import-export-warehouse/import-export-warehouse-detail.component';
import { ImportExportWarehouse } from 'app/shared/model/ctsmicroservice/import-export-warehouse.model';

describe('Component Tests', () => {
    describe('ImportExportWarehouse Management Detail Component', () => {
        let comp: ImportExportWarehouseDetailComponent;
        let fixture: ComponentFixture<ImportExportWarehouseDetailComponent>;
        const route = ({ data: of({ importExportWarehouse: new ImportExportWarehouse(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ImportExportWarehouseDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ImportExportWarehouseDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ImportExportWarehouseDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.importExportWarehouse).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

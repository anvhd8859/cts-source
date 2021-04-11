/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { DistrictDetailComponent } from 'app/entities/ctsmicroservice/district/district-detail.component';
import { District } from 'app/shared/model/ctsmicroservice/district.model';

describe('Component Tests', () => {
    describe('District Management Detail Component', () => {
        let comp: DistrictDetailComponent;
        let fixture: ComponentFixture<DistrictDetailComponent>;
        const route = ({ data: of({ district: new District(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [DistrictDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DistrictDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DistrictDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.district).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

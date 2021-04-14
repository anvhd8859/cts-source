/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { SubDistrictDetailComponent } from 'app/entities/ctsmicroservice/sub-district/sub-district-detail.component';
import { SubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';

describe('Component Tests', () => {
    describe('SubDistrict Management Detail Component', () => {
        let comp: SubDistrictDetailComponent;
        let fixture: ComponentFixture<SubDistrictDetailComponent>;
        const route = ({ data: of({ subDistrict: new SubDistrict(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [SubDistrictDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SubDistrictDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubDistrictDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.subDistrict).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ShiftDetailComponent } from 'app/entities/ctsmicroservice/shift/shift-detail.component';
import { Shift } from 'app/shared/model/ctsmicroservice/shift.model';

describe('Component Tests', () => {
    describe('Shift Management Detail Component', () => {
        let comp: ShiftDetailComponent;
        let fixture: ComponentFixture<ShiftDetailComponent>;
        const route = ({ data: of({ shift: new Shift(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ShiftDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ShiftDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ShiftDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.shift).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

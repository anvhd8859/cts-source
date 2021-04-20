/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { WorkingAreaDetailComponent } from 'app/entities/ctsmicroservice/working-area/working-area-detail.component';
import { WorkingArea } from 'app/shared/model/ctsmicroservice/working-area.model';

describe('Component Tests', () => {
    describe('WorkingArea Management Detail Component', () => {
        let comp: WorkingAreaDetailComponent;
        let fixture: ComponentFixture<WorkingAreaDetailComponent>;
        const route = ({ data: of({ workingArea: new WorkingArea(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [WorkingAreaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(WorkingAreaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WorkingAreaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.workingArea).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

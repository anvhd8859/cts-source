/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CtsgatewayTestModule } from '../../../../test.module';
import { WorkingAreaComponent } from 'app/entities/ctsmicroservice/working-area/working-area.component';
import { WorkingAreaService } from 'app/entities/ctsmicroservice/working-area/working-area.service';
import { WorkingArea } from 'app/shared/model/ctsmicroservice/working-area.model';

describe('Component Tests', () => {
    describe('WorkingArea Management Component', () => {
        let comp: WorkingAreaComponent;
        let fixture: ComponentFixture<WorkingAreaComponent>;
        let service: WorkingAreaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [WorkingAreaComponent],
                providers: []
            })
                .overrideTemplate(WorkingAreaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WorkingAreaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkingAreaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new WorkingArea(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
        });
    });
});

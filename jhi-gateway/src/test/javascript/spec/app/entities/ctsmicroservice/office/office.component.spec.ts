/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CtsgatewayTestModule } from '../../../../test.module';
import { OfficeComponent } from 'app/entities/ctsmicroservice/office/office.component';
import { OfficeService } from 'app/entities/ctsmicroservice/office/office.service';
import { Office } from 'app/shared/model/ctsmicroservice/office.model';

describe('Component Tests', () => {
    describe('Office Management Component', () => {
        let comp: OfficeComponent;
        let fixture: ComponentFixture<OfficeComponent>;
        let service: OfficeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [OfficeComponent],
                providers: []
            })
                .overrideTemplate(OfficeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OfficeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfficeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Office(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.offices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

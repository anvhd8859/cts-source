/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ReceiptnoteDetailComponent } from 'app/entities/ctsmicroservice/invoice-header/receiptnote/receiptnote-detail.component';
import { Receiptnote } from 'app/shared/model/ctsmicroservice/receiptnote.model';

describe('Component Tests', () => {
    describe('Receiptnote Management Detail Component', () => {
        let comp: ReceiptnoteDetailComponent;
        let fixture: ComponentFixture<ReceiptnoteDetailComponent>;
        const route = ({ data: of({ receiptnote: new Receiptnote() }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ReceiptnoteDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ReceiptnoteDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReceiptnoteDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.receiptnote).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

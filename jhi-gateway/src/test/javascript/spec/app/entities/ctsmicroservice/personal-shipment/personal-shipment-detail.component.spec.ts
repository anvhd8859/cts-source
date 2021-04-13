/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { PersonalShipmentDetailComponent } from 'app/entities/ctsmicroservice/personal-shipment/personal-shipment-detail.component';
import { PersonalShipment } from 'app/shared/model/ctsmicroservice/personal-shipment.model';

describe('Component Tests', () => {
    describe('PersonalShipment Management Detail Component', () => {
        let comp: PersonalShipmentDetailComponent;
        let fixture: ComponentFixture<PersonalShipmentDetailComponent>;
        const route = ({ data: of({ personalShipment: new PersonalShipment(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [PersonalShipmentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PersonalShipmentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PersonalShipmentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.personalShipment).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

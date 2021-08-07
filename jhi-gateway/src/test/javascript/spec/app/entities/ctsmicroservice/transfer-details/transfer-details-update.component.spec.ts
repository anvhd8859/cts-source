/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { TransferDetailsUpdateComponent } from 'app/entities/ctsmicroservice/transfer-details/transfer-details-update.component';
import { TransferDetailsService } from 'app/entities/ctsmicroservice/transfer-details/transfer-details.service';
import { TransferDetails } from 'app/shared/model/ctsmicroservice/transfer-details.model';

describe('Component Tests', () => {
    describe('TransferDetails Management Update Component', () => {
        let comp: TransferDetailsUpdateComponent;
        let fixture: ComponentFixture<TransferDetailsUpdateComponent>;
        let service: TransferDetailsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [TransferDetailsUpdateComponent]
            })
                .overrideTemplate(TransferDetailsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransferDetailsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransferDetailsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TransferDetails(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transferDetails = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TransferDetails();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transferDetails = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});

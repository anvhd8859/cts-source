/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ReceiptImageUpdateComponent } from 'app/entities/ctsmicroservice/receipt-image/receipt-image-update.component';
import { ReceiptImageService } from 'app/entities/ctsmicroservice/receipt-image/receipt-image.service';
import { ReceiptImage } from 'app/shared/model/ctsmicroservice/receipt-image.model';

describe('Component Tests', () => {
    describe('ReceiptImage Management Update Component', () => {
        let comp: ReceiptImageUpdateComponent;
        let fixture: ComponentFixture<ReceiptImageUpdateComponent>;
        let service: ReceiptImageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ReceiptImageUpdateComponent]
            })
                .overrideTemplate(ReceiptImageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReceiptImageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiptImageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ReceiptImage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.receiptImage = entity;
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
                    const entity = new ReceiptImage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.receiptImage = entity;
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

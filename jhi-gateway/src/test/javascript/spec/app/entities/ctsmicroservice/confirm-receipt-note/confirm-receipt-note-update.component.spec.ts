/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ConfirmReceiptNoteUpdateComponent } from 'app/entities/ctsmicroservice/confirm-receipt-note/confirm-receipt-note-update.component';
import { ConfirmReceiptNoteService } from 'app/entities/ctsmicroservice/confirm-receipt-note/confirm-receipt-note.service';
import { ConfirmReceiptNote } from 'app/shared/model/ctsmicroservice/confirm-receipt-note.model';

describe('Component Tests', () => {
    describe('ConfirmReceiptNote Management Update Component', () => {
        let comp: ConfirmReceiptNoteUpdateComponent;
        let fixture: ComponentFixture<ConfirmReceiptNoteUpdateComponent>;
        let service: ConfirmReceiptNoteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ConfirmReceiptNoteUpdateComponent]
            })
                .overrideTemplate(ConfirmReceiptNoteUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConfirmReceiptNoteUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConfirmReceiptNoteService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ConfirmReceiptNote(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.confirmReceiptNote = entity;
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
                    const entity = new ConfirmReceiptNote();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.confirmReceiptNote = entity;
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

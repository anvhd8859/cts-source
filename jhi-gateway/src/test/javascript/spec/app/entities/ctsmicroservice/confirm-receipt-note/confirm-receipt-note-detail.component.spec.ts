/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CtsgatewayTestModule } from '../../../../test.module';
import { ConfirmReceiptNoteDetailComponent } from 'app/entities/ctsmicroservice/confirm-receipt-note/confirm-receipt-note-detail.component';
import { ConfirmReceiptNote } from 'app/shared/model/ctsmicroservice/confirm-receipt-note.model';

describe('Component Tests', () => {
    describe('ConfirmReceiptNote Management Detail Component', () => {
        let comp: ConfirmReceiptNoteDetailComponent;
        let fixture: ComponentFixture<ConfirmReceiptNoteDetailComponent>;
        const route = ({ data: of({ confirmReceiptNote: new ConfirmReceiptNote(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [ConfirmReceiptNoteDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ConfirmReceiptNoteDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConfirmReceiptNoteDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.confirmReceiptNote).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CtsgatewayTestModule } from '../../../../test.module';
import { WarehouseTransferRequestComponent } from 'app/entities/ctsmicroservice/warehouse-transfer-request/warehouse-transfer-request.component';
import { WarehouseTransferRequestService } from 'app/entities/ctsmicroservice/warehouse-transfer-request/warehouse-transfer-request.service';
import { WarehouseTransferRequest } from 'app/shared/model/ctsmicroservice/warehouse-transfer-request.model';

describe('Component Tests', () => {
    describe('WarehouseTransferRequest Management Component', () => {
        let comp: WarehouseTransferRequestComponent;
        let fixture: ComponentFixture<WarehouseTransferRequestComponent>;
        let service: WarehouseTransferRequestService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CtsgatewayTestModule],
                declarations: [WarehouseTransferRequestComponent],
                providers: []
            })
                .overrideTemplate(WarehouseTransferRequestComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WarehouseTransferRequestComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseTransferRequestService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new WarehouseTransferRequest(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.warehouseTransferRequests[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

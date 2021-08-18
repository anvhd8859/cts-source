import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IOffice } from 'app/shared/model/ctsmicroservice/office.model';
import { IWarehouse, Warehouse } from 'app/shared/model/ctsmicroservice/warehouse.model';
import { WarehouseService } from './warehouse.service';
import { OfficeService } from 'app/entities/ctsmicroservice/office/office.service';
import { AccountService, IUser, User, UserService } from 'app/core';
import { IDistrict } from 'app/shared/model/ctsmicroservice/district.model';
import { IProvince } from 'app/shared/model/ctsmicroservice/province.model';
import { IStreet } from 'app/shared/model/ctsmicroservice/street.model';
import { ISubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-warehouse-update',
    templateUrl: './warehouse-update.component.html'
})
export class WarehouseUpdateComponent implements OnInit {
    offices: IOffice[];
    selectedOffice: IOffice;
    warehouse: IWarehouse;
    whLst: IWarehouse[];
    isSaving: boolean;
    createDate: string;
    updateDate: string;
    lstUser: IUser[] = [];
    lstProvinceFrom: IProvince[] = [];
    lstDistrictFrom: IDistrict[] = [];
    lstSubDistrictFrom: ISubDistrict[] = [];
    lstStreetFrom: IStreet[] = [];
    selectedProvinceFrom: any;
    selectedDistrictFrom: any;
    selectedSubDistrictFrom: any;
    selectedStreetFrom: any;
    selectedAddressFrom: any;
    selectedUser: IUser;
    selectedUserProfile: IUserProfile;

    constructor(
        private warehouseService: WarehouseService,
        private userService: UserService,
        private accountService: AccountService,
        private officeService: OfficeService,
        private activatedRoute: ActivatedRoute,
        private alertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.warehouse = new Warehouse();
        this.selectedUser = new User();
        this.selectedUser.firstName = '';
        this.selectedUser.lastName = '';
        this.activatedRoute.data.subscribe(({ warehouse }) => {
            this.warehouse = warehouse;
            this.createDate = this.warehouse.createDate != null ? this.warehouse.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.warehouse.updateDate != null ? this.warehouse.updateDate.format(DATE_TIME_FORMAT) : null;
        });
        forkJoin(this.accountService.getLstCity(), this.officeService.query({ page: 0, size: 999 })).subscribe(res => {
            this.lstProvinceFrom = res[0].body;
            this.offices = res[1].body;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        const msg = this.validate();
        if (!msg) {
            this.isSaving = true;
            this.warehouse.officeId = this.selectedOffice.id;
            this.warehouse.address = this.selectedOffice.address;
            this.warehouse.streetId = this.selectedOffice.streetId;
            if (this.warehouse.id !== undefined) {
                this.subscribeToSaveResponse(this.warehouseService.update(this.warehouse));
            } else {
                this.subscribeToSaveResponse(this.warehouseService.create(this.warehouse));
            }
        } else {
            window.scroll(0, 0);
            this.alertService.error(msg);
        }
    }

    validate() {
        let msg = '';
        if (!this.warehouse.warehouseName) {
            msg += 'Trường tên kho hàng đang trống <br>';
        }
        if (!this.selectedOffice) {
            msg += 'Trường văn phòng đang trống <br>';
        }
        return msg;
    }

    changeUser() {
        this.userService.getAllKeeperUserByOfficeID({ id: this.selectedOffice.id }).subscribe(res => {
            this.lstUser = res.body;
            this.selectedUser = this.lstUser[0];
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IWarehouse>>) {
        result.subscribe((res: HttpResponse<IWarehouse>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

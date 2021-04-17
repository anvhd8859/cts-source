import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { forkJoin, from, Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { InvoiceHeaderService } from './invoice-header.service';
import { AccountService, IUser } from 'app/core';
import { IDistrict } from 'app/shared/model/ctsmicroservice/district.model';
import { IProvince } from 'app/shared/model/ctsmicroservice/province.model';
import { IStreet } from 'app/shared/model/ctsmicroservice/street.model';
import { ISubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';
import { JhiAlertService } from 'ng-jhipster';
import { IUserProfile } from 'app/shared/model/user-profile.model';

@Component({
    selector: 'jhi-invoice-header-update',
    templateUrl: './invoice-header-update.component.html'
})
export class InvoiceHeaderUpdateComponent implements OnInit {
    invoiceHeader: IInvoiceHeader;
    isSaving: boolean;
    dueDate: string;
    finishDate: string;
    createDate: string;
    updateDate: string;
    lstUser: IUser[] = [];
    lstProvinceFrom: IProvince[] = [];
    lstDistrictFrom: IDistrict[] = [];
    lstSubDistrictFrom: ISubDistrict[] = [];
    lstStreetFrom: IStreet[] = [];
    lstProvinceTo: IProvince[] = [];
    lstDistrictTo: IDistrict[] = [];
    lstSubDistrictTo: ISubDistrict[] = [];
    lstStreetTo: IStreet[] = [];
    selectedProvinceFrom: any;
    selectedDistrictFrom: any;
    selectedSubDistrictFrom: any;
    selectedStreetFrom: any;
    selectedAddressFrom: any;
    selectedProvinceTo: any;
    selectedDistrictTo: any;
    selectedSubDistrictTo: any;
    selectedStreetTo: any;
    selectedAddressTo: any;
    selectedUserProfile: IUserProfile;
    lstIvnType: any = [{ id: 'Personal', text: 'Personal Shippemnt' }, { id: 'Transfer', text: 'House Transfer' }];
    lstStatus: any = [{ id: 'New', text: 'New' }, { id: 'Shipped', text: 'Shipped' }, { id: 'Cancelled', text: 'Cancelled' }];

    constructor(
        private invoiceHeaderService: InvoiceHeaderService,
        private accountService: AccountService,
        private activatedRoute: ActivatedRoute,
        private alertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ invoiceHeader }) => {
            this.invoiceHeader = invoiceHeader;
            this.dueDate = this.invoiceHeader.dueDate != null ? this.invoiceHeader.dueDate.format(DATE_TIME_FORMAT) : null;
            this.finishDate = this.invoiceHeader.finishDate != null ? this.invoiceHeader.finishDate.format(DATE_TIME_FORMAT) : null;
            this.createDate = this.invoiceHeader.createDate != null ? this.invoiceHeader.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.invoiceHeader.updateDate != null ? this.invoiceHeader.updateDate.format(DATE_TIME_FORMAT) : null;
        });
        forkJoin(this.invoiceHeaderService.getLstUser(), this.accountService.getLstCity()).subscribe(res => {
            this.lstUser = res[0].body.filter(e => e.authorities.filter(i => i === 'ROLE_USER'));
            this.lstProvinceFrom = res[1].body;
            this.lstProvinceTo = res[1].body;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        const msg = this.validateInput();
        if (msg === '') {
            this.isSaving = true;
            this.invoiceHeader.startAddress =
                this.selectedAddressFrom +
                ' | ' +
                this.selectedStreetFrom.streetName +
                ', ' +
                this.selectedSubDistrictFrom.subDistrictName +
                ', ' +
                this.selectedDistrictFrom.districtName +
                ', ' +
                this.selectedProvinceFrom.provinceName;
            this.invoiceHeader.destinationAddress =
                this.selectedAddressTo +
                ' | ' +
                this.selectedStreetTo.streetName +
                ', ' +
                this.selectedSubDistrictTo.subDistrictName +
                ', ' +
                this.selectedDistrictTo.districtName +
                ', ' +
                this.selectedProvinceTo.provinceName;
            this.invoiceHeader.dueDate = this.dueDate != null ? moment(this.dueDate, DATE_TIME_FORMAT) : null;
            this.invoiceHeader.finishDate = this.finishDate != null ? moment(this.finishDate, DATE_TIME_FORMAT) : null;
            this.invoiceHeader.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
            this.invoiceHeader.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
            if (this.invoiceHeader.id !== undefined) {
                this.subscribeToSaveResponse(this.invoiceHeaderService.update(this.invoiceHeader));
            } else {
                this.subscribeToSaveResponse(this.invoiceHeaderService.create(this.invoiceHeader));
            }
        } else {
            window.scroll(0, 0);
            this.alertService.error(msg);
        }
    }

    validateInput(): string {
        let msg = '';
        if (!this.selectedAddressFrom || this.selectedAddressFrom.trim() === '') {
            msg += 'From Address must not be blank! <br>';
        }
        if (!this.selectedStreetFrom) {
            msg += 'From Street must not be blank! <br>';
        }
        if (!this.selectedSubDistrictFrom) {
            msg += 'From Ward/Commune must not be blank! <br>';
        }
        if (!this.selectedDistrictFrom) {
            msg += 'From District must not be blank! <br>';
        }
        if (!this.selectedProvinceFrom) {
            msg += 'From Province/City must not be blank! <br>';
        }
        if (!this.selectedAddressTo || this.selectedAddressTo.trim() === '') {
            msg += 'To Address must not be blank! <br>';
        }
        if (!this.selectedStreetTo) {
            msg += 'To Street must not be blank! <br>';
        }
        if (!this.selectedSubDistrictTo) {
            msg += 'To Ward/Commune must not be blank! <br>';
        }
        if (!this.selectedDistrictTo) {
            msg += 'To District must not be blank! <br>';
        }
        if (!this.selectedProvinceTo) {
            msg += 'To Province/City must not be blank! <br>';
        }
        if (!this.invoiceHeader.customerId) {
            msg += 'Customer must not be blank! <br>';
        }
        if (!this.invoiceHeader.invoiceType) {
            msg += 'Type of Invoice must not be blank! <br>';
        }
        if (!this.invoiceHeader.status) {
            msg += 'Status of Invoice must not be blank! <br>';
        }
        return msg;
    }

    // ThangND Start
    changeCity(opt: any) {
        if (opt === 'from') {
            this.lstDistrictFrom = null;
            this.selectedDistrictFrom = null;
            this.lstSubDistrictFrom = null;
            this.selectedSubDistrictFrom = null;
            this.lstStreetFrom = null;
            this.selectedStreetFrom = null;
            const param = { provinceId: this.selectedProvinceFrom.id };
            this.accountService.getLstDistrictByCity(param).subscribe(res => {
                this.lstDistrictFrom = res.body;
            });
        } else if (opt === 'to') {
            this.lstDistrictTo = null;
            this.selectedDistrictTo = null;
            this.lstSubDistrictTo = null;
            this.selectedSubDistrictTo = null;
            this.lstStreetTo = null;
            this.selectedStreetTo = null;
            const param = { provinceId: this.selectedProvinceTo.id };
            this.accountService.getLstDistrictByCity(param).subscribe(res => {
                this.lstDistrictTo = res.body;
            });
        }
    }

    changeDistrict(opt: any) {
        if (opt === 'from') {
            this.lstSubDistrictFrom = null;
            this.selectedSubDistrictFrom = null;
            this.lstStreetFrom = null;
            this.selectedStreetFrom = null;
            const param = { id: this.selectedDistrictFrom.id };
            this.accountService.getLstWardByDistrict(param).subscribe(res => {
                this.lstSubDistrictFrom = res.body;
            });
        } else if (opt === 'to') {
            this.lstSubDistrictTo = null;
            this.selectedSubDistrictTo = null;
            this.lstStreetTo = null;
            this.selectedStreetTo = null;
            const param = { id: this.selectedDistrictTo.id };
            this.accountService.getLstWardByDistrict(param).subscribe(res => {
                this.lstSubDistrictTo = res.body;
            });
        }
    }

    changeSubDistrict(opt: any) {
        if (opt === 'from') {
            this.lstStreetFrom = null;
            this.selectedStreetFrom = null;
            const param = { id: this.selectedSubDistrictFrom.id };
            this.accountService.getLstStreetByWard(param).subscribe(res => {
                this.lstStreetFrom = res.body;
            });
        } else if (opt === 'to') {
            this.lstStreetTo = null;
            this.selectedStreetTo = null;
            const param = { id: this.selectedSubDistrictTo.id };
            this.accountService.getLstStreetByWard(param).subscribe(res => {
                this.lstStreetTo = res.body;
            });
        }
    }
    // ThangND End

    private subscribeToSaveResponse(result: Observable<HttpResponse<IInvoiceHeader>>) {
        result.subscribe((res: HttpResponse<IInvoiceHeader>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

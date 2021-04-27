import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { forkJoin, from, Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IInvoiceHeader } from 'app/shared/model/ctsmicroservice/invoice-header.model';
import { InvoiceHeaderService } from './invoice-header.service';
import { AccountService, IUser, Principal } from 'app/core';
import { IDistrict } from 'app/shared/model/ctsmicroservice/district.model';
import { IProvince } from 'app/shared/model/ctsmicroservice/province.model';
import { IStreet } from 'app/shared/model/ctsmicroservice/street.model';
import { ISubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';
import { JhiAlertService } from 'ng-jhipster';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { IInvoiceDetails, InvoiceDetails } from 'app/shared/model/ctsmicroservice/invoice-details.model';
import { IInvoicePackage, InvoicePackage } from 'app/shared/model/ctsmicroservice/invoice-package.model';

@Component({
    selector: 'jhi-invoice-header-user-update',
    templateUrl: './invoice-header-user-update.component.html'
})
export class InvoiceHeaderUserUpdateComponent implements OnInit {
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
    selectedUser: IUser;
    selectedUserProfile: IUserProfile;
    lstIvnType: any = [{ id: 'personal', text: 'Personal Shippemnt' }];
    lstStatus: any = [
        { id: 'Pending', text: 'Pending' },
        { id: 'New', text: 'New' },
        { id: 'Shipped', text: 'Shipped' },
        { id: 'Cancelled', text: 'Cancelled' }
    ];
    lstCollect: any = [{ id: '1', text: 'Collect From Home' }, { id: '0', text: 'Drop By Office' }];
    selectedCollect: any;
    // HaiNM
    lstInvoicePackage: IInvoicePackage[] = [];
    invPackageCount: number;
    lstInvoiceDetails: IInvoiceDetails[] = [];
    invDetailCount: number;
    // HaiNM

    constructor(
        private invoiceHeaderService: InvoiceHeaderService,
        private accountService: AccountService,
        private activatedRoute: ActivatedRoute,
        private alertService: JhiAlertService,
        private principal: Principal
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
        forkJoin(this.principal.identity(), this.accountService.getLstCity()).subscribe(res => {
            (this.selectedUser = res[0]), (this.lstProvinceFrom = res[1].body);
            this.lstProvinceTo = res[1].body;
            this.changeUser();
        });
    }

    // HaiNM
    addNewInvoiceDetailElement() {
        this.invDetailCount++;
        const obj = new InvoiceDetails(null, null, '', '', null, null, null, null, '', '', '', null, null);
        this.lstInvoiceDetails.push(obj);
        console.log(this.lstInvoiceDetails);
    }

    removeInvoiceDetailElement(index: any) {
        this.invDetailCount--;
        this.lstInvoiceDetails.splice(index, 1);
        console.log(this.lstInvoiceDetails);
    }

    addNewInvoicePackageElement() {
        this.invPackageCount++;
        const obj = new InvoicePackage(null, null, null, null, null, null, null, false, 'New', '', null, null, null);
        this.lstInvoicePackage.push(obj);
        console.log(this.lstInvoicePackage);
    }

    removeInvoicePackageElement(index: any) {
        this.invPackageCount--;
        this.lstInvoicePackage.splice(index, 1);
        console.log(this.lstInvoicePackage);
    }
    // HaiNM

    previousState() {
        window.history.back();
    }

    save() {
        const msg = this.validateInput();
        if (msg === '') {
            this.isSaving = true;
            if (!this.invoiceHeader.id) {
                this.invoiceHeader.startAddress =
                    this.selectedAddressFrom +
                    ', ' +
                    (this.selectedStreetFrom ? this.selectedStreetFrom.streetName : '') +
                    ', ' +
                    (this.selectedSubDistrictFrom ? this.selectedSubDistrictFrom.subDistrictName : '') +
                    ', ' +
                    (this.selectedDistrictFrom ? this.selectedDistrictFrom.districtName : '') +
                    ', ' +
                    (this.selectedProvinceFrom ? this.selectedProvinceFrom.provinceName : '');
                this.invoiceHeader.destinationAddress =
                    this.selectedAddressTo +
                    ', ' +
                    (this.selectedStreetTo ? this.selectedStreetTo.streetName : '') +
                    ', ' +
                    (this.selectedSubDistrictTo ? this.selectedSubDistrictTo.subDistrictName : '') +
                    ', ' +
                    (this.selectedDistrictTo ? this.selectedDistrictTo.districtName : '') +
                    ', ' +
                    (this.selectedProvinceTo ? this.selectedProvinceTo.provinceName : '');
            }
            const postObject = {
                header: this.invoiceHeader,
                lstDetail: this.lstInvoiceDetails,
                lstPackage: this.lstInvoicePackage
            };
            this.invoiceHeader.status = 'new';
            this.invoiceHeader.customerId = this.selectedUser.id;
            this.invoiceHeader.dueDate = this.dueDate != null ? moment(this.dueDate, DATE_TIME_FORMAT) : null;
            this.invoiceHeader.finishDate = this.finishDate != null ? moment(this.finishDate, DATE_TIME_FORMAT) : null;
            this.invoiceHeader.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
            this.invoiceHeader.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
            // if (this.invoiceHeader.id !== undefined) {
            //     this.subscribeToSaveResponse(this.invoiceHeaderService.update(this.invoiceHeader));
            // } else {
            //     this.subscribeToSaveResponse(this.invoiceHeaderService.create(this.invoiceHeader));
            // }
            if (this.invoiceHeader.id !== undefined) {
                this.subscribeToSaveResponse(this.invoiceHeaderService.updateExistedInvoice(postObject));
            } else {
                this.subscribeToSaveResponse(this.invoiceHeaderService.createNewInvoice(postObject, this.selectedCollect));
            }
        } else {
            window.scroll(0, 0);
            this.alertService.error(msg);
        }
    }

    validateInput(): string {
        let msg = '';
        if ((!this.selectedAddressFrom || this.selectedAddressFrom.trim() === '') && !this.invoiceHeader.id) {
            msg += 'From Address must not be blank! <br>';
        } else if (!this.selectedAddressFrom || this.selectedAddressFrom.trim() === '') {
            msg += 'From Address must not be blank! <br>';
        }
        if (!this.selectedStreetFrom && !this.invoiceHeader.id) {
            msg += 'From Street must not be blank! <br>';
        }
        if (!this.selectedSubDistrictFrom && !this.invoiceHeader.id) {
            msg += 'From Ward/Commune must not be blank! <br>';
        }
        if (!this.selectedDistrictFrom && !this.invoiceHeader.id) {
            msg += 'From District must not be blank! <br>';
        }
        if (!this.selectedProvinceFrom && !this.invoiceHeader.id) {
            msg += 'From Province/City must not be blank! <br>';
        }
        if ((!this.selectedAddressTo || this.selectedAddressTo.trim() === '') && !this.invoiceHeader.id) {
            msg += 'To Address must not be blank! <br>';
        } else if (!this.selectedAddressTo || this.selectedAddressTo.trim() === '') {
            msg += 'To Address must not be blank! <br>';
        }
        if (!this.selectedStreetTo && !this.invoiceHeader.id) {
            msg += 'To Street must not be blank! <br>';
        }
        if (!this.selectedSubDistrictTo && !this.invoiceHeader.id) {
            msg += 'To Ward/Commune must not be blank! <br>';
        }
        if (!this.selectedDistrictTo && !this.invoiceHeader.id) {
            msg += 'To District must not be blank! <br>';
        }
        if (!this.selectedProvinceTo && !this.invoiceHeader.id) {
            msg += 'To Province/City must not be blank! <br>';
        }
        if (!this.selectedUser) {
            msg += 'Customer must not be blank! <br>';
        }
        this.invoiceHeader.invoiceType = 'personal';
        return msg;
    }

    // ThangND Start
    changeUser() {
        this.accountService.findByUserID({ id: this.selectedUser.id }).subscribe(res => {
            this.selectedUserProfile = res.body;
        });
    }

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

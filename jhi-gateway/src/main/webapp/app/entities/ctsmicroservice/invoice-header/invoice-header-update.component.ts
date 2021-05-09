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
import { PackageDetailsDTO } from '.';
import { CommonString } from 'app/shared';

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
    selectedUser: IUser;
    selectedUserProfile: IUserProfile;
    lstInvStatus: any = new CommonString().listStatusInvoice;
    lstCollect: any = [{ id: '1', text: 'Lấy hàng tại nhà' }, { id: '0', text: 'Mang hàng đến bưu cục' }];
    selectedCollect = 0;
    lstPayer: any = [{ id: '0', text: 'Người gửi thanh toán' }, { id: '1', text: 'Người nhận thanh toán' }];
    selectedPayer: any;
    createPackage: PackageDetailsDTO[] = [];
    invoicePackage: IInvoicePackage;
    invPackageCount = 0;
    lstInvoicePackage: IInvoiceDetails[] = [];
    lstInvoiceDetails: IInvoiceDetails[] = [];
    invDetailCount = 0;
    currentUser: IUser;
    currentProfile: IUserProfile;
    vnf_regex = /(09|03|07|08|05)([0-9]{8})/g;

    constructor(
        private invoiceHeaderService: InvoiceHeaderService,
        private accountService: AccountService,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
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
            if (this.invoiceHeader.id) {
                forkJoin(
                    this.invoiceHeaderService.getPackageByInvoiceId({ id: this.invoiceHeader.id }),
                    this.invoiceHeaderService.getDetailByInvoiceId({ id: this.invoiceHeader.id })
                ).subscribe(res => {
                    this.lstInvoicePackage = res[0].body;
                    this.lstInvoiceDetails = res[1].body;
                    for (const i in this.lstInvoicePackage) {
                        if (this.lstInvoicePackage.hasOwnProperty(i)) {
                            const obj = new PackageDetailsDTO();
                            obj.invPackage = this.lstInvoicePackage[i];
                            for (const itemObj of this.lstInvoiceDetails) {
                                if (obj.invPackage.id === itemObj.invoicePackageId) {
                                    obj.itemList.push(itemObj);
                                }
                            }
                            this.createPackage.push(obj);
                        }
                    }
                });
            }
        });
        forkJoin(this.invoiceHeaderService.getLstUser(), this.accountService.getLstCity(), this.principal.identity()).subscribe(res => {
            this.lstUser = res[0].body.filter(e => e.authorities.filter(i => i === 'ROLE_USER'));
            this.lstProvinceFrom = res[1].body;
            this.lstProvinceTo = res[1].body;
            this.currentUser = res[2];
            this.accountService.findByUserID({ id: this.currentUser.id }).subscribe(profile => {
                this.currentProfile = profile.body;
            });
            if (this.invoiceHeader.id) {
                this.selectedUser = this.lstUser.find(e => e.id === this.invoiceHeader.customerId);
                this.changeUser();
            }
        });
    }

    previousState() {
        window.history.back();
    }

    // HaiNM
    addNewPackageDetailsDTO() {
        const obj = new PackageDetailsDTO();
        this.createPackage.push(obj);
    }
    removeNewPackageDetailsDTO(index: any) {
        this.createPackage.splice(index, 1);
    }
    addNewInvoiceDetailElement(packageIndex: any) {
        const obj = new InvoiceDetails();
        this.createPackage[packageIndex].itemList.push(obj);
    }
    removeInvoiceDetailElement(packageIndex: any, index) {
        this.createPackage[packageIndex].itemList.splice(index, 1);
    }
    // HaiNM

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
                this.invoiceHeader.startStreetId = this.selectedStreetFrom.id;
                this.invoiceHeader.destinationStreetId = this.selectedStreetTo.id;
                this.invoiceHeader.officeId = this.currentProfile.officeId;
                this.invoiceHeader.employeeId = this.currentUser.id;
            }
            this.invoiceHeader.status = 'collected';
            this.invoiceHeader.customerId = this.selectedUser.id;
            this.invoiceHeader.receiverPay = this.selectedPayer === '1' ? true : false;
            let wei = 0;
            for (const i of this.createPackage) {
                wei += i.invPackage.weight;
            }
            this.invoiceHeader.note = '';
            this.invoiceHeader.note += ' - Tổng trọng lượng: ' + wei + ' (g); ';
            this.invoiceHeader.dueDate = this.dueDate != null ? moment(this.dueDate, DATE_TIME_FORMAT) : null;
            this.invoiceHeader.finishDate = this.finishDate != null ? moment(this.finishDate, DATE_TIME_FORMAT) : null;
            this.invoiceHeader.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
            this.invoiceHeader.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
            const postObject = {
                invoice: this.invoiceHeader,
                packageList: this.createPackage
            };
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
            msg += 'Mục Địa chỉ lấy hàng không được để Trống! <br>';
        } else if (!this.selectedAddressFrom || this.selectedAddressFrom.trim() === '') {
            msg += 'Mục Địa chỉ lấy hàng không được để Trống! <br>';
        }
        if (!this.selectedStreetFrom && !this.invoiceHeader.id) {
            msg += 'Mục Đường/Phố lấy hàng không được để Trống! <br>';
        }
        if (!this.selectedSubDistrictFrom && !this.invoiceHeader.id) {
            msg += 'Mục Phường/Xã lấy hàng không được để Trống! <br>';
        }
        if (!this.selectedDistrictFrom && !this.invoiceHeader.id) {
            msg += 'Mục Quận/Huyện lấy hàng không được để Trống! <br>';
        }
        if (!this.selectedProvinceFrom && !this.invoiceHeader.id) {
            msg += 'Mục Tỉnh/Thành phố lấy hàng không được để Trống! <br>';
        }
        if ((!this.selectedAddressTo || this.selectedAddressTo.trim() === '') && !this.invoiceHeader.id) {
            msg += 'Mục Địa chỉ giao hàng không được để Trống! <br>';
        } else if (!this.selectedAddressTo || this.selectedAddressTo.trim() === '') {
            msg += 'Mục Địa chỉ giao hàng không được để Trống! <br>';
        }
        if (!this.selectedStreetTo && !this.invoiceHeader.id) {
            msg += 'Mục Đường/Phố giao hàng không được để Trống! <br>';
        }
        if (!this.selectedSubDistrictTo && !this.invoiceHeader.id) {
            msg += 'Mục Phường/Xã giao hàng không được để Trống! <br>';
        }
        if (!this.selectedDistrictTo && !this.invoiceHeader.id) {
            msg += 'Mục Quận/Huyện giao hàng không được để Trống! <br>';
        }
        if (!this.selectedProvinceTo && !this.invoiceHeader.id) {
            msg += 'Mục Tỉnh/Thành phố giao hành không được để Trống! <br>';
        }
        if (!this.selectedUser) {
            msg += 'Mục Khách hàng không được để Trống! <br>';
        }
        if (this.createPackage.length === 0) {
            msg += 'Mục Gói hàng không được để Trống! <br>';
        }
        if (this.invoiceHeader.receiverName == null || this.invoiceHeader.receiverName.trim() === '') {
            msg += 'Mục Tên người nhận không được để Trống! <br>';
        }
        if (this.invoiceHeader.receiverPhone == null) {
            msg += 'Mục Số điện thoại người nhận không được để Trống! <br>';
        } else {
            const rg = new RegExp(this.vnf_regex);
            if (!rg.test(this.invoiceHeader.receiverPhone)) {
                msg += 'Mục Số điện thoại người nhận sai định dạng! <br>';
            }
        }
        if (!this.selectedPayer) {
            msg += 'Mục Lựa chọn thanh toán không được để Trống! <br>';
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

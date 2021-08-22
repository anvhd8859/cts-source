import { CalculateShipFee } from './../../../shared/util/request-util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { CommonString } from 'app/shared';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceHeaderPricingDialogComponent } from './invoice-header-pricing-dialog.component';
import { InvoiceHeaderBanItemDialogComponent } from '.';

@Component({
    selector: 'jhi-invoice-header-user-update',
    templateUrl: './invoice-header-user-update.component.html'
})
export class InvoiceHeaderUserUpdateComponent implements OnInit {
    modalRef: NgbModalRef;
    pricingIsOpen = false;
    lstBanItem = false;
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
    selectedAddressFrom: string;
    selectedProvinceTo: any;
    selectedDistrictTo: any;
    selectedSubDistrictTo: any;
    selectedStreetTo: any;
    selectedAddressTo: string;
    selectedUser: IUser;
    selectedUserProfile: IUserProfile;
    lstIvnType: any = [{ id: 'personal', text: 'Giao hàng cá nhân' }];
    lstCollect: any = [{ id: '1', text: 'Lấy hàng tại nhà' }, { id: '0', text: 'Mang đến bưu cục' }];
    selectedCollect: any;
    lstPayer: any = [{ id: '0', text: 'Người gửi thanh toán' }, { id: '1', text: 'Người nhận thanh toán' }];
    selectedPayer: any;
    createPackage: PackageDetailsDTO[] = [];
    invoicePackage: IInvoicePackage;
    invPackageCount = 0;
    lstInvoiceDetails: IInvoiceDetails[] = [];
    invDetailCount = 0;
    common: CommonString;
    cal: CalculateShipFee;
    vnf_regex = /^(09|03|07|08|05)([0-9]{8})$/;

    constructor(
        private invoiceHeaderService: InvoiceHeaderService,
        private accountService: AccountService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private alertService: JhiAlertService,
        private principal: Principal,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.common = new CommonString();
        this.cal = new CalculateShipFee();
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ invoiceHeader }) => {
            this.invoiceHeader = invoiceHeader;
            this.dueDate = this.invoiceHeader.dueDate != null ? this.invoiceHeader.dueDate.format(DATE_TIME_FORMAT) : null;
            this.finishDate = this.invoiceHeader.finishDate != null ? this.invoiceHeader.finishDate.format(DATE_TIME_FORMAT) : null;
            this.createDate = this.invoiceHeader.createDate != null ? this.invoiceHeader.createDate.format(DATE_TIME_FORMAT) : null;
            this.updateDate = this.invoiceHeader.updateDate != null ? this.invoiceHeader.updateDate.format(DATE_TIME_FORMAT) : null;
        });
        forkJoin(this.principal.identity(), this.accountService.getLstCity()).subscribe(res => {
            this.selectedUser = res[0];
            this.lstProvinceFrom = res[1].body;
            this.lstProvinceTo = res[1].body;
            this.changeUser();
        });
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

    calculate() {
        if (this.selectedCollect && this.selectedCollect === 1) {
            this.invoiceHeader.subTotal = Math.round((this.cal.calculateSubTotal(this.createPackage) * 1.05 + 2500) * 100) / 100;
        } else {
            this.invoiceHeader.subTotal = Math.round(this.cal.calculateSubTotal(this.createPackage) * 100) / 100;
        }
        this.invoiceHeader.taxAmount = Math.round(0.1 * this.invoiceHeader.subTotal * 100) / 100;
        this.invoiceHeader.totalDue = Math.round(1.1 * this.invoiceHeader.subTotal * 100) / 100;
        this.invoiceHeader.subTotal = Math.round(this.invoiceHeader.subTotal / 100) * 100;
        this.invoiceHeader.taxAmount = Math.round(this.invoiceHeader.taxAmount / 100) * 100;
        this.invoiceHeader.totalDue = Math.round(this.invoiceHeader.totalDue / 100) * 100;
    }

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
                invoice: this.invoiceHeader,
                packageList: this.createPackage
            };
            this.invoiceHeader.status = 'waiting';
            this.invoiceHeader.customerId = this.selectedUser.id;
            this.invoiceHeader.receiverPay = this.selectedPayer === '1' ? true : false;
            this.invoiceHeader.startStreetId = this.selectedStreetFrom.id;
            this.invoiceHeader.destinationStreetId = this.selectedStreetTo.id;
            this.invoiceHeader.dueDate = this.dueDate != null ? moment(this.dueDate, DATE_TIME_FORMAT) : null;
            this.invoiceHeader.finishDate = this.finishDate != null ? moment(this.finishDate, DATE_TIME_FORMAT) : null;
            this.invoiceHeader.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
            this.invoiceHeader.updateDate = this.updateDate != null ? moment(this.updateDate, DATE_TIME_FORMAT) : null;
            let wei = 0;
            for (const i of this.createPackage) {
                wei += i.invPackage.weight;
            }
            if (this.invoiceHeader.note == null) {
                this.invoiceHeader.note = '';
            }
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
        if (!(this.selectedAddressFrom && this.selectedAddressFrom.trim() !== '')) {
            msg += 'Mục Địa chỉ lấy hàng không được để Trống! <br>';
        }
        if (this.selectedAddressFrom && this.selectedAddressFrom.trim().length > 100) {
            msg += 'Mục Địa chỉ gửi của bạn dài quá 100 kí tự! <br>';
        }
        if (this.selectedAddressTo && this.selectedAddressTo.trim().length > 100) {
            msg += 'Mục địa chỉ nhận của bạn dài quá 100 kí tự! <br>';
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
        if (!(this.selectedAddressTo && this.selectedAddressTo.trim() !== '')) {
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
        } else {
            let count = 0;
            for (const obj of this.createPackage) {
                count++;
                if (!obj.invPackage.weight) {
                    msg += 'Mục cân nặng của Gói hàng' + count + '  không được để trống! <br>';
                } else if (obj.invPackage.weight > 20000 || obj.invPackage.weight < 50) {
                    msg += 'Mục cân nặng của Gói hàng #' + count + ' phải nằm trong khoảng 50g đến 20000g! <br>';
                }

                if (!obj.invPackage.height) {
                    msg += 'Mục chiều cao của Gói hàng' + count + '  không được để trống! <br>';
                } else if (obj.invPackage.height > 100 || obj.invPackage.height < 1) {
                    msg += 'Mục chiều cao của Gói hàng #' + count + ' phải nằm trong khoảng 1 đến 100cm! <br>';
                }

                if (!obj.invPackage.width) {
                    msg += 'Mục chiều rộng của Gói hàng' + count + '  không được để trống! <br>';
                } else if (obj.invPackage.width > 100 || obj.invPackage.width < 1) {
                    msg += 'Mục chiều rộng của Gói hàng #' + count + ' phải nằm trong khoảng 1 đến 100cm! <br>';
                }

                if (!obj.invPackage.length) {
                    msg += 'Mục chiều dài của Gói hàng' + count + '  không được để trống! <br>';
                } else if (obj.invPackage.length > 100 || obj.invPackage.length < 5) {
                    msg += 'Mục chiều dài của Gói hàng #' + count + ' phải nằm trong khoảng 5 đến 100cm! <br>';
                }
                if (obj.invPackage.note && obj.invPackage.note.length > 100) {
                    msg += 'Mục ghi chú của gói hàng' + count + '  không thể vượt quá 100 kí tự! <br>';
                }
            }
        }
        if (this.invoiceHeader.note && this.invoiceHeader.note.length > 100) {
            msg += 'Mục Ghi chú khách hàng không thể vượt quá 100 kí tự! <br>';
        }
        if (!(this.invoiceHeader.receiverName && this.invoiceHeader.receiverName.trim() !== '')) {
            msg += 'Mục Tên người nhận không được để Trống! <br>';
        }
        if (this.invoiceHeader.receiverName && this.invoiceHeader.receiverName.length > 100) {
            msg += 'Mục Tên người nhận không thể vượt quá 100 kí tự! <br>';
        }
        if (!(this.invoiceHeader.receiverPhone && this.invoiceHeader.receiverPhone.trim() !== '')) {
            msg += 'Mục Số điện thoại người nhận không được để Trống! <br>';
        } else {
            const rg = new RegExp(this.vnf_regex);
            if (!rg.test(this.invoiceHeader.receiverPhone)) {
                msg += 'Mục Số điện thoại người nhận phải gồm 10 số và có dạng 09|03|07|08|05|xxxxxxx  <br>';
            }
        }
        if (!this.selectedPayer) {
            msg += 'Mục Lựa chọn thanh toán không được để Trống! <br>';
        }
        if (!this.selectedCollect) {
            msg += 'Mục Hình thức kí gửi không được để Trống! <br>';
        }
        this.invoiceHeader.invoiceType = 'personal';
        return msg;
    }

    // ThangND Start
    changeUser() {
        this.accountService.findByUserID({ id: this.selectedUser.id }).subscribe(res => {
            this.selectedUserProfile = res.body;
            this.accountService.getStreetAndParentById({ id: this.selectedUserProfile.streetId }).subscribe(res => {
                const data = res.body;
                this.selectedUserProfile.address =
                    this.selectedUserProfile.address +
                    ', ' +
                    data.streetName +
                    ', ' +
                    data.subDistrictId.subDistrictName +
                    ', ' +
                    data.subDistrictId.districtId.districtName +
                    ', ' +
                    data.subDistrictId.districtId.provinceId.provinceName;
            });
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

    openPricing() {
        this.modalRef = this.openPricingModal();
    }

    openListBanItem() {
        this.modalRef = this.openListBanModal();
    }

    openPricingModal(): NgbModalRef {
        if (this.pricingIsOpen) {
            return;
        }
        this.pricingIsOpen = true;
        const modalRef = this.modalService.open(InvoiceHeaderPricingDialogComponent, { size: 'lg', backdrop: 'static', keyboard: false });
        modalRef.result.then(
            result => {
                this.pricingIsOpen = false;
            },
            reason => {
                this.pricingIsOpen = false;
            }
        );
        return modalRef;
    }

    openListBanModal(): NgbModalRef {
        if (this.lstBanItem) {
            return;
        }
        this.lstBanItem = true;
        const modalRef = this.modalService.open(InvoiceHeaderBanItemDialogComponent, { size: 'lg', backdrop: 'static', keyboard: false });
        modalRef.result.then(
            result => {
                this.lstBanItem = false;
            },
            reason => {
                this.lstBanItem = false;
            }
        );
        return modalRef;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IInvoiceHeader>>) {
        result.subscribe(
            (res: HttpResponse<IInvoiceHeader>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(data?: any) {
        this.isSaving = false;
        this.router.navigate(['/invoice-header', data.id, 'view']);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

export class PackageDetailsDTO {
    invPackage?: IInvoicePackage;
    itemList?: IInvoiceDetails[];
    constructor() {
        this.invPackage = new InvoicePackage();
        this.itemList = new Array();
    }
}

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { Principal, AccountService, User } from 'app/core';
import { UserProfileService } from 'app/entities/user-profile';
import { IDistrict } from 'app/shared/model/ctsmicroservice/district.model';
import { IProvince } from 'app/shared/model/ctsmicroservice/province.model';
import { IStreet } from 'app/shared/model/ctsmicroservice/street.model';
import { ISubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';
import { IUserProfile, UserProfile } from 'app/shared/model/user-profile.model';
import { JhiAlertService } from 'ng-jhipster';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];
    lstProvince: IProvince[] = [];
    lstDistrict: IDistrict[] = [];
    lstSubDistrict: ISubDistrict[] = [];
    lstStreet: IStreet[] = [];
    selectedProvince: any;
    selectedDistrict: any;
    selectedSubDistrict: any;
    selectedStreet: any;
    selectedAddress: any;
    lstGender: any;
    selectedGender: any;
    userProfile: IUserProfile;
    selectedPhoneNumber: string;
    user: any;

    constructor(
        private accountService: AccountService,
        private principal: Principal,
        private ngxUiLoaderService: NgxUiLoaderService,
        private alertService: JhiAlertService
    ) {
        this.userProfile = new UserProfile();
        this.lstGender = [{ id: 'Male', text: 'Male' }, { id: 'Female', text: 'Female' }, { id: 'Other', text: 'Other' }];
    }

    ngOnInit() {
        this.ngxUiLoaderService.start();
        this.principal.identity().then(account => {
            this.user = account;
            this.settingsAccount = this.copyAccount(account);
            this.accountService.findByUserID({ id: account.id }).subscribe(profile => {
                this.userProfile = profile.body;
                this.accountService.getLstCity().subscribe(lstCity => {
                    this.lstProvince = lstCity.body;
                    if (!this.userProfile.id) {
                        this.userProfile = new UserProfile();
                        this.ngxUiLoaderService.stop();
                    } else {
                        const params = { id: this.userProfile.streetId };
                        this.accountService.getStreetAndParentById(params).subscribe(res => {
                            forkJoin(
                                this.accountService.getLstDistrictByCity({ provinceId: res.body.subDistrictId.districtId.provinceId.id }),
                                this.accountService.getLstWardByDistrict({ id: res.body.subDistrictId.districtId.id }),
                                this.accountService.getLstStreetByWard({ id: res.body.subDistrictId.id })
                            ).subscribe(response => {
                                this.lstDistrict = response[0].body;
                                this.lstSubDistrict = response[1].body;
                                this.lstStreet = response[2].body;
                                this.selectedProvince = res.body.subDistrictId.districtId.provinceId.id;
                                this.selectedDistrict = res.body.subDistrictId.districtId.id;
                                this.selectedSubDistrict = res.body.subDistrictId.id;
                                this.selectedStreet = res.body.id;
                                this.ngxUiLoaderService.stop();
                            });
                        });
                    }
                });
            });
        });
    }

    save() {
        if (
            (this.selectedDistrict || this.selectedProvince || this.selectedSubDistrict || this.userProfile.address) &&
            this.userProfile.streetId === null
        ) {
            this.alertService.warning('Fill all data in User Address');
            window.scroll(0, 0);
            return;
        }
        this.userProfile.userId = this.user.id;
        this.accountService.save(this.settingsAccount).subscribe(
            () => {
                if (this.userProfile.id) {
                    this.accountService.updateProfile(this.userProfile).subscribe();
                } else {
                    this.accountService.createProfile(this.userProfile).subscribe();
                }
                this.error = null;
                this.success = 'OK';
                this.principal.identity(true).then(account => {
                    this.settingsAccount = this.copyAccount(account);
                });
                window.scroll(0, 0);
                this.alertService.success('Update Profile Success');
            },
            () => {
                this.success = null;
                this.error = 'ERROR';
            }
        );
    }

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }

    // HaiNM
    changeCity() {
        this.lstDistrict = null;
        this.selectedDistrict = null;
        this.lstSubDistrict = null;
        this.selectedSubDistrict = null;
        this.lstStreet = null;
        this.userProfile.streetId = null;
        const param = { provinceId: this.selectedProvince };
        this.accountService.getLstDistrictByCity(param).subscribe(res => {
            this.lstDistrict = res.body;
        });
    }

    changeDistrict() {
        this.lstSubDistrict = null;
        this.selectedSubDistrict = null;
        this.lstStreet = null;
        this.userProfile.streetId = null;
        const param = { id: this.selectedDistrict };
        this.accountService.getLstWardByDistrict(param).subscribe(res => {
            this.lstSubDistrict = res.body;
        });
    }

    changeSubDistrict() {
        this.lstStreet = null;
        this.userProfile.streetId = null;
        const param = { id: this.selectedSubDistrict };
        this.accountService.getLstStreetByWard(param).subscribe(res => {
            this.lstStreet = res.body;
        });
    }
    // HaiNM
}

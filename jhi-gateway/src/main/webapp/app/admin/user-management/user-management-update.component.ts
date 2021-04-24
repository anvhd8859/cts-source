import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AccountService, User, UserService } from 'app/core';
import { IDistrict } from 'app/shared/model/ctsmicroservice/district.model';
import { IProvince } from 'app/shared/model/ctsmicroservice/province.model';
import { IStreet } from 'app/shared/model/ctsmicroservice/street.model';
import { ISubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';
import { UserProfile } from 'app/shared/model/user-profile.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'jhi-user-mgmt-update',
    templateUrl: './user-management-update.component.html'
})
export class UserMgmtUpdateComponent implements OnInit {
    user: User;
    userProfile: UserProfile;
    languages: any[];
    authorities: any[];
    isSaving: boolean;
    lstGender: any[];
    lstProvince: IProvince[] = [];
    lstDistrict: IDistrict[] = [];
    lstSubDistrict: ISubDistrict[] = [];
    lstStreet: IStreet[] = [];
    selectedProvince: any;
    selectedDistrict: any;
    selectedSubDistrict: any;
    selectedStreet: any;
    selectedAddress: any;
    selectedGender: any;
    lstOffice: any;
    selectedOffice: any;

    constructor(
        private userService: UserService,
        private accountService: AccountService,
        private route: ActivatedRoute,
        private ngxUiLoaderService: NgxUiLoaderService,
        private router: Router
    ) {
        this.userProfile = new UserProfile();
        this.lstGender = [{ id: 'Male', text: 'Male' }, { id: 'Female', text: 'Female' }, { id: 'Other', text: 'Other' }];
    }

    ngOnInit() {
        this.isSaving = false;
        forkJoin(this.accountService.getLstCity(), this.accountService.getLstOffice()).subscribe(res => {
            this.lstProvince = res[0].body;
            this.lstOffice = res[1].body;
        });
        this.route.data.subscribe(({ user }) => {
            this.user = user.body ? user.body : user;
            if (this.user.id) {
                this.accountService.findByUserID({ id: this.user.id }).subscribe(profile => {
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
                                    this.accountService.getLstDistrictByCity({
                                        provinceId: res.body.subDistrictId.districtId.provinceId.id
                                    }),
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
            }
        });
        this.authorities = [];
        this.userService.authorities().subscribe(authorities => {
            this.authorities = authorities;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.userProfile.role = this.user.authorities[0];
        if (this.user.id !== null) {
            this.userService.update(this.user).subscribe(
                response => {
                    this.userProfile.userId = response.body.id;
                    if (this.userProfile.id) {
                        this.accountService.updateProfile(this.userProfile).subscribe(res => {
                            this.onSaveSuccess(response);
                        });
                    } else {
                        this.accountService.createUserProfile(this.userProfile).subscribe(res => {
                            this.onSaveSuccess(response);
                        });
                    }
                },
                () => this.onSaveError()
            );
        } else {
            this.user.langKey = 'en';
            this.userService.create(this.user).subscribe(
                response => {
                    this.userProfile.userId = response.body.id;
                    this.accountService.createUserProfile(this.userProfile).subscribe(res => {
                        this.onSaveSuccess(response);
                    });
                },
                () => this.onSaveError()
            );
        }
    }

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

    private onSaveSuccess(result) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

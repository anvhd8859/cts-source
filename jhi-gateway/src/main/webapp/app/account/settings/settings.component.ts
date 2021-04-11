import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { Principal, AccountService } from 'app/core';
import { UserProfileService } from 'app/entities/user-profile';
import { IDistrict } from 'app/shared/model/ctsmicroservice/district.model';
import { IProvince } from 'app/shared/model/ctsmicroservice/province.model';
import { IStreet } from 'app/shared/model/ctsmicroservice/street.model';
import { ISubDistrict } from 'app/shared/model/ctsmicroservice/sub-district.model';
import { IUserProfile, UserProfile } from 'app/shared/model/user-profile.model';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, AfterViewInit {
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
    lstGender: any = [{ id: 'Male', text: 'Male' }, { id: 'Female', text: 'Female' }, { id: 'Other', text: 'Other' }];
    selectedGender: any;
    userProfile: IUserProfile;
    selectedPhoneNumber: string;

    constructor(private accountService: AccountService, private principal: Principal, private userProfileService: UserProfileService) {}

    ngAfterViewInit() {
        this.principal.identity().then(account => {
            this.settingsAccount = this.copyAccount(account);
            this.accountService.findByUserID({ id: account.id }).subscribe(res => {
                this.userProfile = res.body;
                if (!this.userProfile) {
                    this.userProfile = new UserProfile();
                    this.getLstCity();
                } else {
                    const streetId = this.userProfile.streetId;
                    forkJoin(
                        this.accountService.getLstCity(),
                        this.accountService.getAllDistrict(),
                        this.accountService.getAllSubDistrict(),
                        this.accountService.getAllStreet()
                    ).subscribe(res => {
                        this.lstProvince = res[0].body;
                        // this.lstStreet           = res[3].body.find(e => e.id === streetId);
                        // this.lstSubDistrict      = res[2].body.find(e => e.id === this.selectedStreet);
                        // this.lstDistrict         = res[1].body.find(e => e.id === this.selectedSubDistrict);

                        // this.selectedStreet      = this.lstStreet[0].id;
                        // this.selectedSubDistrict = this.lstSubDistrict[0].id;
                        // this.selectedDistrict    = this.lstDistrict[0].id;
                        // this.selectedProvince    = res[0].body.find(e => e.id === this.selectedDistrict).id;
                    });
                }
            });
        });
    }

    ngOnInit() {}

    save() {
        this.accountService.save(this.settingsAccount).subscribe(
            () => {
                this.error = null;
                this.success = 'OK';
                this.principal.identity(true).then(account => {
                    this.settingsAccount = this.copyAccount(account);
                });
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
    getLstCity() {
        this.accountService.getLstCity().subscribe(res => {
            this.lstProvince = res.body;
        });
    }

    changeCity() {
        this.lstDistrict = null;
        this.selectedDistrict = null;
        const param = { provinceId: this.selectedProvince };
        this.accountService.getLstDistrictByCity(param).subscribe(res => {
            this.lstDistrict = res.body;
        });
    }

    changeDistrict() {
        this.lstSubDistrict = null;
        this.selectedSubDistrict = null;
        const param = { id: this.selectedDistrict };
        this.accountService.getLstWardByDistrict(param).subscribe(res => {
            this.lstSubDistrict = res.body;
        });
    }

    changeSubDistrict() {
        this.lstStreet = null;
        this.selectedStreet = null;
        const param = { id: this.selectedSubDistrict };
        this.accountService.getLstStreetByWard(param).subscribe(res => {
            this.lstStreet = res.body;
        });
    }
    // HaiNM
}

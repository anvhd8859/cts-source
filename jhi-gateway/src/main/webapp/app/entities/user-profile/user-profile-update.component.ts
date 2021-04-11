import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IUserProfile } from 'app/shared/model/user-profile.model';
import { UserProfileService } from './user-profile.service';

@Component({
    selector: 'jhi-user-profile-update',
    templateUrl: './user-profile-update.component.html'
})
export class UserProfileUpdateComponent implements OnInit {
    userProfile: IUserProfile;
    isSaving: boolean;
    dateOfBirth: string;
    createdDate: string;
    updatedDate: string;

    constructor(private userProfileService: UserProfileService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userProfile }) => {
            this.userProfile = userProfile;
            this.dateOfBirth = this.userProfile.dateOfBirth != null ? this.userProfile.dateOfBirth.format(DATE_TIME_FORMAT) : null;
            this.createdDate = this.userProfile.createdDate != null ? this.userProfile.createdDate.format(DATE_TIME_FORMAT) : null;
            this.updatedDate = this.userProfile.updatedDate != null ? this.userProfile.updatedDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.userProfile.dateOfBirth = this.dateOfBirth != null ? moment(this.dateOfBirth, DATE_TIME_FORMAT) : null;
        this.userProfile.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.userProfile.updatedDate = this.updatedDate != null ? moment(this.updatedDate, DATE_TIME_FORMAT) : null;
        if (this.userProfile.id !== undefined) {
            this.subscribeToSaveResponse(this.userProfileService.update(this.userProfile));
        } else {
            this.subscribeToSaveResponse(this.userProfileService.create(this.userProfile));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUserProfile>>) {
        result.subscribe((res: HttpResponse<IUserProfile>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

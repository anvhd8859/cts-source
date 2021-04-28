import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalService } from 'app/account/register/register-modal.service';

import { VERSION } from 'app/app.constants';
import { Principal, LoginModalService, LoginService, AccountService } from 'app/core';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { ProfileService } from '../profiles/profile.service';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.css']
})
export class NavbarComponent implements OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    username: string;
    eventSubscriber: Subscription;
    eventSubscriber2: Subscription;

    constructor(
        private loginService: LoginService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private registerModalService: RegisterModalService,
        private profileService: ProfileService,
        private router: Router,
        private accountService: AccountService,
        private eventManager: JhiEventManager
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {
        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
        this.accountService.get().subscribe(res => {
            this.username = res.body['firstName'];
        });
        this.loginChangeInNavbar();
        this.logoutChangeInNavbar();
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    register() {
        this.modalRef = this.registerModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }

    getUsername() {
        this.principal.identity().then(account => {
            return account ? account.login : 'Account';
        });
    }

    loginChangeInNavbar() {
        this.eventSubscriber = this.eventManager.subscribe('authenticationSuccess', response => this.loadAll(response));
    }

    logoutChangeInNavbar() {
        this.eventSubscriber2 = this.eventManager.subscribe('logoutSuccess', response => this.loadAll(response));
    }

    loadAll(res?: any) {
        this.username = res.content;
    }
}

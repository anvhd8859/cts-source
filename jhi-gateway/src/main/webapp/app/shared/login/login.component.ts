import { Component, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { LoginService } from 'app/core/login/login.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { RegisterModalService } from 'app/account/register/register-modal.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    selector: 'jhi-login-modal',
    templateUrl: './login.component.html'
})
export class JhiLoginModalComponent implements AfterViewInit {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    modalRef: NgbModalRef;
    isSuccess = false;

    constructor(
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
        public activeModal: NgbActiveModal,
        private registerModalService: RegisterModalService,
        private ngxUiloaderService: NgxUiLoaderService
    ) {
        this.credentials = {};
    }

    ngAfterViewInit() {
        setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []), 0);
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
        this.activeModal.dismiss('cancel');
    }

    login() {
        this.ngxUiloaderService.start();
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(() => {
                this.ngxUiloaderService.stop();
                this.authenticationError = false;
                this.isSuccess = true;
                setTimeout(() => {
                    this.ngxUiloaderService.start();
                    this.activeModal.dismiss('login success');
                    if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                        this.router.navigate(['']);
                    }

                    this.eventManager.broadcast({
                        name: 'authenticationSuccess',
                        content: this.username
                    });

                    // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                    // since login is succesful, go to stored previousState and clear previousState
                    const redirect = this.stateStorageService.getUrl();
                    if (redirect) {
                        this.stateStorageService.storeUrl(null);
                        this.router.navigate([redirect]);
                    }
                    this.ngxUiloaderService.stop();
                }, 3000);
            })
            .catch(() => {
                this.isSuccess = false;
                this.authenticationError = true;
                this.ngxUiloaderService.stop();
            });
    }

    register() {
        this.activeModal.dismiss('to state register');
        this.modalRef = this.registerModalService.open();
    }

    requestResetPassword() {
        this.activeModal.dismiss('to state requestReset');
        this.router.navigate(['/reset', 'request']);
    }
}

import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage, LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { CtsgatewaySharedModule } from 'app/shared';
import { CtsgatewayCoreModule } from 'app/core';
import { CtsgatewayAppRoutingModule } from './app-routing.module';
import { CtsgatewayHomeModule } from './home/home.module';
import { CtsgatewayAccountModule } from './account/account.module';
import { CtsgatewayEntityModule } from './entities/entity.module';
import * as moment from 'moment';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from './layouts';
import {
    NgxUiLoaderConfig,
    NgxUiLoaderHttpModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    PB_DIRECTION,
    POSITION,
    SPINNER
} from 'ngx-ui-loader';
import { CtsgatewayAboutUsModule } from './about-us/about-us.module';
import { NgxImageCompressService } from 'ngx-image-compress';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    bgsColor: '#3ce6ff',
    bgsOpacity: 0.2,
    bgsPosition: POSITION.centerCenter,
    bgsSize: 100,
    bgsType: SPINNER.threeStrings,
    blur: 2,
    fgsColor: '#3ce6ff',
    fgsPosition: POSITION.centerCenter,
    fgsSize: 100,
    fgsType: SPINNER.threeStrings,
    gap: 24,
    overlayBorderRadius: '0',
    overlayColor: 'rgba(40, 40, 40, 0.8)',
    pbColor: '#3ce6ff',
    pbDirection: PB_DIRECTION.leftToRight,
    pbThickness: 3,
    hasProgressBar: true,
    text: 'LOADING',
    textColor: '#FFFFFF',
    textPosition: POSITION.centerCenter
};

@NgModule({
    imports: [
        NgSelectModule,
        FormsModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        NgxUiLoaderRouterModule,
        NgxUiLoaderHttpModule,
        BrowserModule,
        CtsgatewayAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        CtsgatewaySharedModule,
        CtsgatewayCoreModule,
        CtsgatewayHomeModule,
        CtsgatewayAccountModule,
        CtsgatewayAboutUsModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        CtsgatewayEntityModule
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [LocalStorageService, SessionStorageService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [JhiEventManager]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [Injector]
        },
        [NgxImageCompressService]
    ],
    bootstrap: [JhiMainComponent]
})
export class CtsgatewayAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}

import { Route } from '@angular/router';
import { AboutUsComponent } from '.';

export const ABOUT_US_ROUTE: Route = {
    path: 'about-us',
    component: AboutUsComponent,
    data: {
        authorities: [],
        pageTitle: 'CTS: About Us'
    }
};

import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { SettingsComponent } from './settings.component';

export const settingsRoute: Route = {
    path: 'settings',
    component: SettingsComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'ROLE_SHIPPER', 'ROLE_OFFICER', 'ROLE_KEEPER', 'ROLE_USER'],
        pageTitle: 'Thông tin người dùng'
    },
    canActivate: [UserRouteAccessService]
};

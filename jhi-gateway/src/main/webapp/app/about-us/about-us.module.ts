import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CtsgatewaySharedModule } from 'app/shared';
import { AboutUsComponent, ABOUT_US_ROUTE } from '.';

@NgModule({
    imports: [CtsgatewaySharedModule, RouterModule.forChild([ABOUT_US_ROUTE])],
    declarations: [AboutUsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayAboutUsModule {}

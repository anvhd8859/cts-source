import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CtsgatewayUserProfileModule } from './user-profile/user-profile.module';
import { CtsgatewayDistrictModule as CtsmicroserviceDistrictModule } from './ctsmicroservice/district/district.module';
import { CtsgatewayProvinceModule as CtsmicroserviceProvinceModule } from './ctsmicroservice/province/province.module';
import { CtsgatewayStreetModule as CtsmicroserviceStreetModule } from './ctsmicroservice/street/street.module';
import { CtsgatewaySubDistrictModule as CtsmicroserviceSubDistrictModule } from './ctsmicroservice/sub-district/sub-district.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        CtsgatewayUserProfileModule,
        CtsmicroserviceDistrictModule,
        CtsmicroserviceProvinceModule,
        CtsmicroserviceStreetModule,
        CtsmicroserviceSubDistrictModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtsgatewayEntityModule {}

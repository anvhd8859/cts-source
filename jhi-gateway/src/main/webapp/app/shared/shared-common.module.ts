import { NgModule } from '@angular/core';

import { CtsgatewaySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [CtsgatewaySharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [CtsgatewaySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class CtsgatewaySharedCommonModule {}

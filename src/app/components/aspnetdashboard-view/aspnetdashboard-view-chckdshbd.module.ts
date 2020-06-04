
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { AspnetdashboardViewCheckeddashboardComponent } from './chkform/aspnetdashboard-view-checkeddashboard.component';


@NgModule({
    declarations: [
        AspnetdashboardViewCheckeddashboardComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
    ],
    exports: [
        AspnetdashboardViewCheckeddashboardComponent,
    ],
    entryComponents: [
    ]
})
export class AspnetdashboardViewChckdshbdModule { }




import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { AppFormatterModule } from './../../shared/modules/app-formatter.module';
import { AspnetdashboardViewEformComponent } from './eform/aspnetdashboard-view-eform.component';
import { AspnetdashboardViewEdlgComponent } from './edlg/aspnetdashboard-view-edlg.component';



@NgModule({
    declarations: [
        AspnetdashboardViewEformComponent,
        AspnetdashboardViewEdlgComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        AppFormatterModule,

    ],
    exports: [
        AspnetdashboardViewEformComponent,
        AspnetdashboardViewEdlgComponent
    ],
    entryComponents: [
        AspnetdashboardViewEdlgComponent
    ]
})
export class AspnetdashboardViewEModule { }




import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { AppFormatterModule } from './../../shared/modules/app-formatter.module';
import { AspnetuserViewEformComponent } from './eform/aspnetuser-view-eform.component';
import { AspnetuserViewEdlgComponent } from './edlg/aspnetuser-view-edlg.component';



@NgModule({
    declarations: [
        AspnetuserViewEformComponent,
        AspnetuserViewEdlgComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        AppFormatterModule,

    ],
    exports: [
        AspnetuserViewEformComponent,
        AspnetuserViewEdlgComponent
    ],
    entryComponents: [
        AspnetuserViewEdlgComponent
    ]
})
export class AspnetuserViewEModule { }



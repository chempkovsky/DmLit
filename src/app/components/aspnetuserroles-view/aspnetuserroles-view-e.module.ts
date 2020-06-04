
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { AppFormatterModule } from './../../shared/modules/app-formatter.module';
import { AspnetuserrolesViewEformComponent } from './eform/aspnetuserroles-view-eform.component';
import { AspnetuserrolesViewEdlgComponent } from './edlg/aspnetuserroles-view-edlg.component';


import { AspnetuserViewSModule } from './../aspnetuser-view/aspnetuser-view-s.module';

@NgModule({
    declarations: [
        AspnetuserrolesViewEformComponent,
        AspnetuserrolesViewEdlgComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        AppFormatterModule,
        AspnetuserViewSModule,

    ],
    exports: [
        AspnetuserrolesViewEformComponent,
        AspnetuserrolesViewEdlgComponent
    ],
    entryComponents: [
        AspnetuserrolesViewEdlgComponent
    ]
})
export class AspnetuserrolesViewEModule { }



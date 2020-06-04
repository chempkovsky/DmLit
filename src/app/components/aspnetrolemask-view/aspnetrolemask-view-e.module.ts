
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { AppFormatterModule } from './../../shared/modules/app-formatter.module';
import { AspnetrolemaskViewEformComponent } from './eform/aspnetrolemask-view-eform.component';
import { AspnetrolemaskViewEdlgComponent } from './edlg/aspnetrolemask-view-edlg.component';



@NgModule({
    declarations: [
        AspnetrolemaskViewEformComponent,
        AspnetrolemaskViewEdlgComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        AppFormatterModule,

    ],
    exports: [
        AspnetrolemaskViewEformComponent,
        AspnetrolemaskViewEdlgComponent
    ],
    entryComponents: [
        AspnetrolemaskViewEdlgComponent
    ]
})
export class AspnetrolemaskViewEModule { }




import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { AppFormatterModule } from './../../shared/modules/app-formatter.module';
import { LitEditionViewEformComponent } from './eform/lit-edition-view-eform.component';
import { LitEditionViewEdlgComponent } from './edlg/lit-edition-view-edlg.component';



@NgModule({
    declarations: [
        LitEditionViewEformComponent,
        LitEditionViewEdlgComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        AppFormatterModule,

    ],
    exports: [
        LitEditionViewEformComponent,
        LitEditionViewEdlgComponent
    ],
    entryComponents: [
        LitEditionViewEdlgComponent
    ]
})
export class LitEditionViewEModule { }




import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { AppFormatterModule } from './../../shared/modules/app-formatter.module';
import { LitLanguageViewEformComponent } from './eform/lit-language-view-eform.component';
import { LitLanguageViewEdlgComponent } from './edlg/lit-language-view-edlg.component';



@NgModule({
    declarations: [
        LitLanguageViewEformComponent,
        LitLanguageViewEdlgComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        AppFormatterModule,

    ],
    exports: [
        LitLanguageViewEformComponent,
        LitLanguageViewEdlgComponent
    ],
    entryComponents: [
        LitLanguageViewEdlgComponent
    ]
})
export class LitLanguageViewEModule { }



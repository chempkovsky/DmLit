
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { AppFormatterModule } from './../../shared/modules/app-formatter.module';
import { LitDialectViewEformComponent } from './eform/lit-dialect-view-eform.component';
import { LitDialectViewEdlgComponent } from './edlg/lit-dialect-view-edlg.component';


import { LitLanguageViewSModule } from './../lit-language-view/lit-language-view-s.module';

@NgModule({
    declarations: [
        LitDialectViewEformComponent,
        LitDialectViewEdlgComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        AppFormatterModule,
        LitLanguageViewSModule,

    ],
    exports: [
        LitDialectViewEformComponent,
        LitDialectViewEdlgComponent
    ],
    entryComponents: [
        LitDialectViewEdlgComponent
    ]
})
export class LitDialectViewEModule { }



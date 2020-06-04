
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { AppFormatterModule } from './../../shared/modules/app-formatter.module';
import { LitGenreViewEformComponent } from './eform/lit-genre-view-eform.component';
import { LitGenreViewEdlgComponent } from './edlg/lit-genre-view-edlg.component';



@NgModule({
    declarations: [
        LitGenreViewEformComponent,
        LitGenreViewEdlgComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        AppFormatterModule,

    ],
    exports: [
        LitGenreViewEformComponent,
        LitGenreViewEdlgComponent
    ],
    entryComponents: [
        LitGenreViewEdlgComponent
    ]
})
export class LitGenreViewEModule { }




import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { AppFormatterModule } from './../../shared/modules/app-formatter.module';
import { AspnetroleViewEformComponent } from './eform/aspnetrole-view-eform.component';
import { AspnetroleViewEdlgComponent } from './edlg/aspnetrole-view-edlg.component';



@NgModule({
    declarations: [
        AspnetroleViewEformComponent,
        AspnetroleViewEdlgComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        AppFormatterModule,

    ],
    exports: [
        AspnetroleViewEformComponent,
        AspnetroleViewEdlgComponent
    ],
    entryComponents: [
        AspnetroleViewEdlgComponent
    ]
})
export class AspnetroleViewEModule { }



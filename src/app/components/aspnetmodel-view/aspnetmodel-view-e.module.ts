
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { AppFormatterModule } from './../../shared/modules/app-formatter.module';
import { AspnetmodelViewEformComponent } from './eform/aspnetmodel-view-eform.component';
import { AspnetmodelViewEdlgComponent } from './edlg/aspnetmodel-view-edlg.component';



@NgModule({
    declarations: [
        AspnetmodelViewEformComponent,
        AspnetmodelViewEdlgComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        AppFormatterModule,

    ],
    exports: [
        AspnetmodelViewEformComponent,
        AspnetmodelViewEdlgComponent
    ],
    entryComponents: [
        AspnetmodelViewEdlgComponent
    ]
})
export class AspnetmodelViewEModule { }



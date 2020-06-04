
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { AspnetmodelViewCheckedmodelComponent } from './chkform/aspnetmodel-view-checkedmodel.component';


@NgModule({
    declarations: [
        AspnetmodelViewCheckedmodelComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
    ],
    exports: [
        AspnetmodelViewCheckedmodelComponent,
    ],
    entryComponents: [
    ]
})
export class AspnetmodelViewChckmdlModule { }



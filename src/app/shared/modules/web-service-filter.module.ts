
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { BrowserModule } from '@angular/platform-browser';



import { AppMaterialModule } from './app-material.module';
import { AppFlexLayoutModule } from './app-flex-layout.module';
import { IWebServiceFilter } from './../interfaces/web-service-filter.interface';
import { IWebServiceFilterDef } from './../interfaces/web-service-filter-def.interface';
import { IWebServiceFilterOperator } from './../interfaces/web-service-filter-operator.interface';
import { IWebServiceFilterRslt } from './../interfaces/web-service-filter-rslt.interface';
import { AppGlblSettingsService } from './../services/app-glbl-settings.service';
import { WebServiceFilterComponent } from './../components/web-service-filter/web-service-filter.component';
import { EformMode } from './../enums/eform-mode.enum';

import { ColumnSelectorComponent } from './../components/column-selector/column-selector.component';
import { ColumnSelectorDlgComponent } from './../components/column-selector-dlg/column-selector-dlg.component';
import { MessageDialogComponent } from './../components/message-dialog/message-dialog.component';



@NgModule({
    declarations: [
     //   IWebServiceFilter,
     //   IWebServiceFilterDef,
     //   IWebServiceFilterOperator,
     //   IWebServiceFilterRslt,
     //   AppGlblSettingsService,
        WebServiceFilterComponent,
        ColumnSelectorComponent,
        ColumnSelectorDlgComponent,
        MessageDialogComponent,
     //   EformMode
    ],
    imports: [
        CommonModule,
//        BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
    ],
    exports: [
        WebServiceFilterComponent,
      //  EformMode,
        ColumnSelectorComponent,
        ColumnSelectorDlgComponent,
        MessageDialogComponent,
    ],
    entryComponents: [
        ColumnSelectorDlgComponent,
        MessageDialogComponent,
    ]
})
export class WebServiceFilterModule { }



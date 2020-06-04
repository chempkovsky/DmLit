
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { DDialectFtrComponent } from './ftr/d-dialect.ftr.component';
import { DDialectFtrRoutingModule } from './d-dialect.ftr.routing.module';
import { LitDialectViewLModule } from './../../components/lit-dialect-view/lit-dialect-view-l.module';
import { LitDialectViewOModule } from './../../components/lit-dialect-view/lit-dialect-view-o.module';
import { LitDialectViewRdModule } from './../../components/lit-dialect-view/lit-dialect-view-rd.module';
import { LitManuscriptViewRdModule } from './../../components/lit-manuscript-view/lit-manuscript-view-rd.module';
import { LitBookViewRdModule } from './../../components/lit-book-view/lit-book-view-rd.module';

//
// Hint: 
// add the following line
// { path: 'ddialect', loadChildren: () => import('./features/d-dialect/d-dialect.ftr.module').then(m => m.DDialectFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/ddialect']" routerLinkActive="active">Title for DDialect </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        DDialectFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        DDialectFtrRoutingModule,
        LitDialectViewLModule,
        LitDialectViewOModule,
        LitDialectViewRdModule,
        LitManuscriptViewRdModule,
        LitBookViewRdModule,

    ],
    exports: [
        DDialectFtrComponent,

        LitDialectViewRdModule,
        LitManuscriptViewRdModule,
        LitBookViewRdModule,

    ],
    entryComponents: [
    ]
})
export class DDialectFtrModule { }



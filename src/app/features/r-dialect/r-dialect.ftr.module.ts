
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { RDialectFtrComponent } from './ftr/r-dialect.ftr.component';
import { RDialectFtrRoutingModule } from './r-dialect.ftr.routing.module';
import { LitDialectViewLModule } from './../../components/lit-dialect-view/lit-dialect-view-l.module';
import { LitDialectViewRModule } from './../../components/lit-dialect-view/lit-dialect-view-r.module';
import { LitManuscriptViewRModule } from './../../components/lit-manuscript-view/lit-manuscript-view-r.module';
import { LitBookViewRModule } from './../../components/lit-book-view/lit-book-view-r.module';

//
// Hint: 
// add the following line
// { path: 'rdialect', loadChildren: () => import('./features/r-dialect/r-dialect.ftr.module').then(m => m.RDialectFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/rdialect']" routerLinkActive="active">Title for RDialect </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        RDialectFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        RDialectFtrRoutingModule,
        LitDialectViewLModule,
        LitDialectViewRModule,
        LitManuscriptViewRModule,
        LitBookViewRModule,

    ],
    exports: [
        RDialectFtrComponent,

        LitDialectViewRModule,
        LitManuscriptViewRModule,
        LitBookViewRModule,

    ],
    entryComponents: [
    ]
})
export class RDialectFtrModule { }



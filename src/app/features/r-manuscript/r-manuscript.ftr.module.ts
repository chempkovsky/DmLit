
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { RManuscriptFtrComponent } from './frt/r-manuscript.ftr.component';
import { RManuscriptFtrRoutingModule } from './r-manuscript.ftr.routing.module';
import { LitManuscriptViewLModule } from './../../components/lit-manuscript-view/lit-manuscript-view-l.module';
import { LitManuscriptViewRdModule } from './../../components/lit-manuscript-view/lit-manuscript-view-rd.module';
import { LitBookViewRdModule } from './../../components/lit-book-view/lit-book-view-rd.module';

//
// Hint: 
// add the following line
// { path: 'rmanuscript', loadChildren: () => import('./features/r-manuscript/r-manuscript.ftr.module').then(m => m.RManuscriptFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/rmanuscript']" routerLinkActive="active">Title for RManuscript </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        RManuscriptFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        RManuscriptFtrRoutingModule,
        LitManuscriptViewLModule,
        LitManuscriptViewRdModule,
        LitBookViewRdModule,

    ],
    exports: [
        RManuscriptFtrComponent,

        LitManuscriptViewRdModule,
        LitBookViewRdModule,

    ],
    entryComponents: [
    ]
})
export class RManuscriptFtrModule { }



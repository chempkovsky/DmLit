
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { DManuscriptFtrComponent } from './frt/d-manuscript.ftr.component';
import { DManuscriptFtrRoutingModule } from './d-manuscript.ftr.routing.module';
import { LitManuscriptViewLModule } from './../../components/lit-manuscript-view/lit-manuscript-view-l.module';
import { LitManuscriptViewOModule } from './../../components/lit-manuscript-view/lit-manuscript-view-o.module';
import { LitManuscriptViewRdModule } from './../../components/lit-manuscript-view/lit-manuscript-view-rd.module';
import { LitBookViewRdModule } from './../../components/lit-book-view/lit-book-view-rd.module';

//
// Hint: 
// add the following line
// { path: 'dmanuscript', loadChildren: () => import('./features/d-manuscript/d-manuscript.ftr.module').then(m => m.DManuscriptFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/dmanuscript']" routerLinkActive="active">Title for DManuscript </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        DManuscriptFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        DManuscriptFtrRoutingModule,
        LitManuscriptViewLModule,
        LitManuscriptViewOModule,
        LitManuscriptViewRdModule,
        LitBookViewRdModule,

    ],
    exports: [
        DManuscriptFtrComponent,

        LitManuscriptViewRdModule,
        LitBookViewRdModule,

    ],
    entryComponents: [
    ]
})
export class DManuscriptFtrModule { }



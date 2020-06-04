
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { DAuthorFtrComponent } from './ftr/d-author.ftr.component';
import { DAuthorFtrRoutingModule } from './d-author.ftr.routing.module';
import { LitAuthorViewLModule } from './../../components/lit-author-view/lit-author-view-l.module';
import { LitAuthorViewOModule } from './../../components/lit-author-view/lit-author-view-o.module';
import { LitAuthorViewRdModule } from './../../components/lit-author-view/lit-author-view-rd.module';
import { LitManuscriptViewRdModule } from './../../components/lit-manuscript-view/lit-manuscript-view-rd.module';
import { LitBookViewRdModule } from './../../components/lit-book-view/lit-book-view-rd.module';

//
// Hint: 
// add the following line
// { path: 'dauthor', loadChildren: () => import('./features/d-author/d-author.ftr.module').then(m => m.DAuthorFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/dauthor']" routerLinkActive="active">Title for DAuthor </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        DAuthorFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        DAuthorFtrRoutingModule,
        LitAuthorViewLModule,
        LitAuthorViewOModule,
        LitAuthorViewRdModule,
        LitManuscriptViewRdModule,
        LitBookViewRdModule,

    ],
    exports: [
        DAuthorFtrComponent,

        LitAuthorViewRdModule,
        LitManuscriptViewRdModule,
        LitBookViewRdModule,

    ],
    entryComponents: [
    ]
})
export class DAuthorFtrModule { }



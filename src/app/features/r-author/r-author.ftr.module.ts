
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { RAuthorFtrComponent } from './ftr/r-author.ftr.component';
import { RAuthorFtrRoutingModule } from './r-author.ftr.routing.module';
import { LitAuthorViewLModule } from './../../components/lit-author-view/lit-author-view-l.module';
import { LitAuthorViewRModule } from './../../components/lit-author-view/lit-author-view-r.module';
import { LitManuscriptViewRModule } from './../../components/lit-manuscript-view/lit-manuscript-view-r.module';
import { LitBookViewRModule } from './../../components/lit-book-view/lit-book-view-r.module';

//
// Hint: 
// add the following line
// { path: 'rauthor', loadChildren: () => import('./features/r-author/r-author.ftr.module').then(m => m.RAuthorFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/rauthor']" routerLinkActive="active">Title for RAuthor </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        RAuthorFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        RAuthorFtrRoutingModule,
        LitAuthorViewLModule,
        LitAuthorViewRModule,
        LitManuscriptViewRModule,
        LitBookViewRModule,

    ],
    exports: [
        RAuthorFtrComponent,

        LitAuthorViewRModule,
        LitManuscriptViewRModule,
        LitBookViewRModule,

    ],
    entryComponents: [
    ]
})
export class RAuthorFtrModule { }




import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { DGenreFtrComponent } from './ftr/d-genre.ftr.component';
import { DGenreFtrRoutingModule } from './d-genre.ftr.routing.module';
import { LitGenreViewLModule } from './../../components/lit-genre-view/lit-genre-view-l.module';
import { LitGenreViewOModule } from './../../components/lit-genre-view/lit-genre-view-o.module';
import { LitGenreViewRdModule } from './../../components/lit-genre-view/lit-genre-view-rd.module';
import { LitManuscriptViewRdModule } from './../../components/lit-manuscript-view/lit-manuscript-view-rd.module';
import { LitBookViewRdModule } from './../../components/lit-book-view/lit-book-view-rd.module';

//
// Hint: 
// add the following line
// { path: 'dgenre', loadChildren: () => import('./features/d-genre/d-genre.ftr.module').then(m => m.DGenreFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/dgenre']" routerLinkActive="active">Title for DGenre </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        DGenreFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        DGenreFtrRoutingModule,
        LitGenreViewLModule,
        LitGenreViewOModule,
        LitGenreViewRdModule,
        LitManuscriptViewRdModule,
        LitBookViewRdModule,

    ],
    exports: [
        DGenreFtrComponent,

        LitGenreViewRdModule,
        LitManuscriptViewRdModule,
        LitBookViewRdModule,

    ],
    entryComponents: [
    ]
})
export class DGenreFtrModule { }



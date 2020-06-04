
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { RGenreFtrComponent } from './ftr/r-genre.ftr.component';
import { RGenreFtrRoutingModule } from './r-genre.ftr.routing.module';
import { LitGenreViewLModule } from './../../components/lit-genre-view/lit-genre-view-l.module';
import { LitGenreViewRModule } from './../../components/lit-genre-view/lit-genre-view-r.module';
import { LitManuscriptViewRModule } from './../../components/lit-manuscript-view/lit-manuscript-view-r.module';
import { LitBookViewRModule } from './../../components/lit-book-view/lit-book-view-r.module';

//
// Hint: 
// add the following line
// { path: 'rgenre', loadChildren: () => import('./features/r-genre/r-genre.ftr.module').then(m => m.RGenreFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/rgenre']" routerLinkActive="active">Title for RGenre </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        RGenreFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        RGenreFtrRoutingModule,
        LitGenreViewLModule,
        LitGenreViewRModule,
        LitManuscriptViewRModule,
        LitBookViewRModule,

    ],
    exports: [
        RGenreFtrComponent,

        LitGenreViewRModule,
        LitManuscriptViewRModule,
        LitBookViewRModule,

    ],
    entryComponents: [
    ]
})
export class RGenreFtrModule { }



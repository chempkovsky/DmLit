
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';

import { LitGenreViewRdlistComponent } from './../../components/lit-genre-view/rdlist/lit-genre-view-rdlist.component';
import { LitManuscriptViewRdlistComponent } from './../../components/lit-manuscript-view/rdlist/lit-manuscript-view-rdlist.component';
import { LitBookViewRdlistComponent } from './../../components/lit-book-view/rdlist/lit-book-view-rdlist.component';

import { DGenreFtrComponent } from './ftr/d-genre.ftr.component';

const routes: Routes = [
    { path: '',   redirectTo: 'LitGenreView', pathMatch: 'full' },
    {
        path: '',
        component: DGenreFtrComponent,
        canActivate: [AppGlblSettingsService],
        canActivateChild: [AppGlblSettingsService],
        children: [
// r-routing

// rd-routing
            { path: 'LitGenreView/:depth/LitManuscriptView/:p2x0/Genre/LitBookView/:p3x0/Manuscript', component: LitBookViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitBookView' }},
            { path: 'LitGenreView/:depth/LitManuscriptView/:p2x0/Genre', component: LitManuscriptViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitManuscriptView' }},
            { path: 'LitGenreView', component: LitGenreViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitGenreView' }},
        ]

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DGenreFtrRoutingModule { }



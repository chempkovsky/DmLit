
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';
import { LitGenreViewReditComponent } from './../../components/lit-genre-view/redit/lit-genre-view-redit.component';
import { LitGenreViewRlistComponent } from './../../components/lit-genre-view/rlist/lit-genre-view-rlist.component';
import { LitManuscriptViewReditComponent } from './../../components/lit-manuscript-view/redit/lit-manuscript-view-redit.component';
import { LitManuscriptViewRlistComponent } from './../../components/lit-manuscript-view/rlist/lit-manuscript-view-rlist.component';
import { LitBookViewReditComponent } from './../../components/lit-book-view/redit/lit-book-view-redit.component';
import { LitBookViewRlistComponent } from './../../components/lit-book-view/rlist/lit-book-view-rlist.component';


import { RGenreFtrComponent } from './ftr/r-genre.ftr.component';

const routes: Routes = [
    { path: '',   redirectTo: 'LitGenreView', pathMatch: 'full' },
    {
        path: '',
        component: RGenreFtrComponent,
        canActivate: [AppGlblSettingsService],
        canActivateChild: [AppGlblSettingsService],
        children: [
// r-routing
            { path: 'LitGenreView/:depth/LitManuscriptView/:p2x0/Genre/LitBookView/:p3x0/Manuscript/:p4x0/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitBookView' }},
            { path: 'LitGenreView/:depth/LitManuscriptView/:p2x0/Genre/LitBookView/:p3x0/Manuscript/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Add LitBookView'  }},
            { path: 'LitGenreView/:depth/LitManuscriptView/:p2x0/Genre/LitBookView/:p3x0/Manuscript', component: LitBookViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitBookView'  }},
            { path: 'LitGenreView/:depth/LitManuscriptView/:p2x0/Genre/:p3x0/:mode', component: LitManuscriptViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitManuscriptView' }},
            { path: 'LitGenreView/:depth/LitManuscriptView/:p2x0/Genre/:mode', component: LitManuscriptViewReditComponent, data: { showFilter: true, title: 'Add LitManuscriptView'  }},
            { path: 'LitGenreView/:depth/LitManuscriptView/:p2x0/Genre', component: LitManuscriptViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitManuscriptView'  }},
            { path: 'LitGenreView/:p2x0/:mode', component: LitGenreViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitGenreView' }},
            { path: 'LitGenreView/:mode', component: LitGenreViewReditComponent, data: { showFilter: true, title: 'Add LitGenreView'  }},
            { path: 'LitGenreView', component: LitGenreViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitGenreView'  }},

// rd-routing
        ]

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RGenreFtrRoutingModule { }




import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';
import { LitAuthorViewReditComponent } from './../../components/lit-author-view/redit/lit-author-view-redit.component';
import { LitAuthorViewRlistComponent } from './../../components/lit-author-view/rlist/lit-author-view-rlist.component';
import { LitManuscriptViewReditComponent } from './../../components/lit-manuscript-view/redit/lit-manuscript-view-redit.component';
import { LitManuscriptViewRlistComponent } from './../../components/lit-manuscript-view/rlist/lit-manuscript-view-rlist.component';
import { LitBookViewReditComponent } from './../../components/lit-book-view/redit/lit-book-view-redit.component';
import { LitBookViewRlistComponent } from './../../components/lit-book-view/rlist/lit-book-view-rlist.component';


import { RAuthorFtrComponent } from './ftr/r-author.ftr.component';

const routes: Routes = [
    { path: '',   redirectTo: 'LitAuthorView', pathMatch: 'full' },
    {
        path: '',
        component: RAuthorFtrComponent,
        canActivate: [AppGlblSettingsService],
        canActivateChild: [AppGlblSettingsService],
        children: [
// r-routing
            { path: 'LitAuthorView/:depth/LitManuscriptView/:p2x0/Author/LitBookView/:p3x0/Manuscript/:p4x0/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitBookView' }},
            { path: 'LitAuthorView/:depth/LitManuscriptView/:p2x0/Author/LitBookView/:p3x0/Manuscript/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Add LitBookView'  }},
            { path: 'LitAuthorView/:depth/LitManuscriptView/:p2x0/Author/LitBookView/:p3x0/Manuscript', component: LitBookViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitBookView'  }},
            { path: 'LitAuthorView/:depth/LitManuscriptView/:p2x0/Author/:p3x0/:mode', component: LitManuscriptViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitManuscriptView' }},
            { path: 'LitAuthorView/:depth/LitManuscriptView/:p2x0/Author/:mode', component: LitManuscriptViewReditComponent, data: { showFilter: true, title: 'Add LitManuscriptView'  }},
            { path: 'LitAuthorView/:depth/LitManuscriptView/:p2x0/Author', component: LitManuscriptViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitManuscriptView'  }},
            { path: 'LitAuthorView/:p2x0/:mode', component: LitAuthorViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitAuthorView' }},
            { path: 'LitAuthorView/:mode', component: LitAuthorViewReditComponent, data: { showFilter: true, title: 'Add LitAuthorView'  }},
            { path: 'LitAuthorView', component: LitAuthorViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitAuthorView'  }},

// rd-routing
        ]

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RAuthorFtrRoutingModule { }



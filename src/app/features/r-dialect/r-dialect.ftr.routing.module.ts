
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';
import { LitDialectViewReditComponent } from './../../components/lit-dialect-view/redit/lit-dialect-view-redit.component';
import { LitDialectViewRlistComponent } from './../../components/lit-dialect-view/rlist/lit-dialect-view-rlist.component';
import { LitManuscriptViewReditComponent } from './../../components/lit-manuscript-view/redit/lit-manuscript-view-redit.component';
import { LitManuscriptViewRlistComponent } from './../../components/lit-manuscript-view/rlist/lit-manuscript-view-rlist.component';
import { LitBookViewReditComponent } from './../../components/lit-book-view/redit/lit-book-view-redit.component';
import { LitBookViewRlistComponent } from './../../components/lit-book-view/rlist/lit-book-view-rlist.component';


import { RDialectFtrComponent } from './ftr/r-dialect.ftr.component';

const routes: Routes = [
    { path: '',   redirectTo: 'LitDialectView', pathMatch: 'full' },
    {
        path: '',
        component: RDialectFtrComponent,
        canActivate: [AppGlblSettingsService],
        canActivateChild: [AppGlblSettingsService],
        children: [
// r-routing
            { path: 'LitDialectView/:depth/LitManuscriptView/:p2x0/Dialect/LitBookView/:p3x0/Manuscript/:p4x0/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitBookView' }},
            { path: 'LitDialectView/:depth/LitManuscriptView/:p2x0/Dialect/LitBookView/:p3x0/Manuscript/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Add LitBookView'  }},
            { path: 'LitDialectView/:depth/LitManuscriptView/:p2x0/Dialect/LitBookView/:p3x0/Manuscript', component: LitBookViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitBookView'  }},
            { path: 'LitDialectView/:depth/LitManuscriptView/:p2x0/Dialect/:p3x0/:mode', component: LitManuscriptViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitManuscriptView' }},
            { path: 'LitDialectView/:depth/LitManuscriptView/:p2x0/Dialect/:mode', component: LitManuscriptViewReditComponent, data: { showFilter: true, title: 'Add LitManuscriptView'  }},
            { path: 'LitDialectView/:depth/LitManuscriptView/:p2x0/Dialect', component: LitManuscriptViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitManuscriptView'  }},
            { path: 'LitDialectView/:p2x0/:mode', component: LitDialectViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitDialectView' }},
            { path: 'LitDialectView/:mode', component: LitDialectViewReditComponent, data: { showFilter: true, title: 'Add LitDialectView'  }},
            { path: 'LitDialectView', component: LitDialectViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitDialectView'  }},

// rd-routing
        ]

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RDialectFtrRoutingModule { }



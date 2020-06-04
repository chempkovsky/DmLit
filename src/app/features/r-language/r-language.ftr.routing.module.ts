
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';
import { LitLanguageViewReditComponent } from './../../components/lit-language-view/redit/lit-language-view-redit.component';
import { LitLanguageViewRlistComponent } from './../../components/lit-language-view/rlist/lit-language-view-rlist.component';
import { LitDialectViewReditComponent } from './../../components/lit-dialect-view/redit/lit-dialect-view-redit.component';
import { LitDialectViewRlistComponent } from './../../components/lit-dialect-view/rlist/lit-dialect-view-rlist.component';
import { LitManuscriptViewReditComponent } from './../../components/lit-manuscript-view/redit/lit-manuscript-view-redit.component';
import { LitManuscriptViewRlistComponent } from './../../components/lit-manuscript-view/rlist/lit-manuscript-view-rlist.component';
import { LitBookViewReditComponent } from './../../components/lit-book-view/redit/lit-book-view-redit.component';
import { LitBookViewRlistComponent } from './../../components/lit-book-view/rlist/lit-book-view-rlist.component';


import { RLanguageFtrComponent } from './ftr/r-language.ftr.component';

const routes: Routes = [
    { path: '',   redirectTo: 'LitLanguageView', pathMatch: 'full' },
    {
        path: '',
        component: RLanguageFtrComponent,
        canActivate: [AppGlblSettingsService],
        canActivateChild: [AppGlblSettingsService],
        children: [
// r-routing
            { path: 'LitLanguageView/:depth/LitDialectView/:p2x0/:p2x1/Language/LitManuscriptView/:p3x0/Dialect/LitBookView/:p4x0/Manuscript/:p5x0/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitBookView' }},
            { path: 'LitLanguageView/:depth/LitDialectView/:p2x0/:p2x1/Language/LitManuscriptView/:p3x0/Dialect/LitBookView/:p4x0/Manuscript/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Add LitBookView'  }},
            { path: 'LitLanguageView/:depth/LitDialectView/:p2x0/:p2x1/Language/LitManuscriptView/:p3x0/Dialect/LitBookView/:p4x0/Manuscript', component: LitBookViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitBookView'  }},
            { path: 'LitLanguageView/:depth/LitDialectView/:p2x0/:p2x1/Language/LitManuscriptView/:p3x0/Dialect/:p4x0/:mode', component: LitManuscriptViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitManuscriptView' }},
            { path: 'LitLanguageView/:depth/LitDialectView/:p2x0/:p2x1/Language/LitManuscriptView/:p3x0/Dialect/:mode', component: LitManuscriptViewReditComponent, data: { showFilter: true, title: 'Add LitManuscriptView'  }},
            { path: 'LitLanguageView/:depth/LitDialectView/:p2x0/:p2x1/Language/LitManuscriptView/:p3x0/Dialect', component: LitManuscriptViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitManuscriptView'  }},
            { path: 'LitLanguageView/:depth/LitDialectView/:p2x0/:p2x1/Language/:p3x0/:mode', component: LitDialectViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitDialectView' }},
            { path: 'LitLanguageView/:depth/LitDialectView/:p2x0/:p2x1/Language/:mode', component: LitDialectViewReditComponent, data: { showFilter: true, title: 'Add LitDialectView'  }},
            { path: 'LitLanguageView/:depth/LitDialectView/:p2x0/:p2x1/Language', component: LitDialectViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitDialectView'  }},
            { path: 'LitLanguageView/:p2x0/:p2x1/:mode', component: LitLanguageViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitLanguageView' }},
            { path: 'LitLanguageView/:mode', component: LitLanguageViewReditComponent, data: { showFilter: true, title: 'Add LitLanguageView'  }},
            { path: 'LitLanguageView', component: LitLanguageViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitLanguageView'  }},

// rd-routing
        ]

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RLanguageFtrRoutingModule { }



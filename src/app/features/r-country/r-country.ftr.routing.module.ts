
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';
import { LitCountryViewReditComponent } from './../../components/lit-country-view/redit/lit-country-view-redit.component';
import { LitCountryViewRlistComponent } from './../../components/lit-country-view/rlist/lit-country-view-rlist.component';
import { LitDialectViewReditComponent } from './../../components/lit-dialect-view/redit/lit-dialect-view-redit.component';
import { LitDialectViewRlistComponent } from './../../components/lit-dialect-view/rlist/lit-dialect-view-rlist.component';
import { LitAuthorViewReditComponent } from './../../components/lit-author-view/redit/lit-author-view-redit.component';
import { LitAuthorViewRlistComponent } from './../../components/lit-author-view/rlist/lit-author-view-rlist.component';
import { LitPublisherViewReditComponent } from './../../components/lit-publisher-view/redit/lit-publisher-view-redit.component';
import { LitPublisherViewRlistComponent } from './../../components/lit-publisher-view/rlist/lit-publisher-view-rlist.component';
import { LitManuscriptViewReditComponent } from './../../components/lit-manuscript-view/redit/lit-manuscript-view-redit.component';
import { LitManuscriptViewRlistComponent } from './../../components/lit-manuscript-view/rlist/lit-manuscript-view-rlist.component';
import { LitBookViewReditComponent } from './../../components/lit-book-view/redit/lit-book-view-redit.component';
import { LitBookViewRlistComponent } from './../../components/lit-book-view/rlist/lit-book-view-rlist.component';


import { RCountryFtrComponent } from './ftr/r-country.ftr.component';

const routes: Routes = [
    { path: '',   redirectTo: 'LitCountryView', pathMatch: 'full' },
    {
        path: '',
        component: RCountryFtrComponent,
        canActivate: [AppGlblSettingsService],
        canActivateChild: [AppGlblSettingsService],
        children: [
// r-routing
            { path: 'LitCountryView/:depth/LitAuthorView/:p2x0/:p2x1/Country/LitManuscriptView/:p3x0/Author/LitBookView/:p4x0/Manuscript/:p5x0/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitBookView' }},
            { path: 'LitCountryView/:depth/LitAuthorView/:p2x0/:p2x1/Country/LitManuscriptView/:p3x0/Author/LitBookView/:p4x0/Manuscript/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Add LitBookView'  }},
            { path: 'LitCountryView/:depth/LitAuthorView/:p2x0/:p2x1/Country/LitManuscriptView/:p3x0/Author/LitBookView/:p4x0/Manuscript', component: LitBookViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitBookView'  }},
            { path: 'LitCountryView/:depth/LitDialectView/:p2x0/:p2x1/Country/LitManuscriptView/:p3x0/Dialect/LitBookView/:p4x0/Manuscript/:p5x0/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitBookView' }},
            { path: 'LitCountryView/:depth/LitDialectView/:p2x0/:p2x1/Country/LitManuscriptView/:p3x0/Dialect/LitBookView/:p4x0/Manuscript/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Add LitBookView'  }},
            { path: 'LitCountryView/:depth/LitDialectView/:p2x0/:p2x1/Country/LitManuscriptView/:p3x0/Dialect/LitBookView/:p4x0/Manuscript', component: LitBookViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitBookView'  }},
            { path: 'LitCountryView/:depth/LitPublisherView/:p2x0/:p2x1/Country/LitBookView/:p3x0/Publisher/:p4x0/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitBookView' }},
            { path: 'LitCountryView/:depth/LitPublisherView/:p2x0/:p2x1/Country/LitBookView/:p3x0/Publisher/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Add LitBookView'  }},
            { path: 'LitCountryView/:depth/LitPublisherView/:p2x0/:p2x1/Country/LitBookView/:p3x0/Publisher', component: LitBookViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitBookView'  }},
            { path: 'LitCountryView/:depth/LitAuthorView/:p2x0/:p2x1/Country/LitManuscriptView/:p3x0/Author/:p4x0/:mode', component: LitManuscriptViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitManuscriptView' }},
            { path: 'LitCountryView/:depth/LitAuthorView/:p2x0/:p2x1/Country/LitManuscriptView/:p3x0/Author/:mode', component: LitManuscriptViewReditComponent, data: { showFilter: true, title: 'Add LitManuscriptView'  }},
            { path: 'LitCountryView/:depth/LitAuthorView/:p2x0/:p2x1/Country/LitManuscriptView/:p3x0/Author', component: LitManuscriptViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitManuscriptView'  }},
            { path: 'LitCountryView/:depth/LitDialectView/:p2x0/:p2x1/Country/LitManuscriptView/:p3x0/Dialect/:p4x0/:mode', component: LitManuscriptViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitManuscriptView' }},
            { path: 'LitCountryView/:depth/LitDialectView/:p2x0/:p2x1/Country/LitManuscriptView/:p3x0/Dialect/:mode', component: LitManuscriptViewReditComponent, data: { showFilter: true, title: 'Add LitManuscriptView'  }},
            { path: 'LitCountryView/:depth/LitDialectView/:p2x0/:p2x1/Country/LitManuscriptView/:p3x0/Dialect', component: LitManuscriptViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitManuscriptView'  }},
            { path: 'LitCountryView/:depth/LitPublisherView/:p2x0/:p2x1/Country/:p3x0/:mode', component: LitPublisherViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitPublisherView' }},
            { path: 'LitCountryView/:depth/LitPublisherView/:p2x0/:p2x1/Country/:mode', component: LitPublisherViewReditComponent, data: { showFilter: true, title: 'Add LitPublisherView'  }},
            { path: 'LitCountryView/:depth/LitPublisherView/:p2x0/:p2x1/Country', component: LitPublisherViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitPublisherView'  }},
            { path: 'LitCountryView/:depth/LitAuthorView/:p2x0/:p2x1/Country/:p3x0/:mode', component: LitAuthorViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitAuthorView' }},
            { path: 'LitCountryView/:depth/LitAuthorView/:p2x0/:p2x1/Country/:mode', component: LitAuthorViewReditComponent, data: { showFilter: true, title: 'Add LitAuthorView'  }},
            { path: 'LitCountryView/:depth/LitAuthorView/:p2x0/:p2x1/Country', component: LitAuthorViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitAuthorView'  }},
            { path: 'LitCountryView/:depth/LitDialectView/:p2x0/:p2x1/Country/:p3x0/:mode', component: LitDialectViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitDialectView' }},
            { path: 'LitCountryView/:depth/LitDialectView/:p2x0/:p2x1/Country/:mode', component: LitDialectViewReditComponent, data: { showFilter: true, title: 'Add LitDialectView'  }},
            { path: 'LitCountryView/:depth/LitDialectView/:p2x0/:p2x1/Country', component: LitDialectViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitDialectView'  }},
            { path: 'LitCountryView/:p2x0/:p2x1/:mode', component: LitCountryViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitCountryView' }},
            { path: 'LitCountryView/:mode', component: LitCountryViewReditComponent, data: { showFilter: true, title: 'Add LitCountryView'  }},
            { path: 'LitCountryView', component: LitCountryViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitCountryView'  }},

// rd-routing
        ]

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RCountryFtrRoutingModule { }



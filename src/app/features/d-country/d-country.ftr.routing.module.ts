
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';

import { LitCountryViewRdlistComponent } from './../../components/lit-country-view/rdlist/lit-country-view-rdlist.component';
import { LitDialectViewRdlistComponent } from './../../components/lit-dialect-view/rdlist/lit-dialect-view-rdlist.component';
import { LitAuthorViewRdlistComponent } from './../../components/lit-author-view/rdlist/lit-author-view-rdlist.component';
import { LitPublisherViewRdlistComponent } from './../../components/lit-publisher-view/rdlist/lit-publisher-view-rdlist.component';
import { LitManuscriptViewRdlistComponent } from './../../components/lit-manuscript-view/rdlist/lit-manuscript-view-rdlist.component';
import { LitBookViewRdlistComponent } from './../../components/lit-book-view/rdlist/lit-book-view-rdlist.component';

import { DCountryFtrComponent } from './ftr/d-country.ftr.component';

const routes: Routes = [
    { path: '',   redirectTo: 'LitCountryView', pathMatch: 'full' },
    {
        path: '',
        component: DCountryFtrComponent,
        canActivate: [AppGlblSettingsService],
        canActivateChild: [AppGlblSettingsService],
        children: [
// r-routing

// rd-routing
            { path: 'LitCountryView/:depth/LitAuthorView/:p2x0/:p2x1/Country/LitManuscriptView/:p3x0/Author/LitBookView/:p4x0/Manuscript', component: LitBookViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitBookView' }},
            { path: 'LitCountryView/:depth/LitDialectView/:p2x0/:p2x1/Country/LitManuscriptView/:p3x0/Dialect/LitBookView/:p4x0/Manuscript', component: LitBookViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitBookView' }},
            { path: 'LitCountryView/:depth/LitPublisherView/:p2x0/:p2x1/Country/LitBookView/:p3x0/Publisher', component: LitBookViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitBookView' }},
            { path: 'LitCountryView/:depth/LitAuthorView/:p2x0/:p2x1/Country/LitManuscriptView/:p3x0/Author', component: LitManuscriptViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitManuscriptView' }},
            { path: 'LitCountryView/:depth/LitDialectView/:p2x0/:p2x1/Country/LitManuscriptView/:p3x0/Dialect', component: LitManuscriptViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitManuscriptView' }},
            { path: 'LitCountryView/:depth/LitPublisherView/:p2x0/:p2x1/Country', component: LitPublisherViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitPublisherView' }},
            { path: 'LitCountryView/:depth/LitAuthorView/:p2x0/:p2x1/Country', component: LitAuthorViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitAuthorView' }},
            { path: 'LitCountryView/:depth/LitDialectView/:p2x0/:p2x1/Country', component: LitDialectViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitDialectView' }},
            { path: 'LitCountryView', component: LitCountryViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitCountryView' }},
        ]

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DCountryFtrRoutingModule { }



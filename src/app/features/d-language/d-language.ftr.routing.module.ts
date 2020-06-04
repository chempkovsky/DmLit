
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';

import { LitLanguageViewRdlistComponent } from './../../components/lit-language-view/rdlist/lit-language-view-rdlist.component';
import { LitDialectViewRdlistComponent } from './../../components/lit-dialect-view/rdlist/lit-dialect-view-rdlist.component';
import { LitManuscriptViewRdlistComponent } from './../../components/lit-manuscript-view/rdlist/lit-manuscript-view-rdlist.component';
import { LitBookViewRdlistComponent } from './../../components/lit-book-view/rdlist/lit-book-view-rdlist.component';

import { DLanguageFtrComponent } from './ftr/d-language.ftr.component';

const routes: Routes = [
    { path: '',   redirectTo: 'LitLanguageView', pathMatch: 'full' },
    {
        path: '',
        component: DLanguageFtrComponent,
        canActivate: [AppGlblSettingsService],
        canActivateChild: [AppGlblSettingsService],
        children: [
// r-routing

// rd-routing
            { path: 'LitLanguageView/:depth/LitDialectView/:p2x0/:p2x1/Language/LitManuscriptView/:p3x0/Dialect/LitBookView/:p4x0/Manuscript', component: LitBookViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitBookView' }},
            { path: 'LitLanguageView/:depth/LitDialectView/:p2x0/:p2x1/Language/LitManuscriptView/:p3x0/Dialect', component: LitManuscriptViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitManuscriptView' }},
            { path: 'LitLanguageView/:depth/LitDialectView/:p2x0/:p2x1/Language', component: LitDialectViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitDialectView' }},
            { path: 'LitLanguageView', component: LitLanguageViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitLanguageView' }},
        ]

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DLanguageFtrRoutingModule { }



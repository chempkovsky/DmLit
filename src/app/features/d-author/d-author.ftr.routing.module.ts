
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';

import { LitAuthorViewRdlistComponent } from './../../components/lit-author-view/rdlist/lit-author-view-rdlist.component';
import { LitManuscriptViewRdlistComponent } from './../../components/lit-manuscript-view/rdlist/lit-manuscript-view-rdlist.component';
import { LitBookViewRdlistComponent } from './../../components/lit-book-view/rdlist/lit-book-view-rdlist.component';

import { DAuthorFtrComponent } from './ftr/d-author.ftr.component';

const routes: Routes = [
    { path: '',   redirectTo: 'LitAuthorView', pathMatch: 'full' },
    {
        path: '',
        component: DAuthorFtrComponent,
        canActivate: [AppGlblSettingsService],
        canActivateChild: [AppGlblSettingsService],
        children: [
// r-routing

// rd-routing
            { path: 'LitAuthorView/:depth/LitManuscriptView/:p2x0/Author/LitBookView/:p3x0/Manuscript', component: LitBookViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitBookView' }},
            { path: 'LitAuthorView/:depth/LitManuscriptView/:p2x0/Author', component: LitManuscriptViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitManuscriptView' }},
            { path: 'LitAuthorView', component: LitAuthorViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitAuthorView' }},
        ]

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DAuthorFtrRoutingModule { }



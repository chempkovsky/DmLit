
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';

import { LitDialectViewRdlistComponent } from './../../components/lit-dialect-view/rdlist/lit-dialect-view-rdlist.component';
import { LitManuscriptViewRdlistComponent } from './../../components/lit-manuscript-view/rdlist/lit-manuscript-view-rdlist.component';
import { LitBookViewRdlistComponent } from './../../components/lit-book-view/rdlist/lit-book-view-rdlist.component';

import { DDialectFtrComponent } from './ftr/d-dialect.ftr.component';

const routes: Routes = [
    { path: '',   redirectTo: 'LitDialectView', pathMatch: 'full' },
    {
        path: '',
        component: DDialectFtrComponent,
        canActivate: [AppGlblSettingsService],
        canActivateChild: [AppGlblSettingsService],
        children: [
// r-routing

// rd-routing
            { path: 'LitDialectView/:depth/LitManuscriptView/:p2x0/Dialect/LitBookView/:p3x0/Manuscript', component: LitBookViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitBookView' }},
            { path: 'LitDialectView/:depth/LitManuscriptView/:p2x0/Dialect', component: LitManuscriptViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitManuscriptView' }},
            { path: 'LitDialectView', component: LitDialectViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitDialectView' }},
        ]

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DDialectFtrRoutingModule { }



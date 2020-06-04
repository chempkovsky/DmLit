
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';

import { LitEditionViewRdlistComponent } from './../../components/lit-edition-view/rdlist/lit-edition-view-rdlist.component';
import { LitBookViewRdlistComponent } from './../../components/lit-book-view/rdlist/lit-book-view-rdlist.component';

import { DEditionFtrComponent } from './ftr/d-edition.ftr.component';

const routes: Routes = [
    { path: '',   redirectTo: 'LitEditionView', pathMatch: 'full' },
    {
        path: '',
        component: DEditionFtrComponent,
        canActivate: [AppGlblSettingsService],
        canActivateChild: [AppGlblSettingsService],
        children: [
// r-routing

// rd-routing
            { path: 'LitEditionView/:depth/LitBookView/:p2x0/Edition', component: LitBookViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitBookView' }},
            { path: 'LitEditionView', component: LitEditionViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitEditionView' }},
        ]

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DEditionFtrRoutingModule { }



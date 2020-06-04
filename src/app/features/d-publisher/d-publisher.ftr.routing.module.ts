
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';

import { LitPublisherViewRdlistComponent } from './../../components/lit-publisher-view/rdlist/lit-publisher-view-rdlist.component';
import { LitBookViewRdlistComponent } from './../../components/lit-book-view/rdlist/lit-book-view-rdlist.component';

import { DPublisherFtrComponent } from './ftr/d-publisher.ftr.component';

const routes: Routes = [
    { path: '',   redirectTo: 'LitPublisherView', pathMatch: 'full' },
    {
        path: '',
        component: DPublisherFtrComponent,
        canActivate: [AppGlblSettingsService],
        canActivateChild: [AppGlblSettingsService],
        children: [
// r-routing

// rd-routing
            { path: 'LitPublisherView/:depth/LitBookView/:p2x0/Publisher', component: LitBookViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitBookView' }},
            { path: 'LitPublisherView', component: LitPublisherViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitPublisherView' }},
        ]

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DPublisherFtrRoutingModule { }



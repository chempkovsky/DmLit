
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';
import { LitPublisherViewReditComponent } from './../../components/lit-publisher-view/redit/lit-publisher-view-redit.component';
import { LitPublisherViewRlistComponent } from './../../components/lit-publisher-view/rlist/lit-publisher-view-rlist.component';
import { LitBookViewReditComponent } from './../../components/lit-book-view/redit/lit-book-view-redit.component';
import { LitBookViewRlistComponent } from './../../components/lit-book-view/rlist/lit-book-view-rlist.component';


import { RPublisherFtrComponent } from './ftr/r-publisher.ftr.component';

const routes: Routes = [
    { path: '',   redirectTo: 'LitPublisherView', pathMatch: 'full' },
    {
        path: '',
        component: RPublisherFtrComponent,
        canActivate: [AppGlblSettingsService],
        canActivateChild: [AppGlblSettingsService],
        children: [
// r-routing
            { path: 'LitPublisherView/:depth/LitBookView/:p2x0/Publisher/:p3x0/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitBookView' }},
            { path: 'LitPublisherView/:depth/LitBookView/:p2x0/Publisher/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Add LitBookView'  }},
            { path: 'LitPublisherView/:depth/LitBookView/:p2x0/Publisher', component: LitBookViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitBookView'  }},
            { path: 'LitPublisherView/:p2x0/:mode', component: LitPublisherViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitPublisherView' }},
            { path: 'LitPublisherView/:mode', component: LitPublisherViewReditComponent, data: { showFilter: true, title: 'Add LitPublisherView'  }},
            { path: 'LitPublisherView', component: LitPublisherViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitPublisherView'  }},

// rd-routing
        ]

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RPublisherFtrRoutingModule { }



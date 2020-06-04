
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';
import { LitEditionViewReditComponent } from './../../components/lit-edition-view/redit/lit-edition-view-redit.component';
import { LitEditionViewRlistComponent } from './../../components/lit-edition-view/rlist/lit-edition-view-rlist.component';
import { LitBookViewReditComponent } from './../../components/lit-book-view/redit/lit-book-view-redit.component';
import { LitBookViewRlistComponent } from './../../components/lit-book-view/rlist/lit-book-view-rlist.component';


import { REditionFtrComponent } from './ftr/r-edition.ftr.component';

const routes: Routes = [
    { path: '',   redirectTo: 'LitEditionView', pathMatch: 'full' },
    {
        path: '',
        component: REditionFtrComponent,
        canActivate: [AppGlblSettingsService],
        canActivateChild: [AppGlblSettingsService],
        children: [
// r-routing
            { path: 'LitEditionView/:depth/LitBookView/:p2x0/Edition/:p3x0/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitBookView' }},
            { path: 'LitEditionView/:depth/LitBookView/:p2x0/Edition/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Add LitBookView'  }},
            { path: 'LitEditionView/:depth/LitBookView/:p2x0/Edition', component: LitBookViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitBookView'  }},
            { path: 'LitEditionView/:p2x0/:mode', component: LitEditionViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitEditionView' }},
            { path: 'LitEditionView/:mode', component: LitEditionViewReditComponent, data: { showFilter: true, title: 'Add LitEditionView'  }},
            { path: 'LitEditionView', component: LitEditionViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitEditionView'  }},

// rd-routing
        ]

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class REditionFtrRoutingModule { }



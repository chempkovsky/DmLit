
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';
import { LitBookViewReditComponent } from './../../components/lit-book-view/redit/lit-book-view-redit.component';
import { LitBookViewRlistComponent } from './../../components/lit-book-view/rlist/lit-book-view-rlist.component';


import { RBookFtrComponent } from './ftr/r-book.ftr.component';

const routes: Routes = [
    { path: '',   redirectTo: 'LitBookView', pathMatch: 'full' },
    {
        path: '',
        component: RBookFtrComponent,
        canActivate: [AppGlblSettingsService],
        canActivateChild: [AppGlblSettingsService],
        children: [
// r-routing
            { path: 'LitBookView/:p2x0/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Modify(Delete) LitBookView' }},
            { path: 'LitBookView/:mode', component: LitBookViewReditComponent, data: { showFilter: true, title: 'Add LitBookView'  }},
            { path: 'LitBookView', component: LitBookViewRlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title: 'List of LitBookView'  }},

// rd-routing
        ]

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RBookFtrRoutingModule { }



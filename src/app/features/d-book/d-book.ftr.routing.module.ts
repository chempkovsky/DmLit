
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';

import { LitBookViewRdlistComponent } from './../../components/lit-book-view/rdlist/lit-book-view-rdlist.component';

import { DBookFtrComponent } from './ftr/d-book.ftr.component';

const routes: Routes = [
    { path: '',   redirectTo: 'LitBookView', pathMatch: 'full' },
    {
        path: '',
        component: DBookFtrComponent,
        canActivate: [AppGlblSettingsService],
        canActivateChild: [AppGlblSettingsService],
        children: [
// r-routing

// rd-routing
            { path: 'LitBookView', component: LitBookViewRdlistComponent, data: { filterMaxHeight: 2, maxHeight: 10, showFilter: true, title:  'List of LitBookView' }},
        ]

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DBookFtrRoutingModule { }



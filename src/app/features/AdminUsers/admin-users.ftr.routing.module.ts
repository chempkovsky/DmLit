
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';


import { AdminUsersFtrComponent } from './ftr/admin-users.ftr.component';

const routes: Routes = [
    {
        path: '',
        component: AdminUsersFtrComponent,
        canActivate: [AppGlblSettingsService],

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUsersFtrRoutingModule { }



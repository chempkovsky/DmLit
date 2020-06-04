
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';


import { AdminRolesFtrComponent } from './ftr/admin-roles.ftr.component';

const routes: Routes = [
    {
        path: '',
        component: AdminRolesFtrComponent,
        canActivate: [AppGlblSettingsService],

    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRolesFtrRoutingModule { }



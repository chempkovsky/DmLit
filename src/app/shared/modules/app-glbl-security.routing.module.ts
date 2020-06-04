

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGlblChngpswdComponent } from './../components/app-glbl-chngpswd/app-glbl-chngpswd.component';
import { AppGlblLogoutComponent } from './../components/app-glbl-logout/app-glbl-logout.component';
import { AppGlblLoginComponent } from './../components/app-glbl-login/app-glbl-login.component';
import { AppGlblRegisterComponent } from './../components/app-glbl-register/app-glbl-register.component';
import { AppScrtDashboardComponent } from './../components/app-scrt-dashboard/app-scrt-dashboard.component';

const routes: Routes = [
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    {
        path: '',
        component: AppScrtDashboardComponent,
        children: [
            { path: 'login', component: AppGlblLoginComponent  },
            { path: 'logout', component: AppGlblLogoutComponent  },
            { path: 'register', component: AppGlblRegisterComponent  },
            { path: 'changepassword', component: AppGlblChngpswdComponent  },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppGlblSecurityRoutingModule { }



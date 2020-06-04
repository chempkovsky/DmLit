
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppGlblHomeComponent } from './shared/components/app-glbl-home/app-glbl-home.component';
import { AppGlblPagenotfoundComponent } from './shared/components/app-glbl-pagenotfound/app-glbl-pagenotfound.component';

const routes: Routes = [
  { path: 'authentication', loadChildren: () => import('./shared/modules/app-glbl-security.module').then(m => m.AppGlblSecurityModule) },  
  { path: 'adminusers', loadChildren: () => import('./features/AdminUsers/admin-users.ftr.module').then(m => m.AdminUsersFtrModule) }, 

  { path: 'adminroles', loadChildren: () => import('./features/AdminRoles/admin-roles.ftr.module').then(m => m.AdminRolesFtrModule) }, 
  { path: 'rbook', loadChildren: () => import('./features/r-book/r-book.ftr.module').then(m => m.RBookFtrModule) }, 
  { path: 'dbook', loadChildren: () => import('./features/d-book/d-book.ftr.module').then(m => m.DBookFtrModule) }, 
  { path: 'rmanuscript', loadChildren: () => import('./features/r-manuscript/r-manuscript.ftr.module').then(m => m.RManuscriptFtrModule) }, 
  { path: 'dmanuscript', loadChildren: () => import('./features/d-manuscript/d-manuscript.ftr.module').then(m => m.DManuscriptFtrModule) }, 
  { path: 'rpublisher', loadChildren: () => import('./features/r-publisher/r-publisher.ftr.module').then(m => m.RPublisherFtrModule) }, 
  { path: 'dpublisher', loadChildren: () => import('./features/d-publisher/d-publisher.ftr.module').then(m => m.DPublisherFtrModule) }, 
  { path: 'rauthor', loadChildren: () => import('./features/r-author/r-author.ftr.module').then(m => m.RAuthorFtrModule) }, 
  { path: 'dauthor', loadChildren: () => import('./features/d-author/d-author.ftr.module').then(m => m.DAuthorFtrModule) }, 
  { path: 'rdialect', loadChildren: () => import('./features/r-dialect/r-dialect.ftr.module').then(m => m.RDialectFtrModule) }, 
  { path: 'ddialect', loadChildren: () => import('./features/d-dialect/d-dialect.ftr.module').then(m => m.DDialectFtrModule) }, 
  { path: 'redition', loadChildren: () => import('./features/r-edition/r-edition.ftr.module').then(m => m.REditionFtrModule) }, 
  { path: 'dedition', loadChildren: () => import('./features/d-edition/d-edition.ftr.module').then(m => m.DEditionFtrModule) }, 
  { path: 'rgenre', loadChildren: () => import('./features/r-genre/r-genre.ftr.module').then(m => m.RGenreFtrModule) }, 
  { path: 'dgenre', loadChildren: () => import('./features/d-genre/d-genre.ftr.module').then(m => m.DGenreFtrModule) }, 
  { path: 'rcountry', loadChildren: () => import('./features/r-country/r-country.ftr.module').then(m => m.RCountryFtrModule) }, 
  { path: 'dcountry', loadChildren: () => import('./features/d-country/d-country.ftr.module').then(m => m.DCountryFtrModule) }, 

  { path: 'home', component: AppGlblHomeComponent }, 
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, 
  { path: '**', component: AppGlblHomeComponent },
  { path: '**', component: AppGlblPagenotfoundComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { RBookFtrComponent } from './ftr/r-book.ftr.component';
import { RBookFtrRoutingModule } from './r-book.ftr.routing.module';
import { LitBookViewLModule } from './../../components/lit-book-view/lit-book-view-l.module';
import { LitBookViewRModule } from './../../components/lit-book-view/lit-book-view-r.module';

//
// Hint: 
// add the following line
// { path: 'rbook', loadChildren: () => import('./features/r-book/r-book.ftr.module').then(m => m.RBookFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/rbook']" routerLinkActive="active">Title for RBook </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        RBookFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        RBookFtrRoutingModule,
        LitBookViewLModule,
        LitBookViewRModule,

    ],
    exports: [
        RBookFtrComponent,

        LitBookViewRModule,

    ],
    entryComponents: [
    ]
})
export class RBookFtrModule { }



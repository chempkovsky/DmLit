
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { DBookFtrComponent } from './ftr/d-book.ftr.component';
import { DBookFtrRoutingModule } from './d-book.ftr.routing.module';
import { LitBookViewLModule } from './../../components/lit-book-view/lit-book-view-l.module';
import { LitBookViewRdModule } from './../../components/lit-book-view/lit-book-view-rd.module';

//
// Hint: 
// add the following line
// { path: 'dbook', loadChildren: () => import('./features/d-book/d-book.ftr.module').then(m => m.DBookFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/dbook']" routerLinkActive="active">Title for DBook </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        DBookFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        DBookFtrRoutingModule,
        LitBookViewLModule,
        LitBookViewRdModule,

    ],
    exports: [
        DBookFtrComponent,

        LitBookViewRdModule,

    ],
    entryComponents: [
    ]
})
export class DBookFtrModule { }



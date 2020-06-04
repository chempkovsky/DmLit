
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { REditionFtrComponent } from './ftr/r-edition.ftr.component';
import { REditionFtrRoutingModule } from './r-edition.ftr.routing.module';
import { LitEditionViewLModule } from './../../components/lit-edition-view/lit-edition-view-l.module';
import { LitEditionViewRModule } from './../../components/lit-edition-view/lit-edition-view-r.module';
import { LitBookViewRModule } from './../../components/lit-book-view/lit-book-view-r.module';

//
// Hint: 
// add the following line
// { path: 'redition', loadChildren: () => import('./features/r-edition/r-edition.ftr.module').then(m => m.REditionFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/redition']" routerLinkActive="active">Title for REdition </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        REditionFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        REditionFtrRoutingModule,
        LitEditionViewLModule,
        LitEditionViewRModule,
        LitBookViewRModule,

    ],
    exports: [
        REditionFtrComponent,

        LitEditionViewRModule,
        LitBookViewRModule,

    ],
    entryComponents: [
    ]
})
export class REditionFtrModule { }



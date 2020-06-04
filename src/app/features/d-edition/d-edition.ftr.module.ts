
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { DEditionFtrComponent } from './ftr/d-edition.ftr.component';
import { DEditionFtrRoutingModule } from './d-edition.ftr.routing.module';
import { LitEditionViewLModule } from './../../components/lit-edition-view/lit-edition-view-l.module';
import { LitEditionViewOModule } from './../../components/lit-edition-view/lit-edition-view-o.module';
import { LitEditionViewRdModule } from './../../components/lit-edition-view/lit-edition-view-rd.module';
import { LitBookViewRdModule } from './../../components/lit-book-view/lit-book-view-rd.module';

//
// Hint: 
// add the following line
// { path: 'dedition', loadChildren: () => import('./features/d-edition/d-edition.ftr.module').then(m => m.DEditionFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/dedition']" routerLinkActive="active">Title for DEdition </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        DEditionFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        DEditionFtrRoutingModule,
        LitEditionViewLModule,
        LitEditionViewOModule,
        LitEditionViewRdModule,
        LitBookViewRdModule,

    ],
    exports: [
        DEditionFtrComponent,

        LitEditionViewRdModule,
        LitBookViewRdModule,

    ],
    entryComponents: [
    ]
})
export class DEditionFtrModule { }




import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { RPublisherFtrComponent } from './ftr/r-publisher.ftr.component';
import { RPublisherFtrRoutingModule } from './r-publisher.ftr.routing.module';
import { LitPublisherViewLModule } from './../../components/lit-publisher-view/lit-publisher-view-l.module';
import { LitPublisherViewRModule } from './../../components/lit-publisher-view/lit-publisher-view-r.module';
import { LitBookViewRModule } from './../../components/lit-book-view/lit-book-view-r.module';

//
// Hint: 
// add the following line
// { path: 'rpublisher', loadChildren: () => import('./features/r-publisher/r-publisher.ftr.module').then(m => m.RPublisherFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/rpublisher']" routerLinkActive="active">Title for RPublisher </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        RPublisherFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        RPublisherFtrRoutingModule,
        LitPublisherViewLModule,
        LitPublisherViewRModule,
        LitBookViewRModule,

    ],
    exports: [
        RPublisherFtrComponent,

        LitPublisherViewRModule,
        LitBookViewRModule,

    ],
    entryComponents: [
    ]
})
export class RPublisherFtrModule { }



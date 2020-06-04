
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { DPublisherFtrComponent } from './ftr/d-publisher.ftr.component';
import { DPublisherFtrRoutingModule } from './d-publisher.ftr.routing.module';
import { LitPublisherViewLModule } from './../../components/lit-publisher-view/lit-publisher-view-l.module';
import { LitPublisherViewOModule } from './../../components/lit-publisher-view/lit-publisher-view-o.module';
import { LitPublisherViewRdModule } from './../../components/lit-publisher-view/lit-publisher-view-rd.module';
import { LitBookViewRdModule } from './../../components/lit-book-view/lit-book-view-rd.module';

//
// Hint: 
// add the following line
// { path: 'dpublisher', loadChildren: () => import('./features/d-publisher/d-publisher.ftr.module').then(m => m.DPublisherFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/dpublisher']" routerLinkActive="active">Title for DPublisher </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        DPublisherFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        DPublisherFtrRoutingModule,
        LitPublisherViewLModule,
        LitPublisherViewOModule,
        LitPublisherViewRdModule,
        LitBookViewRdModule,

    ],
    exports: [
        DPublisherFtrComponent,

        LitPublisherViewRdModule,
        LitBookViewRdModule,

    ],
    entryComponents: [
    ]
})
export class DPublisherFtrModule { }



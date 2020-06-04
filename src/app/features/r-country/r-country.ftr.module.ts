
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { RCountryFtrComponent } from './ftr/r-country.ftr.component';
import { RCountryFtrRoutingModule } from './r-country.ftr.routing.module';
import { LitCountryViewLModule } from './../../components/lit-country-view/lit-country-view-l.module';
import { LitCountryViewRModule } from './../../components/lit-country-view/lit-country-view-r.module';
import { LitDialectViewRModule } from './../../components/lit-dialect-view/lit-dialect-view-r.module';
import { LitAuthorViewRModule } from './../../components/lit-author-view/lit-author-view-r.module';
import { LitPublisherViewRModule } from './../../components/lit-publisher-view/lit-publisher-view-r.module';
import { LitManuscriptViewRModule } from './../../components/lit-manuscript-view/lit-manuscript-view-r.module';
import { LitBookViewRModule } from './../../components/lit-book-view/lit-book-view-r.module';

//
// Hint: 
// add the following line
// { path: 'rcountry', loadChildren: () => import('./features/r-country/r-country.ftr.module').then(m => m.RCountryFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/rcountry']" routerLinkActive="active">Title for RCountry </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        RCountryFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        RCountryFtrRoutingModule,
        LitCountryViewLModule,
        LitCountryViewRModule,
        LitDialectViewRModule,
        LitAuthorViewRModule,
        LitPublisherViewRModule,
        LitManuscriptViewRModule,
        LitBookViewRModule,

    ],
    exports: [
        RCountryFtrComponent,

        LitCountryViewRModule,
        LitDialectViewRModule,
        LitAuthorViewRModule,
        LitPublisherViewRModule,
        LitManuscriptViewRModule,
        LitBookViewRModule,

    ],
    entryComponents: [
    ]
})
export class RCountryFtrModule { }



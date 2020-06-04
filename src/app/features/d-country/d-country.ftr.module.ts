
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { DCountryFtrComponent } from './ftr/d-country.ftr.component';
import { DCountryFtrRoutingModule } from './d-country.ftr.routing.module';
import { LitCountryViewLModule } from './../../components/lit-country-view/lit-country-view-l.module';
import { LitCountryViewOModule } from './../../components/lit-country-view/lit-country-view-o.module';
import { LitCountryViewRdModule } from './../../components/lit-country-view/lit-country-view-rd.module';
import { LitDialectViewRdModule } from './../../components/lit-dialect-view/lit-dialect-view-rd.module';
import { LitAuthorViewRdModule } from './../../components/lit-author-view/lit-author-view-rd.module';
import { LitPublisherViewRdModule } from './../../components/lit-publisher-view/lit-publisher-view-rd.module';
import { LitManuscriptViewRdModule } from './../../components/lit-manuscript-view/lit-manuscript-view-rd.module';
import { LitBookViewRdModule } from './../../components/lit-book-view/lit-book-view-rd.module';

//
// Hint: 
// add the following line
// { path: 'dcountry', loadChildren: () => import('./features/d-country/d-country.ftr.module').then(m => m.DCountryFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/dcountry']" routerLinkActive="active">Title for DCountry </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        DCountryFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        DCountryFtrRoutingModule,
        LitCountryViewLModule,
        LitCountryViewOModule,
        LitCountryViewRdModule,
        LitDialectViewRdModule,
        LitAuthorViewRdModule,
        LitPublisherViewRdModule,
        LitManuscriptViewRdModule,
        LitBookViewRdModule,

    ],
    exports: [
        DCountryFtrComponent,

        LitCountryViewRdModule,
        LitDialectViewRdModule,
        LitAuthorViewRdModule,
        LitPublisherViewRdModule,
        LitManuscriptViewRdModule,
        LitBookViewRdModule,

    ],
    entryComponents: [
    ]
})
export class DCountryFtrModule { }




import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { DLanguageFtrComponent } from './ftr/d-language.ftr.component';
import { DLanguageFtrRoutingModule } from './d-language.ftr.routing.module';
import { LitLanguageViewLModule } from './../../components/lit-language-view/lit-language-view-l.module';
import { LitLanguageViewOModule } from './../../components/lit-language-view/lit-language-view-o.module';
import { LitLanguageViewRdModule } from './../../components/lit-language-view/lit-language-view-rd.module';
import { LitDialectViewRdModule } from './../../components/lit-dialect-view/lit-dialect-view-rd.module';
import { LitManuscriptViewRdModule } from './../../components/lit-manuscript-view/lit-manuscript-view-rd.module';
import { LitBookViewRdModule } from './../../components/lit-book-view/lit-book-view-rd.module';

//
// Hint: 
// add the following line
// { path: 'dlanguage', loadChildren: () => import('./features/d-language/d-language.ftr.module').then(m => m.DLanguageFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/dlanguage']" routerLinkActive="active">Title for DLanguage </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        DLanguageFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        DLanguageFtrRoutingModule,
        LitLanguageViewLModule,
        LitLanguageViewOModule,
        LitLanguageViewRdModule,
        LitDialectViewRdModule,
        LitManuscriptViewRdModule,
        LitBookViewRdModule,

    ],
    exports: [
        DLanguageFtrComponent,

        LitLanguageViewRdModule,
        LitDialectViewRdModule,
        LitManuscriptViewRdModule,
        LitBookViewRdModule,

    ],
    entryComponents: [
    ]
})
export class DLanguageFtrModule { }



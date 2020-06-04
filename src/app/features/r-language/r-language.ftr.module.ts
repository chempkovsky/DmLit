
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { RLanguageFtrComponent } from './ftr/r-language.ftr.component';
import { RLanguageFtrRoutingModule } from './r-language.ftr.routing.module';
import { LitLanguageViewLModule } from './../../components/lit-language-view/lit-language-view-l.module';
import { LitLanguageViewRModule } from './../../components/lit-language-view/lit-language-view-r.module';
import { LitDialectViewRModule } from './../../components/lit-dialect-view/lit-dialect-view-r.module';
import { LitManuscriptViewRModule } from './../../components/lit-manuscript-view/lit-manuscript-view-r.module';
import { LitBookViewRModule } from './../../components/lit-book-view/lit-book-view-r.module';

//
// Hint: 
// add the following line
// { path: 'rlanguage', loadChildren: () => import('./features/r-language/r-language.ftr.module').then(m => m.RLanguageFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/rlanguage']" routerLinkActive="active">Title for RLanguage </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        RLanguageFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        RLanguageFtrRoutingModule,
        LitLanguageViewLModule,
        LitLanguageViewRModule,
        LitDialectViewRModule,
        LitManuscriptViewRModule,
        LitBookViewRModule,

    ],
    exports: [
        RLanguageFtrComponent,

        LitLanguageViewRModule,
        LitDialectViewRModule,
        LitManuscriptViewRModule,
        LitBookViewRModule,

    ],
    entryComponents: [
    ]
})
export class RLanguageFtrModule { }



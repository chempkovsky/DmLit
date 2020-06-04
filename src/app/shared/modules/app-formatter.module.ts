
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from './app-material.module';
import { ToBinaryPipe } from './../pipes/to-binary.pipe';
import { ToBinaryFormatterDirective } from './../directives/to-binary-formatter.directive';

@NgModule({
    declarations: [
        ToBinaryPipe,
        ToBinaryFormatterDirective,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
    ],
    exports: [
        ToBinaryPipe,
        ToBinaryFormatterDirective,
    ],
    entryComponents: [
    ],
    providers: [
        ToBinaryPipe,
    ]

})
export class AppFormatterModule { }



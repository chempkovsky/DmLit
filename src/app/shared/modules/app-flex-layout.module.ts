
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule  /////// imports
  ],
  exports:[
    FlexLayoutModule  /////// exports the same
  ]    
})
export class AppFlexLayoutModule  { }


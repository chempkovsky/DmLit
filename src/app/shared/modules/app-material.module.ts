
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';

const MatetialComponents = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,

  MatFormFieldModule,

  FormsModule,
  ReactiveFormsModule,

  MatListModule,
  MatSelectModule,
  
  MatChipsModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,

  MatPaginatorModule,
  MatTableModule,
  MatRadioModule,
  MatSortModule,
  MatMenuModule,
  MatProgressBarModule,
  MatDialogModule,
  MatSnackBarModule,

  MatAutocompleteModule,
  MatCheckboxModule,
  MatExpansionModule,
  LayoutModule,
  MatToolbarModule,
  MatSidenavModule,
  MatGridListModule,
  MatTabsModule,

];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatetialComponents
  ],
  exports:[
    MatetialComponents
  ]
})
export class AppMaterialModule  { }


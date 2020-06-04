
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ILitCountryViewDlg } from './lit-country-view-dlg.interface';
//import { LitCountryViewSdlgComponent } from './../sform/lit-country-view-sform.component';
import { ILitCountryView } from './../interfaces/lit-country-view.interface';

@Component({
  selector: 'app-lit-country-view-sdlg',
  templateUrl: './lit-country-view-sdlg.component.html',
  styleUrls: ['./lit-country-view-sdlg.component.css']
})

export class LitCountryViewSdlgComponent { 
    constructor(public dialogRef: MatDialogRef<LitCountryViewSdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitCountryViewDlg ) { }
    currentRow: ILitCountryView |null = null;
    onSelectedRow(row:  ILitCountryView | null) {
        this.currentRow = row;
    }
    onCancel() {
        this.dialogRef.close(null);
    }
    onOk() {
        if(typeof this.currentRow == 'undefined') return;
        if(this.currentRow == null) return;
        this.data.selectedItems =  [this.currentRow];
        this.dialogRef.close(this.data);
    }
}



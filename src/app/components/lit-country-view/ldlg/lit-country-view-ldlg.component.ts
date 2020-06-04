
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ILitCountryViewDlg } from './../sdlg/lit-country-view-dlg.interface';
import { LitCountryViewLformComponent } from './../lform/lit-country-view-lform.component';
import { ILitCountryView } from './../interfaces/lit-country-view.interface';

@Component({
  selector: 'app-lit-country-view-ldlg',
  templateUrl: './lit-country-view-ldlg.component.html',
  styleUrls: ['./lit-country-view-ldlg.component.css']
})
export class LitCountryViewLdlgComponent { 
    constructor(public dialogRef: MatDialogRef<LitCountryViewLdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitCountryViewDlg ) { }
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




import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ILitDialectViewDlg } from './lit-dialect-view-dlg.interface';
//import { LitDialectViewSdlgComponent } from './../sform/lit-dialect-view-sform.component';
import { ILitDialectView } from './../interfaces/lit-dialect-view.interface';

@Component({
  selector: 'app-lit-dialect-view-sdlg',
  templateUrl: './lit-dialect-view-sdlg.component.html',
  styleUrls: ['./lit-dialect-view-sdlg.component.css']
})

export class LitDialectViewSdlgComponent { 
    constructor(public dialogRef: MatDialogRef<LitDialectViewSdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitDialectViewDlg ) { }
    currentRow: ILitDialectView |null = null;
    onSelectedRow(row:  ILitDialectView | null) {
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



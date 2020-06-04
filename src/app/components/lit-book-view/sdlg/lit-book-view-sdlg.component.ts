
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ILitBookViewDlg } from './lit-book-view-dlg.interface';
//import { LitBookViewSdlgComponent } from './../sform/lit-book-view-sform.component';
import { ILitBookView } from './../interfaces/lit-book-view.interface';

@Component({
  selector: 'app-lit-book-view-sdlg',
  templateUrl: './lit-book-view-sdlg.component.html',
  styleUrls: ['./lit-book-view-sdlg.component.css']
})

export class LitBookViewSdlgComponent { 
    constructor(public dialogRef: MatDialogRef<LitBookViewSdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitBookViewDlg ) { }
    currentRow: ILitBookView |null = null;
    onSelectedRow(row:  ILitBookView | null) {
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



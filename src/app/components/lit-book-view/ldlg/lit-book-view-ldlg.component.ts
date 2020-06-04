
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ILitBookViewDlg } from './../sdlg/lit-book-view-dlg.interface';
import { LitBookViewLformComponent } from './../lform/lit-book-view-lform.component';
import { ILitBookView } from './../interfaces/lit-book-view.interface';

@Component({
  selector: 'app-lit-book-view-ldlg',
  templateUrl: './lit-book-view-ldlg.component.html',
  styleUrls: ['./lit-book-view-ldlg.component.css']
})
export class LitBookViewLdlgComponent { 
    constructor(public dialogRef: MatDialogRef<LitBookViewLdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitBookViewDlg ) { }
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



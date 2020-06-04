
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ILitAuthorViewDlg } from './lit-author-view-dlg.interface';
//import { LitAuthorViewSdlgComponent } from './../sform/lit-author-view-sform.component';
import { ILitAuthorView } from './../interfaces/lit-author-view.interface';

@Component({
  selector: 'app-lit-author-view-sdlg',
  templateUrl: './lit-author-view-sdlg.component.html',
  styleUrls: ['./lit-author-view-sdlg.component.css']
})

export class LitAuthorViewSdlgComponent { 
    constructor(public dialogRef: MatDialogRef<LitAuthorViewSdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitAuthorViewDlg ) { }
    currentRow: ILitAuthorView |null = null;
    onSelectedRow(row:  ILitAuthorView | null) {
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



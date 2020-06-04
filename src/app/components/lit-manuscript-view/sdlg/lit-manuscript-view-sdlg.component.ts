
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ILitManuscriptViewDlg } from './lit-manuscript-view-dlg.interface';
//import { LitManuscriptViewSdlgComponent } from './../sform/lit-manuscript-view-sform.component';
import { ILitManuscriptView } from './../interfaces/lit-manuscript-view.interface';

@Component({
  selector: 'app-lit-manuscript-view-sdlg',
  templateUrl: './lit-manuscript-view-sdlg.component.html',
  styleUrls: ['./lit-manuscript-view-sdlg.component.css']
})

export class LitManuscriptViewSdlgComponent { 
    constructor(public dialogRef: MatDialogRef<LitManuscriptViewSdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitManuscriptViewDlg ) { }
    currentRow: ILitManuscriptView |null = null;
    onSelectedRow(row:  ILitManuscriptView | null) {
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



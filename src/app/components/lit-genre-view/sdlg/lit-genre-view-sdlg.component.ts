
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ILitGenreViewDlg } from './lit-genre-view-dlg.interface';
//import { LitGenreViewSdlgComponent } from './../sform/lit-genre-view-sform.component';
import { ILitGenreView } from './../interfaces/lit-genre-view.interface';

@Component({
  selector: 'app-lit-genre-view-sdlg',
  templateUrl: './lit-genre-view-sdlg.component.html',
  styleUrls: ['./lit-genre-view-sdlg.component.css']
})

export class LitGenreViewSdlgComponent { 
    constructor(public dialogRef: MatDialogRef<LitGenreViewSdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitGenreViewDlg ) { }
    currentRow: ILitGenreView |null = null;
    onSelectedRow(row:  ILitGenreView | null) {
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




import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ILitGenreViewDlg } from './../sdlg/lit-genre-view-dlg.interface';
import { LitGenreViewLformComponent } from './../lform/lit-genre-view-lform.component';
import { ILitGenreView } from './../interfaces/lit-genre-view.interface';

@Component({
  selector: 'app-lit-genre-view-ldlg',
  templateUrl: './lit-genre-view-ldlg.component.html',
  styleUrls: ['./lit-genre-view-ldlg.component.css']
})
export class LitGenreViewLdlgComponent { 
    constructor(public dialogRef: MatDialogRef<LitGenreViewLdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitGenreViewDlg ) { }
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



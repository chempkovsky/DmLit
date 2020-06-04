
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ILitAuthorViewDlg } from './../sdlg/lit-author-view-dlg.interface';
import { LitAuthorViewLformComponent } from './../lform/lit-author-view-lform.component';
import { ILitAuthorView } from './../interfaces/lit-author-view.interface';

@Component({
  selector: 'app-lit-author-view-ldlg',
  templateUrl: './lit-author-view-ldlg.component.html',
  styleUrls: ['./lit-author-view-ldlg.component.css']
})
export class LitAuthorViewLdlgComponent { 
    constructor(public dialogRef: MatDialogRef<LitAuthorViewLdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitAuthorViewDlg ) { }
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



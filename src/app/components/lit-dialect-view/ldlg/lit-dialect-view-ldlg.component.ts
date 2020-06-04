
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ILitDialectViewDlg } from './../sdlg/lit-dialect-view-dlg.interface';
import { LitDialectViewLformComponent } from './../lform/lit-dialect-view-lform.component';
import { ILitDialectView } from './../interfaces/lit-dialect-view.interface';

@Component({
  selector: 'app-lit-dialect-view-ldlg',
  templateUrl: './lit-dialect-view-ldlg.component.html',
  styleUrls: ['./lit-dialect-view-ldlg.component.css']
})
export class LitDialectViewLdlgComponent { 
    constructor(public dialogRef: MatDialogRef<LitDialectViewLdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitDialectViewDlg ) { }
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



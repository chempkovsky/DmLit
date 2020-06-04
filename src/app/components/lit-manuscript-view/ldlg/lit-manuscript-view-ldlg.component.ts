
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ILitManuscriptViewDlg } from './../sdlg/lit-manuscript-view-dlg.interface';
import { LitManuscriptViewLformComponent } from './../lform/lit-manuscript-view-lform.component';
import { ILitManuscriptView } from './../interfaces/lit-manuscript-view.interface';

@Component({
  selector: 'app-lit-manuscript-view-ldlg',
  templateUrl: './lit-manuscript-view-ldlg.component.html',
  styleUrls: ['./lit-manuscript-view-ldlg.component.css']
})
export class LitManuscriptViewLdlgComponent { 
    constructor(public dialogRef: MatDialogRef<LitManuscriptViewLdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitManuscriptViewDlg ) { }
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



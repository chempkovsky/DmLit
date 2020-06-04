
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ILitEditionViewDlg } from './../sdlg/lit-edition-view-dlg.interface';
import { LitEditionViewLformComponent } from './../lform/lit-edition-view-lform.component';
import { ILitEditionView } from './../interfaces/lit-edition-view.interface';

@Component({
  selector: 'app-lit-edition-view-ldlg',
  templateUrl: './lit-edition-view-ldlg.component.html',
  styleUrls: ['./lit-edition-view-ldlg.component.css']
})
export class LitEditionViewLdlgComponent { 
    constructor(public dialogRef: MatDialogRef<LitEditionViewLdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitEditionViewDlg ) { }
    currentRow: ILitEditionView |null = null;
    onSelectedRow(row:  ILitEditionView | null) {
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



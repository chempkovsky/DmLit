
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ILitEditionViewDlg } from './lit-edition-view-dlg.interface';
//import { LitEditionViewSdlgComponent } from './../sform/lit-edition-view-sform.component';
import { ILitEditionView } from './../interfaces/lit-edition-view.interface';

@Component({
  selector: 'app-lit-edition-view-sdlg',
  templateUrl: './lit-edition-view-sdlg.component.html',
  styleUrls: ['./lit-edition-view-sdlg.component.css']
})

export class LitEditionViewSdlgComponent { 
    constructor(public dialogRef: MatDialogRef<LitEditionViewSdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitEditionViewDlg ) { }
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



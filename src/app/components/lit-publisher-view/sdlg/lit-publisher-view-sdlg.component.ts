
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ILitPublisherViewDlg } from './lit-publisher-view-dlg.interface';
//import { LitPublisherViewSdlgComponent } from './../sform/lit-publisher-view-sform.component';
import { ILitPublisherView } from './../interfaces/lit-publisher-view.interface';

@Component({
  selector: 'app-lit-publisher-view-sdlg',
  templateUrl: './lit-publisher-view-sdlg.component.html',
  styleUrls: ['./lit-publisher-view-sdlg.component.css']
})

export class LitPublisherViewSdlgComponent { 
    constructor(public dialogRef: MatDialogRef<LitPublisherViewSdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitPublisherViewDlg ) { }
    currentRow: ILitPublisherView |null = null;
    onSelectedRow(row:  ILitPublisherView | null) {
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



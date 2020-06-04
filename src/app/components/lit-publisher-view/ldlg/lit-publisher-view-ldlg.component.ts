
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ILitPublisherViewDlg } from './../sdlg/lit-publisher-view-dlg.interface';
import { LitPublisherViewLformComponent } from './../lform/lit-publisher-view-lform.component';
import { ILitPublisherView } from './../interfaces/lit-publisher-view.interface';

@Component({
  selector: 'app-lit-publisher-view-ldlg',
  templateUrl: './lit-publisher-view-ldlg.component.html',
  styleUrls: ['./lit-publisher-view-ldlg.component.css']
})
export class LitPublisherViewLdlgComponent { 
    constructor(public dialogRef: MatDialogRef<LitPublisherViewLdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitPublisherViewDlg ) { }
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



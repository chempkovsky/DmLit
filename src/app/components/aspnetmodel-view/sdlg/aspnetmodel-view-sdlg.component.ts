
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IaspnetmodelViewDlg } from './aspnetmodel-view-dlg.interface';
//import { AspnetmodelViewSdlgComponent } from './../sform/aspnetmodel-view-sform.component';
import { IaspnetmodelView } from './../interfaces/aspnetmodel-view.interface';

@Component({
  selector: 'app-aspnetmodel-view-sdlg',
  templateUrl: './aspnetmodel-view-sdlg.component.html',
  styleUrls: ['./aspnetmodel-view-sdlg.component.css']
})

export class AspnetmodelViewSdlgComponent { 
    constructor(public dialogRef: MatDialogRef<AspnetmodelViewSdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: IaspnetmodelViewDlg ) { }
    currentRow: IaspnetmodelView |null = null;
    onSelectedRow(row:  IaspnetmodelView | null) {
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



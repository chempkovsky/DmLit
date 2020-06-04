
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IaspnetmodelViewDlg } from './../sdlg/aspnetmodel-view-dlg.interface';
import { AspnetmodelViewLformComponent } from './../lform/aspnetmodel-view-lform.component';
import { IaspnetmodelView } from './../interfaces/aspnetmodel-view.interface';

@Component({
  selector: 'app-aspnetmodel-view-ldlg',
  templateUrl: './aspnetmodel-view-ldlg.component.html',
  styleUrls: ['./aspnetmodel-view-ldlg.component.css']
})
export class AspnetmodelViewLdlgComponent { 
    constructor(public dialogRef: MatDialogRef<AspnetmodelViewLdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: IaspnetmodelViewDlg ) { }
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



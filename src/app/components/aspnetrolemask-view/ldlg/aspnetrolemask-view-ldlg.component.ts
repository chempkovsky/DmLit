
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IaspnetrolemaskViewDlg } from './../sdlg/aspnetrolemask-view-dlg.interface';
import { AspnetrolemaskViewLformComponent } from './../lform/aspnetrolemask-view-lform.component';
import { IaspnetrolemaskView } from './../interfaces/aspnetrolemask-view.interface';

@Component({
  selector: 'app-aspnetrolemask-view-ldlg',
  templateUrl: './aspnetrolemask-view-ldlg.component.html',
  styleUrls: ['./aspnetrolemask-view-ldlg.component.css']
})
export class AspnetrolemaskViewLdlgComponent { 
    constructor(public dialogRef: MatDialogRef<AspnetrolemaskViewLdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: IaspnetrolemaskViewDlg ) { }
    currentRow: IaspnetrolemaskView |null = null;
    onSelectedRow(row:  IaspnetrolemaskView | null) {
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



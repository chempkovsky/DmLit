
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IaspnetuserrolesViewDlg } from './../sdlg/aspnetuserroles-view-dlg.interface';
import { AspnetuserrolesViewLformComponent } from './../lform/aspnetuserroles-view-lform.component';
import { IaspnetuserrolesView } from './../interfaces/aspnetuserroles-view.interface';

@Component({
  selector: 'app-aspnetuserroles-view-ldlg',
  templateUrl: './aspnetuserroles-view-ldlg.component.html',
  styleUrls: ['./aspnetuserroles-view-ldlg.component.css']
})
export class AspnetuserrolesViewLdlgComponent { 
    constructor(public dialogRef: MatDialogRef<AspnetuserrolesViewLdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: IaspnetuserrolesViewDlg ) { }
    currentRow: IaspnetuserrolesView |null = null;
    onSelectedRow(row:  IaspnetuserrolesView | null) {
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




import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IaspnetroleViewDlg } from './../sdlg/aspnetrole-view-dlg.interface';
import { AspnetroleViewLformComponent } from './../lform/aspnetrole-view-lform.component';
import { IaspnetroleView } from './../interfaces/aspnetrole-view.interface';

@Component({
  selector: 'app-aspnetrole-view-ldlg',
  templateUrl: './aspnetrole-view-ldlg.component.html',
  styleUrls: ['./aspnetrole-view-ldlg.component.css']
})
export class AspnetroleViewLdlgComponent { 
    constructor(public dialogRef: MatDialogRef<AspnetroleViewLdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: IaspnetroleViewDlg ) { }
    currentRow: IaspnetroleView |null = null;
    onSelectedRow(row:  IaspnetroleView | null) {
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



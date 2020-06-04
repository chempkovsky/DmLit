
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IaspnetroleViewDlg } from './aspnetrole-view-dlg.interface';
//import { AspnetroleViewSdlgComponent } from './../sform/aspnetrole-view-sform.component';
import { IaspnetroleView } from './../interfaces/aspnetrole-view.interface';

@Component({
  selector: 'app-aspnetrole-view-sdlg',
  templateUrl: './aspnetrole-view-sdlg.component.html',
  styleUrls: ['./aspnetrole-view-sdlg.component.css']
})

export class AspnetroleViewSdlgComponent { 
    constructor(public dialogRef: MatDialogRef<AspnetroleViewSdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: IaspnetroleViewDlg ) { }
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




import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IaspnetuserViewDlg } from './aspnetuser-view-dlg.interface';
//import { AspnetuserViewSdlgComponent } from './../sform/aspnetuser-view-sform.component';
import { IaspnetuserView } from './../interfaces/aspnetuser-view.interface';

@Component({
  selector: 'app-aspnetuser-view-sdlg',
  templateUrl: './aspnetuser-view-sdlg.component.html',
  styleUrls: ['./aspnetuser-view-sdlg.component.css']
})

export class AspnetuserViewSdlgComponent { 
    constructor(public dialogRef: MatDialogRef<AspnetuserViewSdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: IaspnetuserViewDlg ) { }
    currentRow: IaspnetuserView |null = null;
    onSelectedRow(row:  IaspnetuserView | null) {
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



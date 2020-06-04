
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IaspnetdashboardViewDlg } from './aspnetdashboard-view-dlg.interface';
//import { AspnetdashboardViewSdlgComponent } from './../sform/aspnetdashboard-view-sform.component';
import { IaspnetdashboardView } from './../interfaces/aspnetdashboard-view.interface';

@Component({
  selector: 'app-aspnetdashboard-view-sdlg',
  templateUrl: './aspnetdashboard-view-sdlg.component.html',
  styleUrls: ['./aspnetdashboard-view-sdlg.component.css']
})

export class AspnetdashboardViewSdlgComponent { 
    constructor(public dialogRef: MatDialogRef<AspnetdashboardViewSdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: IaspnetdashboardViewDlg ) { }
    currentRow: IaspnetdashboardView |null = null;
    onSelectedRow(row:  IaspnetdashboardView | null) {
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



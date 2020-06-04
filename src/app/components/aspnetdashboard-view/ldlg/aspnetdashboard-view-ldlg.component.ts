
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IaspnetdashboardViewDlg } from './../sdlg/aspnetdashboard-view-dlg.interface';
import { AspnetdashboardViewLformComponent } from './../lform/aspnetdashboard-view-lform.component';
import { IaspnetdashboardView } from './../interfaces/aspnetdashboard-view.interface';

@Component({
  selector: 'app-aspnetdashboard-view-ldlg',
  templateUrl: './aspnetdashboard-view-ldlg.component.html',
  styleUrls: ['./aspnetdashboard-view-ldlg.component.css']
})
export class AspnetdashboardViewLdlgComponent { 
    constructor(public dialogRef: MatDialogRef<AspnetdashboardViewLdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: IaspnetdashboardViewDlg ) { }
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



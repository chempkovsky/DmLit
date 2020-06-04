
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IaspnetdashboardViewEdlg } from './aspnetdashboard-view-edlg.interface';
import { AspnetdashboardViewEformComponent } from './../eform/aspnetdashboard-view-eform.component';
import { IaspnetdashboardView } from './../interfaces/aspnetdashboard-view.interface';

@Component({
  selector: 'app-aspnetdashboard-view-edlg',
  templateUrl: './aspnetdashboard-view-edlg.component.html',
  styleUrls: ['./aspnetdashboard-view-edlg.component.css']
})
export class AspnetdashboardViewEdlgComponent  {
    @ViewChild(AspnetdashboardViewEformComponent) childForm: AspnetdashboardViewEformComponent;
    constructor(public dialogRef: MatDialogRef<AspnetdashboardViewEdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: IaspnetdashboardViewEdlg ) { }
    onAfterSubmit(newVal: IaspnetdashboardView) {
        this.data.eformNewControlModel = newVal; 
        this.dialogRef.close(this.data);
    }
    onCancel() {
        this.dialogRef.close(null);
    }
    onOk() {
        if (typeof this.childForm === 'undefined') return;
        if (this.childForm === null) return;
        this.childForm.doSubmit();
    }
}


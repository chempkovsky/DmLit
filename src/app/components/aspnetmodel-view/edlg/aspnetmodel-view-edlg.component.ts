
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IaspnetmodelViewEdlg } from './aspnetmodel-view-edlg.interface';
import { AspnetmodelViewEformComponent } from './../eform/aspnetmodel-view-eform.component';
import { IaspnetmodelView } from './../interfaces/aspnetmodel-view.interface';

@Component({
  selector: 'app-aspnetmodel-view-edlg',
  templateUrl: './aspnetmodel-view-edlg.component.html',
  styleUrls: ['./aspnetmodel-view-edlg.component.css']
})
export class AspnetmodelViewEdlgComponent  {
    @ViewChild(AspnetmodelViewEformComponent) childForm: AspnetmodelViewEformComponent;
    constructor(public dialogRef: MatDialogRef<AspnetmodelViewEdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: IaspnetmodelViewEdlg ) { }
    onAfterSubmit(newVal: IaspnetmodelView) {
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


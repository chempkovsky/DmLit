
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IaspnetrolemaskViewEdlg } from './aspnetrolemask-view-edlg.interface';
import { AspnetrolemaskViewEformComponent } from './../eform/aspnetrolemask-view-eform.component';
import { IaspnetrolemaskView } from './../interfaces/aspnetrolemask-view.interface';

@Component({
  selector: 'app-aspnetrolemask-view-edlg',
  templateUrl: './aspnetrolemask-view-edlg.component.html',
  styleUrls: ['./aspnetrolemask-view-edlg.component.css']
})
export class AspnetrolemaskViewEdlgComponent  {
    @ViewChild(AspnetrolemaskViewEformComponent) childForm: AspnetrolemaskViewEformComponent;
    constructor(public dialogRef: MatDialogRef<AspnetrolemaskViewEdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: IaspnetrolemaskViewEdlg ) { }
    onAfterSubmit(newVal: IaspnetrolemaskView) {
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


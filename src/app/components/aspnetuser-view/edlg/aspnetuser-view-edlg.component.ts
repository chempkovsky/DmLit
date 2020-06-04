
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IaspnetuserViewEdlg } from './aspnetuser-view-edlg.interface';
import { AspnetuserViewEformComponent } from './../eform/aspnetuser-view-eform.component';
import { IaspnetuserView } from './../interfaces/aspnetuser-view.interface';

@Component({
  selector: 'app-aspnetuser-view-edlg',
  templateUrl: './aspnetuser-view-edlg.component.html',
  styleUrls: ['./aspnetuser-view-edlg.component.css']
})
export class AspnetuserViewEdlgComponent  {
    @ViewChild(AspnetuserViewEformComponent) childForm: AspnetuserViewEformComponent;
    constructor(public dialogRef: MatDialogRef<AspnetuserViewEdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: IaspnetuserViewEdlg ) { }
    onAfterSubmit(newVal: IaspnetuserView) {
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


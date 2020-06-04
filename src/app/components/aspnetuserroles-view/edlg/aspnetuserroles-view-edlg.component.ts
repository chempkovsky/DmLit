
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IaspnetuserrolesViewEdlg } from './aspnetuserroles-view-edlg.interface';
import { AspnetuserrolesViewEformComponent } from './../eform/aspnetuserroles-view-eform.component';
import { IaspnetuserrolesView } from './../interfaces/aspnetuserroles-view.interface';

@Component({
  selector: 'app-aspnetuserroles-view-edlg',
  templateUrl: './aspnetuserroles-view-edlg.component.html',
  styleUrls: ['./aspnetuserroles-view-edlg.component.css']
})
export class AspnetuserrolesViewEdlgComponent  {
    @ViewChild(AspnetuserrolesViewEformComponent) childForm: AspnetuserrolesViewEformComponent;
    constructor(public dialogRef: MatDialogRef<AspnetuserrolesViewEdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: IaspnetuserrolesViewEdlg ) { }
    onAfterSubmit(newVal: IaspnetuserrolesView) {
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


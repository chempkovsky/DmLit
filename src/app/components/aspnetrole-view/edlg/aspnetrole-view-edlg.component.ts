
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IaspnetroleViewEdlg } from './aspnetrole-view-edlg.interface';
import { AspnetroleViewEformComponent } from './../eform/aspnetrole-view-eform.component';
import { IaspnetroleView } from './../interfaces/aspnetrole-view.interface';

@Component({
  selector: 'app-aspnetrole-view-edlg',
  templateUrl: './aspnetrole-view-edlg.component.html',
  styleUrls: ['./aspnetrole-view-edlg.component.css']
})
export class AspnetroleViewEdlgComponent  {
    @ViewChild(AspnetroleViewEformComponent) childForm: AspnetroleViewEformComponent;
    constructor(public dialogRef: MatDialogRef<AspnetroleViewEdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: IaspnetroleViewEdlg ) { }
    onAfterSubmit(newVal: IaspnetroleView) {
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


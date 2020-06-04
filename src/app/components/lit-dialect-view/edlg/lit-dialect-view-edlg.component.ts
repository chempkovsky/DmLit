
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ILitDialectViewEdlg } from './lit-dialect-view-edlg.interface';
import { LitDialectViewEformComponent } from './../eform/lit-dialect-view-eform.component';
import { ILitDialectView } from './../interfaces/lit-dialect-view.interface';

@Component({
  selector: 'app-lit-dialect-view-edlg',
  templateUrl: './lit-dialect-view-edlg.component.html',
  styleUrls: ['./lit-dialect-view-edlg.component.css']
})
export class LitDialectViewEdlgComponent  {
    @ViewChild(LitDialectViewEformComponent) childForm: LitDialectViewEformComponent;
    constructor(public dialogRef: MatDialogRef<LitDialectViewEdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitDialectViewEdlg ) { }
    onAfterSubmit(newVal: ILitDialectView) {
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


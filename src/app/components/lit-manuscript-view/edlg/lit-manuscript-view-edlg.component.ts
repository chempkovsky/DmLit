
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ILitManuscriptViewEdlg } from './lit-manuscript-view-edlg.interface';
import { LitManuscriptViewEformComponent } from './../eform/lit-manuscript-view-eform.component';
import { ILitManuscriptView } from './../interfaces/lit-manuscript-view.interface';

@Component({
  selector: 'app-lit-manuscript-view-edlg',
  templateUrl: './lit-manuscript-view-edlg.component.html',
  styleUrls: ['./lit-manuscript-view-edlg.component.css']
})
export class LitManuscriptViewEdlgComponent  {
    @ViewChild(LitManuscriptViewEformComponent) childForm: LitManuscriptViewEformComponent;
    constructor(public dialogRef: MatDialogRef<LitManuscriptViewEdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitManuscriptViewEdlg ) { }
    onAfterSubmit(newVal: ILitManuscriptView) {
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


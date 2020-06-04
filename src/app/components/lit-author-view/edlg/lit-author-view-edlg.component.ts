
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ILitAuthorViewEdlg } from './lit-author-view-edlg.interface';
import { LitAuthorViewEformComponent } from './../eform/lit-author-view-eform.component';
import { ILitAuthorView } from './../interfaces/lit-author-view.interface';

@Component({
  selector: 'app-lit-author-view-edlg',
  templateUrl: './lit-author-view-edlg.component.html',
  styleUrls: ['./lit-author-view-edlg.component.css']
})
export class LitAuthorViewEdlgComponent  {
    @ViewChild(LitAuthorViewEformComponent) childForm: LitAuthorViewEformComponent;
    constructor(public dialogRef: MatDialogRef<LitAuthorViewEdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitAuthorViewEdlg ) { }
    onAfterSubmit(newVal: ILitAuthorView) {
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


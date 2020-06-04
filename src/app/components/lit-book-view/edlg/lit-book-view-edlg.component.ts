
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ILitBookViewEdlg } from './lit-book-view-edlg.interface';
import { LitBookViewEformComponent } from './../eform/lit-book-view-eform.component';
import { ILitBookView } from './../interfaces/lit-book-view.interface';

@Component({
  selector: 'app-lit-book-view-edlg',
  templateUrl: './lit-book-view-edlg.component.html',
  styleUrls: ['./lit-book-view-edlg.component.css']
})
export class LitBookViewEdlgComponent  {
    @ViewChild(LitBookViewEformComponent) childForm: LitBookViewEformComponent;
    constructor(public dialogRef: MatDialogRef<LitBookViewEdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitBookViewEdlg ) { }
    onAfterSubmit(newVal: ILitBookView) {
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


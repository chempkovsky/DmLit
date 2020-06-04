
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ILitEditionViewEdlg } from './lit-edition-view-edlg.interface';
import { LitEditionViewEformComponent } from './../eform/lit-edition-view-eform.component';
import { ILitEditionView } from './../interfaces/lit-edition-view.interface';

@Component({
  selector: 'app-lit-edition-view-edlg',
  templateUrl: './lit-edition-view-edlg.component.html',
  styleUrls: ['./lit-edition-view-edlg.component.css']
})
export class LitEditionViewEdlgComponent  {
    @ViewChild(LitEditionViewEformComponent) childForm: LitEditionViewEformComponent;
    constructor(public dialogRef: MatDialogRef<LitEditionViewEdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitEditionViewEdlg ) { }
    onAfterSubmit(newVal: ILitEditionView) {
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


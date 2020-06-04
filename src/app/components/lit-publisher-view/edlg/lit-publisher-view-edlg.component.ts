
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ILitPublisherViewEdlg } from './lit-publisher-view-edlg.interface';
import { LitPublisherViewEformComponent } from './../eform/lit-publisher-view-eform.component';
import { ILitPublisherView } from './../interfaces/lit-publisher-view.interface';

@Component({
  selector: 'app-lit-publisher-view-edlg',
  templateUrl: './lit-publisher-view-edlg.component.html',
  styleUrls: ['./lit-publisher-view-edlg.component.css']
})
export class LitPublisherViewEdlgComponent  {
    @ViewChild(LitPublisherViewEformComponent) childForm: LitPublisherViewEformComponent;
    constructor(public dialogRef: MatDialogRef<LitPublisherViewEdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitPublisherViewEdlg ) { }
    onAfterSubmit(newVal: ILitPublisherView) {
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


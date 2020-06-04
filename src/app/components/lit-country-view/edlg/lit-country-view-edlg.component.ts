
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ILitCountryViewEdlg } from './lit-country-view-edlg.interface';
import { LitCountryViewEformComponent } from './../eform/lit-country-view-eform.component';
import { ILitCountryView } from './../interfaces/lit-country-view.interface';

@Component({
  selector: 'app-lit-country-view-edlg',
  templateUrl: './lit-country-view-edlg.component.html',
  styleUrls: ['./lit-country-view-edlg.component.css']
})
export class LitCountryViewEdlgComponent  {
    @ViewChild(LitCountryViewEformComponent) childForm: LitCountryViewEformComponent;
    constructor(public dialogRef: MatDialogRef<LitCountryViewEdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitCountryViewEdlg ) { }
    onAfterSubmit(newVal: ILitCountryView) {
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


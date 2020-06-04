
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ILitLanguageViewEdlg } from './lit-language-view-edlg.interface';
import { LitLanguageViewEformComponent } from './../eform/lit-language-view-eform.component';
import { ILitLanguageView } from './../interfaces/lit-language-view.interface';

@Component({
  selector: 'app-lit-language-view-edlg',
  templateUrl: './lit-language-view-edlg.component.html',
  styleUrls: ['./lit-language-view-edlg.component.css']
})
export class LitLanguageViewEdlgComponent  {
    @ViewChild(LitLanguageViewEformComponent) childForm: LitLanguageViewEformComponent;
    constructor(public dialogRef: MatDialogRef<LitLanguageViewEdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitLanguageViewEdlg ) { }
    onAfterSubmit(newVal: ILitLanguageView) {
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


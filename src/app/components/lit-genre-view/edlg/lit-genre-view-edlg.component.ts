
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ILitGenreViewEdlg } from './lit-genre-view-edlg.interface';
import { LitGenreViewEformComponent } from './../eform/lit-genre-view-eform.component';
import { ILitGenreView } from './../interfaces/lit-genre-view.interface';

@Component({
  selector: 'app-lit-genre-view-edlg',
  templateUrl: './lit-genre-view-edlg.component.html',
  styleUrls: ['./lit-genre-view-edlg.component.css']
})
export class LitGenreViewEdlgComponent  {
    @ViewChild(LitGenreViewEformComponent) childForm: LitGenreViewEformComponent;
    constructor(public dialogRef: MatDialogRef<LitGenreViewEdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitGenreViewEdlg ) { }
    onAfterSubmit(newVal: ILitGenreView) {
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


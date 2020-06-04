
import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ILitLanguageViewDlg } from './lit-language-view-dlg.interface';
//import { LitLanguageViewSdlgComponent } from './../sform/lit-language-view-sform.component';
import { ILitLanguageView } from './../interfaces/lit-language-view.interface';

@Component({
  selector: 'app-lit-language-view-sdlg',
  templateUrl: './lit-language-view-sdlg.component.html',
  styleUrls: ['./lit-language-view-sdlg.component.css']
})

export class LitLanguageViewSdlgComponent { 
    constructor(public dialogRef: MatDialogRef<LitLanguageViewSdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitLanguageViewDlg ) { }
    currentRow: ILitLanguageView |null = null;
    onSelectedRow(row:  ILitLanguageView | null) {
        this.currentRow = row;
    }
    onCancel() {
        this.dialogRef.close(null);
    }
    onOk() {
        if(typeof this.currentRow == 'undefined') return;
        if(this.currentRow == null) return;
        this.data.selectedItems =  [this.currentRow];
        this.dialogRef.close(this.data);
    }
}




import { Component,  Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ILitLanguageViewDlg } from './../sdlg/lit-language-view-dlg.interface';
import { LitLanguageViewLformComponent } from './../lform/lit-language-view-lform.component';
import { ILitLanguageView } from './../interfaces/lit-language-view.interface';

@Component({
  selector: 'app-lit-language-view-ldlg',
  templateUrl: './lit-language-view-ldlg.component.html',
  styleUrls: ['./lit-language-view-ldlg.component.css']
})
export class LitLanguageViewLdlgComponent { 
    constructor(public dialogRef: MatDialogRef<LitLanguageViewLdlgComponent>, @Inject(MAT_DIALOG_DATA) public data: ILitLanguageViewDlg ) { }
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



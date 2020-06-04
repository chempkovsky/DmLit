
import { Component,  Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IMessageDialog } from './message-dialog.interface';



@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent  {
    constructor(public dialogRef: MatDialogRef<MessageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: IMessageDialog ) { }
    onCancel() {
        this.dialogRef.close(null);
    }
    onOk() {
        this.dialogRef.close(1);
    }
}




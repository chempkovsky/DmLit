
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { IColumnSelectorItem } from './column-selector-item.interface';
import { AppGlblSettingsService } from './../../services/app-glbl-settings.service';

@Component({
  selector: 'app-column-selector',
  templateUrl: './column-selector.component.html',
  styleUrls: ['./column-selector.component.css']
})
export class ColumnSelectorComponent implements OnInit {
  
  public colums : Array<IColumnSelectorItem> = [];
  @Input('colums-to-select')
  get columsToSelect(): Array<IColumnSelectorItem> {
      return this.colums;
  }
  set columsToSelect(inp: Array<IColumnSelectorItem>) {
    if (!(typeof inp === 'undefined')) {
      if( Array.isArray(inp)) {
        this.colums = inp;
        this.cd.detectChanges();
      }
    }
  }

   constructor(protected appGlblSettings: AppGlblSettingsService, private cd: ChangeDetectorRef) { }
   ngOnInit(): void {
   } 
   onChanged(v: MatCheckboxChange) {
       let i: number = this.colums.findIndex(e => { return e.name === v.source.value; })
       if(i > -1) {
           this.colums[i].checked = v.checked;
           console.log(this.colums[i]);
       }
   }
   shwoError(s: string) {
       this.appGlblSettings.showError('Number of columns', { message: s });
   }
}



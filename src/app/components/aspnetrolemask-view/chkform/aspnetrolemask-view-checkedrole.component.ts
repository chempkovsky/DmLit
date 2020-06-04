import { Component,  Input, Output, EventEmitter, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EformMode } from './../../../shared/enums/eform-mode.enum';
import { AppGlblSettingsService } from './../../../shared/services/app-glbl-settings.service';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';
import { IaspnetrolemaskView } from './../interfaces/aspnetrolemask-view.interface';
import { AspnetrolemaskViewEformComponent } from './../eform/aspnetrolemask-view-eform.component';
import { IEventEmitterData } from './../../../shared/interfaces/event-emitter-data.interface';
import { IMenuItemData } from './../../../shared/interfaces/menu-item-data.interface';
import { IEventEmitterPub } from './../../../shared/interfaces/event-emitter-pub.interface';
import { IMessageDialog } from './../../../shared/components/message-dialog/message-dialog.interface';
import { MessageDialogComponent } from './../../../shared/components/message-dialog/message-dialog.component';


@Component({
  selector: 'app-aspnetrolemask-view-checkedrole',
  templateUrl: './aspnetrolemask-view-checkedrole.component.html',
  styleUrls: ['./aspnetrolemask-view-checkedrole.component.css']
})
export class AspnetrolemaskViewCheckedroleComponent implements IEventEmitterPub {

    @ViewChild(AspnetrolemaskViewEformComponent, {static: false}) roleEditor: AspnetrolemaskViewEformComponent;

    public eformMode: EformMode = EformMode.UpdateMode;
    @Input('filter-max-height')  filterMaxHeight: number | null = null;
    @Input('max-height') maxHeight: number | null = null;

    @Output('on-cont-menu-item-click') onContMenuItemEmitter = new EventEmitter<IEventEmitterData>();
    @Input('cont-menu-items') contMenuItems: Array<IMenuItemData> = [];
    onContMenuItemClicked(v: IEventEmitterData)  {
        this.onContMenuItemEmitter.emit(v);
    }

    @Input('can-add') canAdd: boolean = false;
    @Input('can-update') canUpdate: boolean = false;
    @Input('can-delete') canDelete: boolean = false;
    @Input('show-filter') showFilter: boolean = true;
    @Input('show-add-flt-item') showAddFltItem: boolean = true;

    @Output('selected-row') selectedRow = new EventEmitter();

    protected _hiddenFilter: Array<IWebServiceFilterRslt> = [];
    @Input('hidden-filter') 
        get hiddenFilter(): Array<IWebServiceFilterRslt> {
          return this._hiddenFilter;
        }
        set hiddenFilter(inDef: Array<IWebServiceFilterRslt>) {
          if (typeof inDef === 'undefined') {
            this._hiddenFilter = [];
          } else if(!Array.isArray(inDef)) {
            this._hiddenFilter = [];
          } else {
            this._hiddenFilter =  inDef;
          }
        } 

    public appearance: string = 'outline';
    constructor(protected appGlblSettings: AppGlblSettingsService, public dialog: MatDialog, private cd: ChangeDetectorRef) {
        this.appearance = this.appGlblSettings.appearance;
    }
    protected isModified = false;
    public eformControlModel: IaspnetrolemaskView | null = null; 
    public permissions: Array<number> = [];
    onSelectedRow(row: IaspnetrolemaskView | null) {
        if (this.isModified) {
            let locdata: IMessageDialog = {
                title: 'Data changed' ,
                message: 'Would you like to save changes?',
                iconname: 'warning',
                iconcolor: 'warn'
            }
            let dialogRef = this.dialog.open(MessageDialogComponent, {
                data: locdata,
            });
            dialogRef.afterClosed().subscribe(rslt => {
                if (!(typeof rslt === 'undefined')) {
                    if (!(rslt === null)) {
                        if (!(this.eformControlModel === null)) { 
                            this.roleEditor.doSubmit();
                        }
                    }
                }
                this.onNewRow(row);
            });
        } else {
            this.onNewRow(row);
        }
    }
    onNewRow(row: IaspnetrolemaskView | null) {
        let isNDef = true;
        if(!(typeof row === 'undefined')) {
            isNDef = (row === null);
        }
        if(isNDef) {
            this.isModified = false;
            this.eformControlModel = null;
        } else {
            this.isModified = false;
            this.eformControlModel = row;
        }
        this.selectedRow.emit(this.eformControlModel);
        if(isNDef) {
            this.permissions = [];
            return;
        }
        const mask = 'mask';
        const sfx = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D'];
        let rslt: Array<number> = [];
        sfx.forEach(e => {
            let nm = mask + e;
            if (!(typeof this.eformControlModel[nm] === 'undefined')) {
                rslt.push(this.eformControlModel[nm]);
            }
        });
        const dask = 'dask';
        const dsfx = ['0', '1', '2'];
        dsfx.forEach(e => {
            let nm = dask + e;
            if (!(typeof this.eformControlModel[nm] === 'undefined')) {
                rslt.push(this.eformControlModel[nm]);
            }
        });
        this.permissions = rslt;
    }


    outPermission(val: Array<number>) {
        if (this.eformControlModel === null) { 
            return;
        }
        if(typeof val === 'undefined') {
            return;
        }
        if(!Array.isArray(val)) {
            return;
        }
        const lng: number = val.length;
        const mask = 'mask';
        const sfx = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D'];
        let i: number = 0;
        sfx.forEach(e => {
            if(i < lng) {
                let nm = mask + e;
                this.eformControlModel[nm] = val[i];
            }
            i++;
        });
        const dask = 'dask';
        const dsfx = ['0', '1', '2'];
        dsfx.forEach(e => {
            if(i < lng) {
                let nm = dask + e;
                this.eformControlModel[nm] = val[i];
            }
            i++;
        });
        this.roleEditor.eformControlModel = this.eformControlModel;
        this.isModified = true;
    }

    saveRole: Array<IMenuItemData> =[  {id: 'saveRole', caption: 'Save Role bitmasks', iconName: 'save', iconColor: 'primary', enabled: true } ]; 
    onSaveRole(v: IEventEmitterData)  {
        this.roleEditor.doSubmit();
        this.appGlblSettings.showMsg('Saving Bit Masks of the Role');
        this.isModified = false;
    }


}


import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, UrlSegment } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AppGlblSettingsService } from './../../../shared/services/app-glbl-settings.service';
import { LitCountryViewService } from './../../../services/lit-country-view/lit-country-view.service';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';
import { LitCountryViewSformComponent } from './../sform/lit-country-view-sform.component';
import { IEventEmitterData } from './../../../shared/interfaces/event-emitter-data.interface';
import { IMenuItemData } from './../../../shared/interfaces/menu-item-data.interface';
import { IEventEmitterPub } from './../../../shared/interfaces/event-emitter-pub.interface';
import { IItemHeightData } from './../../../shared/interfaces/item-height-data.interface';
import { ILitCountryView } from './../interfaces/lit-country-view.interface';
import { ILitCountryViewEdlg } from './../edlg/lit-country-view-edlg.interface';
import { LitCountryViewEdlgComponent } from './../edlg/lit-country-view-edlg.component';
import { EformMode } from './../../../shared/enums/eform-mode.enum';



@Component({
  selector: 'app-lit-country-view-rdlist',
  templateUrl: './lit-country-view-rdlist.component.html',
  styleUrls: ['./lit-country-view-rdlist.component.css']
})
export class LitCountryViewRdlistComponent implements OnInit, IEventEmitterPub, IItemHeightData {
    @Input('caption') caption: string = 'LitCountryView';

    isPostNavApplied: boolean = false;
    isOnInitCalled: boolean = false;

    showBackBtn: boolean = false;

    @Input('filter-max-height')  filterMaxHeight: number | null = null;
    @Input('max-height') maxHeight: number | null = null;

    @Output('on-cont-menu-item-click') onContMenuItemEmitter = new EventEmitter<IEventEmitterData>();
    @Input('cont-menu-items') contMenuItems: Array<IMenuItemData> = [];
    onContMenuItemClicked(e: IEventEmitterData)  {
        this.onContMenuItemEmitter.emit(e);
    }
    @Input('show-filter') showFilter: boolean = true;
    protected _hiddenFilter: Array<IWebServiceFilterRslt> = [];
    @Input('hidden-filter') 
        get hiddenFilter(): Array<IWebServiceFilterRslt> {
            return this._hiddenFilter;
        }
        set hiddenFilter(v :Array<IWebServiceFilterRslt>) {
            if (typeof v === 'undefined') {
                this._hiddenFilter = [];
            } else if (!Array.isArray(v)) {
                this._hiddenFilter = [];
            } else {
                this._hiddenFilter =  v;
            }
            if(this.isOnInitCalled) {
                this.cd.detectChanges();
            }
        }
    rowMenuItemsData: Array<IMenuItemData> = [
         {id: 'update', caption: 'Modify Item', iconName: 'edit', iconColor: 'primary', enabled: true},
         {id: 'delete', caption: 'Delete Item', iconName: 'delete_forever', iconColor: 'warn', enabled: true}
      ];
    tableMenuItemsData: Array<IMenuItemData> = [
         {id: 'add', caption: 'Add Item', iconName: 'create', iconColor: 'primary', enabled: true},
      ];

    constructor(protected route: ActivatedRoute, protected router: Router, protected  frmRootSrv: LitCountryViewService, protected appGlblSettings: AppGlblSettingsService, public dialog: MatDialog, protected cd: ChangeDetectorRef) {
    }
    permMask: number = 0;
    ngOnInit() {
        this.permMask = this.appGlblSettings.getViewModelMask('LitCountryView');
        this.tableMenuItemsData[0].enabled = ((this.permMask & 8) === 8);
        this.isPostNavApplied = false;
        if (!(typeof this.route.snapshot.data === 'undefined')) {
            if (!(this.route.snapshot.data === null)) {
                if (!(typeof this.route.snapshot.data.showFilter === 'undefined')) {
                    this.showFilter = this.route.snapshot.data.showFilter;
                }
                if (!(typeof this.route.snapshot.data.maxHeight === 'undefined')) {
                    this.maxHeight = this.route.snapshot.data.maxHeight;
                }
                if (!(typeof this.route.snapshot.data.filterMaxHeight === 'undefined')) {
                    this.filterMaxHeight = this.route.snapshot.data.filterMaxHeight;
                }
            }
        }
        this.rowMenuItemsData[0].enabled = this.rowMenuItemsData[0].enabled && ((this.permMask & 4) === 4); // modify
        this.rowMenuItemsData[1].enabled = this.rowMenuItemsData[1].enabled && ((this.permMask & 2) === 2); // delete
        let msk: number = 0;
        msk = this.appGlblSettings.getViewModelMask('LitDialectView');
        if((msk & 1) === 1) {
            this.rowMenuItemsData.push(
             {id: '1', caption: 'Navigate to: LitDialectView : Country', iconName: 'arrow_forward', iconColor: 'primary', enabled: true, 
                data: {
                    view: 'LitDialectView',
                    nav: 'Country',
                }
             }
            );
        }
        msk = this.appGlblSettings.getViewModelMask('LitAuthorView');
        if((msk & 1) === 1) {
            this.rowMenuItemsData.push(
             {id: '2', caption: 'Navigate to: LitAuthorView : Country', iconName: 'arrow_forward', iconColor: 'primary', enabled: true, 
                data: {
                    view: 'LitAuthorView',
                    nav: 'Country',
                }
             }
            );
        }
        msk = this.appGlblSettings.getViewModelMask('LitPublisherView');
        if((msk & 1) === 1) {
            this.rowMenuItemsData.push(
             {id: '3', caption: 'Navigate to: LitPublisherView : Country', iconName: 'arrow_forward', iconColor: 'primary', enabled: true, 
                data: {
                    view: 'LitPublisherView',
                    nav: 'Country',
                }
             }
            );
        }
        this.isOnInitCalled = true;
    }
    onAdd(sender: LitCountryViewSformComponent) {
        let locdata: ILitCountryViewEdlg = {
            title: 'Add item',
            eformMode: EformMode.AddMode,
            eformControlModel: null,
            eformNewControlModel: null,
            hiddenFilter: this.hiddenFilter
        };
        let w: string = this.appGlblSettings.getDialogWidth('LitCountryView');
        let mw: string = this.appGlblSettings.getDialogMaxWidth('LitCountryView');
        let dialogRef = this.dialog.open(LitCountryViewEdlgComponent, {
              data: locdata,
              maxWidth: mw,
              width: w,
            });
        dialogRef.afterClosed().subscribe(rslt => {
            if (!(typeof rslt === 'undefined')) {
                if (!(rslt === null)) {
                    if (!( typeof rslt.eformNewControlModel === 'undefined') ) {
                        if (!( rslt.eformNewControlModel === null) ) {
                            if (!Array.isArray(sender.dataSource)) {
                                sender.dataSource = [];
                            }
                            sender.dataSource.splice(0, 0, rslt.eformNewControlModel);
                            sender.dataSource = sender.dataSource.slice(0);
                            let isNDef = true;
                            if (!(typeof sender.currentRow === 'undefined')) {
                                if (!(sender.currentRow === null)) {
                                    isNDef = false;
                                }
                            }
                            if(isNDef) {
                                sender.onSelectRow(rslt.eformNewControlModel);
                            }
                        }
                    }
                }
            }
        });
    }
    onEdit(e: ILitCountryView) {
        let locdata: ILitCountryViewEdlg = {
            title: 'Modify item',
            eformMode: EformMode.UpdateMode,
            eformControlModel: e,
            eformNewControlModel: null,
            hiddenFilter: this.hiddenFilter
        };
        let w: string = this.appGlblSettings.getDialogWidth('LitCountryView');
        let mw: string = this.appGlblSettings.getDialogMaxWidth('LitCountryView');
        let dialogRef = this.dialog.open(LitCountryViewEdlgComponent, {
              data: locdata,
              maxWidth: mw,
              width: w,
            });
        dialogRef.afterClosed().subscribe(rslt => {
            if (!(typeof rslt === 'undefined')) {
                if (!(rslt === null)) {
                    if (!((typeof rslt.eformControlModel === 'undefined') || (typeof rslt.eformNewControlModel === 'undefined'))) {
                        if (!((rslt.eformControlModel === null) || (rslt.eformNewControlModel === null))) {
                            this.frmRootSrv.src2dest(rslt.eformNewControlModel, rslt.eformControlModel);
                        }
                    }
                }
            }
        });
    }
    onDelete(e: ILitCountryView , sender: LitCountryViewSformComponent ) {
        let locdata: ILitCountryViewEdlg = {
            title: 'Delete item',
            eformMode: EformMode.DeleteMode,
            eformControlModel: e,
            eformNewControlModel: null,
            hiddenFilter: this.hiddenFilter
        };
        let w: string = this.appGlblSettings.getDialogWidth('LitCountryView');
        let mw: string = this.appGlblSettings.getDialogMaxWidth('LitCountryView');
        let dialogRef = this.dialog.open(LitCountryViewEdlgComponent, {
              data: locdata,
              maxWidth: mw,
              width: w,
            });
        dialogRef.afterClosed().subscribe(rslt => {
            if (!(typeof rslt === 'undefined')) {
                if (!(rslt === null)) {
                    if (!((typeof rslt.eformControlModel === 'undefined') || (typeof rslt.eformNewControlModel === 'undefined'))) {
                        if (!((rslt.eformControlModel === null) || (rslt.eformNewControlModel === null))) {
                            if (!Array.isArray(sender.dataSource)) {
                                sender.dataSource = [];
                            }
                            let i: number = sender.dataSource.indexOf(rslt.eformControlModel);
                            if (i > -1) {
                                if (!(sender.currentRow === null)) {
                                    if (sender.currentRow === rslt.eformControlModel) {
                                        if (i > 0) {
                                            sender.onSelectRow(sender.dataSource[i-1]);
                                        } else if (i < sender.dataSource.length-1) {
                                            sender.onSelectRow(sender.dataSource[i+1]);
                                        } else {
                                            sender.onSelectRow(null);
                                        }
                                    }
                                }
                                sender.dataSource.splice(i, 1);
                                sender.dataSource = sender.dataSource.slice(0);
                            } 
                        }
                    }
                }
            }
        });
    }
    rowCommand(v: IEventEmitterData) {
        if(v.id === 'update') {
            this.onEdit(v.value);
            return;
        } else if(v.id === 'delete') {
            this.onDelete(v.value, v.sender);
            return;
        } 
        let id = this.rowMenuItemsData.findIndex(e => { return e.id === v.id; })
        if(id < 0) return;
        let mnItm: IMenuItemData = this.rowMenuItemsData[id];
        let qp = ['./'];
        //let depth: number = 1;
        //let paramMap: ParamMap = this.route.snapshot.paramMap;
        //if(paramMap.has('depth')) {
            //depth = parseInt(paramMap.get('depth'))+1;
        //}
        //if(depth < 2) depth = 2;
        //qp.push(depth.toString());
        let paramMap: ParamMap = this.route.snapshot.paramMap;
        if(!paramMap.has('depth')) {
            qp.push('2');
        }
        let sfx = mnItm.id;
        if (!(typeof mnItm.data === 'undefined')) {
            if (!(mnItm.data === null)) {
                qp.push( mnItm.data.view );
                sfx = mnItm.data.nav
            }
        }
        qp.push(v.value.iso3);
        qp.push(v.value.iso2);
      
        qp.push(sfx);  
        this.router.navigate(qp, {relativeTo: this.route});
    }
    tableCommand(v: IEventEmitterData) {
        if(v.id === 'add') {
            this.onAdd( v.sender );
            return;
        }
        let id = this.tableMenuItemsData.findIndex(e => { return e.id === v.id; })
        if(id < 0) return;
        let mnItm: IMenuItemData = this.tableMenuItemsData[id];
        let sfx = mnItm.id;
        let qp = ['./'];
        if (!(typeof mnItm.data === 'undefined')) {
            if (!(mnItm.data === null)) {
                qp.push( mnItm.data.view );
                sfx = mnItm.data.nav
            }
        }
        qp.push(sfx);  
        this.router.navigate(qp, {relativeTo: this.route});
    }

    applyFilter(frm: LitCountryViewSformComponent) {
        if(this.isPostNavApplied) {
            return;
        }
        this.isPostNavApplied = true;
        let paramMap: ParamMap = this.route.snapshot.queryParamMap;
        if(!paramMap.has('mode')) {
            return;
        }
        let act: string = paramMap.get('mode');
        if(typeof act === 'undefined') {
            return;
        }
        if(act === null) {
            return;
        }
        if (act === 'cancel') {
            if(!paramMap.has('iso3')) {
                return;
            }
            let pkpIso3: any = paramMap.get('iso3');
            if(!paramMap.has('iso2')) {
                return;
            }
            let pkpIso2: any = paramMap.get('iso2');
            this.frmRootSrv.getone(pkpIso3, pkpIso2 )
                .subscribe(
                   (data: ILitCountryView ) => { // success path
                        if (typeof data === 'undefined') return;
                        if (data === null) return;
                        if(typeof frm.dataSource === 'undefined') return;
                        if(!Array.isArray(frm.dataSource)) return;
                        let i: number = frm.dataSource.findIndex(e => {
                            return  (e.iso3 === data.iso3) &&  (e.iso2 === data.iso2)                        });
                        if(i < 0) {
                            frm.dataSource.splice(0, 0, data);
                            frm.dataSource = frm.dataSource.slice(0);
                            let isNDef = true;
                            if (!(typeof frm.currentRow === 'undefined')) {
                                if (!(frm.currentRow === null)) {
                                    isNDef = false;
                                }
                            }
                            if(isNDef) {
                                frm.onSelectRow(data);
                            }
                        } else { 
                            frm.onSelectRow(frm.dataSource[i]); 
                        }
                   },
                   error => { // error path
                        this.appGlblSettings.showError('http', error);
                        this.onBackBtn(); // navigation is correct: onBackBtn is correct method here
                   } 
                ); // end of .subscribe
            return;
        }
    }
    onBackBtn(e?: any) {
    }
    onNavError() {
        let msg = {
            message:'Incorrect Url.'
        };
        this.appGlblSettings.showError('Navigation Error', msg)
        let url: UrlSegment[] = this.route.snapshot.url;
        let len: number = url.length;
        let shft: number = 0;
        for (var i = len-1; i > -1; i--) {
            if (!(typeof url[i].path === 'undefined')) {
                if (!(url[i].path === null)) {
                    if ('LitCountryView'.toLowerCase() === url[i].path.toLowerCase()) {
                        shft++;
                        break;
                    }
                }
            }
        }
        if (shft >= len) {
            this.router.navigate(['/']);
        } else {
            this.router.navigate(['../'.repeat(shft)], {relativeTo: this.route});
        }
    }
}



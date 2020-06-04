import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, UrlSegment } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AppGlblSettingsService } from './../../../shared/services/app-glbl-settings.service';
import { LitAuthorViewService } from './../../../services/lit-author-view/lit-author-view.service';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';
import { LitAuthorViewSformComponent } from './../sform/lit-author-view-sform.component';
import { IEventEmitterData } from './../../../shared/interfaces/event-emitter-data.interface';
import { IMenuItemData } from './../../../shared/interfaces/menu-item-data.interface';
import { IEventEmitterPub } from './../../../shared/interfaces/event-emitter-pub.interface';
import { IItemHeightData } from './../../../shared/interfaces/item-height-data.interface';
import { ILitAuthorView } from './../interfaces/lit-author-view.interface';

@Component({
  selector: 'app-lit-author-view-rlist',
  templateUrl: './lit-author-view-rlist.component.html',
  styleUrls: ['./lit-author-view-rlist.component.css']
})
export class LitAuthorViewRlistComponent implements OnInit, IEventEmitterPub, IItemHeightData {
    @Input('caption') caption: string = 'LitAuthorView';

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

    constructor(protected route: ActivatedRoute, protected router: Router, protected  frmRootSrv: LitAuthorViewService, protected appGlblSettings: AppGlblSettingsService, public dialog: MatDialog, protected cd: ChangeDetectorRef) {
    }
    permMask: number = 0;
    ngOnInit() {
        this.permMask = this.appGlblSettings.getViewModelMask('LitAuthorView');
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
        let url: UrlSegment[] = this.route.snapshot.url;
        let len: number = url.length;
        let paramMap: ParamMap = this.route.snapshot.paramMap;
        if(paramMap.has('depth')) {
            let depth: number = parseInt(paramMap.get('depth'));
            if (depth > 1) {
                if(len < 5) {
                    this.onNavError();
                    return;
                }
                let nvgNm: string = url[len-1].path;
                if(typeof nvgNm === 'undefined') {
                    this.onNavError();
                    return;
                }
                if(nvgNm === null) {
                    this.onNavError();
                    return;
                }
                this.showBackBtn = true;
                nvgNm = nvgNm.toLowerCase();
                let hf: Array<IWebServiceFilterRslt> = [];
                    if ('Country'.toLowerCase() === nvgNm) {
                        if ( (4 + 2) > len ) {
                            this.onNavError();
                            return;
                        }
                        hf.push({
                            fltrName: 'iso3CntrRef',
                            fltrDataType: 'string', 
                            fltrOperator: 'eq',
                            fltrValue: url[len - 3].path
                        });
                        hf.push({
                            fltrName: 'iso2CntrRef',
                            fltrDataType: 'string', 
                            fltrOperator: 'eq',
                            fltrValue: url[len - 2].path
                        });
                    }
                if (hf.length < 1) {
                    this.onNavError();
                    return;
                }
                this.hiddenFilter = hf;
            } // if (depth > 1)
        } // if(paramMap.has(depth))
        this.rowMenuItemsData[0].enabled = this.rowMenuItemsData[0].enabled && ((this.permMask & 4) === 4); // modify
        this.rowMenuItemsData[1].enabled = this.rowMenuItemsData[1].enabled && ((this.permMask & 2) === 2); // delete
        let msk: number = 0;
        msk = this.appGlblSettings.getViewModelMask('LitManuscriptView');
        if((msk & 1) === 1) {
            this.rowMenuItemsData.push(
             { id: '1', caption: 'Navigate to: LitManuscriptView : Author', iconName: 'arrow_forward', iconColor: 'primary', enabled: true, 
                data: {
                    view: 'LitManuscriptView',
                    nav: 'Author',
                }
             }
            );
        }
        this.isOnInitCalled = true;
    }
    rowCommand(v: IEventEmitterData) {
        let id = this.rowMenuItemsData.findIndex(e => { return e.id === v.id; })
        if(id < 0) return;
        let mnItm: IMenuItemData = this.rowMenuItemsData[id];
        let qp = ['./'];
        if  (!((v.id === 'update') || (v.id === 'delete'))) {
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
        }
        let sfx = mnItm.id;
        if (!(typeof mnItm.data === 'undefined')) {
            if (!(mnItm.data === null)) {
                qp.push( mnItm.data.view );
                sfx = mnItm.data.nav
            }
        }
        qp.push(v.value.authorId);
      
        qp.push(sfx);  
        this.router.navigate(qp, {relativeTo: this.route});
    }
    tableCommand(v: IEventEmitterData) {
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
    applyFilter(frm: LitAuthorViewSformComponent) {
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
        if (act === 'delete') {
            return;
        }
        if ((act === 'add') ||
            (act === 'update') ||
            (act === 'cancel')) {
            if(!paramMap.has('authorId')) {
                return;
            }
            let pkpAuthorId: any = paramMap.get('authorId');
            this.frmRootSrv.getone(pkpAuthorId )
                .subscribe(
                   (data: ILitAuthorView ) => { // success path
                        if (typeof data === 'undefined') return;
                        if (data === null) return;
                        if(typeof frm.dataSource === 'undefined') return;
                        if(!Array.isArray(frm.dataSource)) return;
                        let i: number = frm.dataSource.findIndex(e => {
                            return  (e.authorId === data.authorId)                        });
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
        let paramMap: ParamMap = this.route.snapshot.paramMap;
        let url: UrlSegment[] = this.route.snapshot.url;
        let len: number = url.length;
        if(paramMap.has('depth')) {
            let depth: number = parseInt(paramMap.get('depth'));
            if (depth > 1) {
                if(len < 5) {
                    this.onNavError();
                    return;
                }
                let nvgNm: string = url[len-1].path;
                if (typeof nvgNm === 'undefined') {
                    return;
                }
                if (nvgNm === null) {
                    return;
                }
                nvgNm = nvgNm.toLowerCase();
                let flt = {
                    mode: 'cancel'
                };
                    if ('Country'.toLowerCase() === nvgNm) {
                        if ( (4 + 2) > len ) {
                            this.onNavError();
                            return;
                        }
                        flt[ 'iso3'] = url[len - 3].path;
                        flt[ 'iso2'] = url[len - 2].path;
                        let shft = 4;
                        if(paramMap.keys.length === 3) {
                            shft = shft + 1;
                        }
                        this.router.navigate(['../'.repeat(shft)], {queryParams: flt, relativeTo: this.route});
                    }
            }
        }
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
                    if ('LitAuthorView'.toLowerCase() === url[i].path.toLowerCase()) {
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



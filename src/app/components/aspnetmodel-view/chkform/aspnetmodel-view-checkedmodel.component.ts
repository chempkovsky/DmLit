import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatCheckboxChange } from '@angular/material/checkbox';


import { AppGlblSettingsService } from './../../../shared/services/app-glbl-settings.service';
import { IWebServiceFilterDef } from './../../../shared/interfaces/web-service-filter-def.interface';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';
import { IEventEmitterData } from './../../../shared/interfaces/event-emitter-data.interface';
import { IMenuItemData } from './../../../shared/interfaces/menu-item-data.interface';
import { IEventEmitterPub } from './../../../shared/interfaces/event-emitter-pub.interface';
import { IItemHeightData } from './../../../shared/interfaces/item-height-data.interface';

import { IaspnetmodelView } from './../interfaces/aspnetmodel-view.interface';
import { IaspnetmodelViewPage } from './../interfaces/aspnetmodel-view-page.interface';
import { IaspnetmodelViewFilter } from './../interfaces/aspnetmodel-view-filter.interface';
import { AspnetmodelViewService } from './../../../services/aspnetmodel-view/aspnetmodel-view.service';



@Component({
  selector: 'app-aspnetmodel-view-checkedmodel',
  templateUrl: './aspnetmodel-view-checkedmodel.component.html',
  styleUrls: ['./aspnetmodel-view-checkedmodel.component.css']
})
export class AspnetmodelViewCheckedmodelComponent implements OnInit, AfterViewInit, IItemHeightData {
    isOnInitCalled: boolean = false;
    protected currentFilter: Array<IWebServiceFilterRslt> = [];
    protected currentSortColumn: string = '';
    protected currentSortdirection: string = '';
    public currentPageIndex: number = 0;
    public currentPageSize: number = 10;
    public dataSource: Array<any> = []; // Array<IaspnetmodelView> = [];
    matPaginatorLen: number = 0;
    matPaginatorPageSize: number = 10;
    matPaginatorPageSizeOptions: Array<number> = [10, 25, 50, 100];
    displayedColumns:  Array<string> = ['modelPk', 'modelName', 'modelDescription', 'addPrm', 'updPrm', 'delPrm', 'selPrm'];

    @Output('on-cont-menu-item-click') onContMenuItemEmitter = new EventEmitter<IEventEmitterData>();
    @Input('cont-menu-items') contMenuItems: Array<IMenuItemData> = [];
    onContMenuItemClicked(v: IEventEmitterData)  {
        this.onContMenuItemEmitter.emit(v);
    }

    @Input('is-disabled') isDisabled: boolean = false;
    

    @Input('show-filter') showFilter: boolean = true;
    @Input('show-add-flt-item') showAddFltItem: boolean = false;

    @Input('filter-max-height')  filterMaxHeight: number | null = null;
    public ovrflw: string | null = null;   

    public maxHeightX: number|null = null;
    protected _maxHeight: number|null = null;
    @Input('max-height')
        get maxHeight(): number {
            return this._maxHeight;
        }
        set maxHeight(inp: number) {
            if (!(typeof inp === 'undefined')) {
                if(!(inp === null)) {
                    this._maxHeight = inp;
                    this.maxHeightX = inp * this.appGlblSettings.tableHeightFactor + this.appGlblSettings.tableHeightAddition;
                    this.ovrflw = 'auto';
                    if(this.isOnInitCalled) {
                        this.cd.detectChanges();
                    }
                    return;
                }
            }
            this.maxHeightX = null;
            this._maxHeight = null;
            this.ovrflw = null;
            if(this.isOnInitCalled) {
                this.cd.detectChanges();
            }
        }


    filterDefs: Array<IWebServiceFilterDef> = [
            {fltrName: 'modelPk', fltrCaption: 'Model Id',  fltrDataType: 'int32', fltrMaxLen: null, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'modelName', fltrCaption: 'Model Name',  fltrDataType: 'string', fltrMaxLen: 50, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'modelDescription', fltrCaption: 'Model Description',  fltrDataType: 'string', fltrMaxLen: 50, fltrMin: null, fltrMax: null }
    ];
    

    protected _permissions: Array<number> = [];
    @Input('permissions') 
    get permissions(): Array<number> {
        return this._permissions;
    }
    set permissions(inVl: Array<number>) {
        if(typeof inVl === 'undefined') {
            this._permissions = [];
        } else if( Array.isArray(inVl) ) {
            this._permissions = inVl;
        } else {
            this._permissions = [];
        }
        this.onPermissions();
    }
    @Output('out-permission') outPermission = new EventEmitter<Array<number>>();

    constructor(private  frmRootSrv: AspnetmodelViewService, protected appGlblSettings: AppGlblSettingsService, private cd: ChangeDetectorRef) {
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.onFilter();
            this.isOnInitCalled = true;
        });
    }    
    onSort(srt: Sort) {
        this.currentSortColumn = srt.active;
        this.currentSortdirection = srt.direction;
        this.onFilter();
    }
    onPage(pg: PageEvent) {
        console.log('onPage');
        this.currentPageIndex = pg.pageIndex;
        this.currentPageSize = pg.pageSize;
        this.onFilter();
    }
    onApplyFilter(flt: Array<IWebServiceFilterRslt>) {
        this.currentFilter = flt; 
        this.currentPageIndex = 0;
        this.onFilter();
    }
    inQuery: boolean = false;
    onFilter() {
        let flt: IaspnetmodelViewFilter = { page: this.currentPageIndex, pagesize: this.currentPageSize };
        if (!(typeof this.currentSortColumn === 'undefined')) {
            if (!(this.currentSortColumn === null)) {
                if(!(this.currentSortColumn === '')) {
                    flt.orderby = [];
                    let asc: string = '';
                    if (!(typeof this.currentSortdirection === 'undefined')) {
                        if (!(this.currentSortdirection === null)) {
                            if(this.currentSortdirection === 'desc') {
                                asc = '-';
                            }
                        }
                    }
                    flt.orderby.push(asc + this.currentSortColumn);
                }
            }
        }
        if (Array.isArray(this.currentFilter)) {
            this.currentFilter.forEach(e => {
                let opNm =  e.fltrName + 'Oprtr';
                if(typeof flt[e.fltrName] === 'undefined') {
                    flt[e.fltrName] = [];
                    flt[opNm] = [];
                }
                flt[e.fltrName].push(e.fltrValue);
                flt[opNm].push(e.fltrOperator);
            });
        }
        this.inQuery = true;
        this.frmRootSrv.getwithfilter(flt)
            .subscribe((v: IaspnetmodelViewPage) =>{
                this.inQuery = false;
                let pl: number = 0;
                if (!(typeof v.total === 'undefined')) {
                    if(!(v.total === null)) {
                        pl = v.total;
                    }
                }
                this.matPaginatorLen = pl;
                let rslt = [];
                if (!(typeof v.items === 'undefined')) {
                    if(!(v.items === null)) {
                        rslt = v.items;
                    }
                }
                if(Array.isArray(rslt)) {
                    if(rslt.length > 0) {
                        let lng: number = this._permissions.length;
                        rslt.forEach(e => {
                            let rid: number = Math.floor(e.modelPk/7);
                            if(rid < lng) {
                                let sft: number = (e.modelPk - rid * 7) * 4;
                                let rslt = (this._permissions[rid]) >> sft;
                                e['selPrm'] = (rslt & 1) === 1;
                                e['delPrm'] = (rslt & 2) === 2;
                                e['updPrm'] = (rslt & 4) === 4;
                                e['addPrm'] = (rslt & 8) === 8;
                            } else {
                                e['selPrm'] = false;
                                e['delPrm'] = false;
                                e['updPrm'] = false;
                                e['addPrm'] = false;
                            }
                        });
                    }
                    this.dataSource = rslt;
                }
                this.cd.detectChanges();
            },
            error => {
                this.inQuery = false;
                this.appGlblSettings.showError('http', error)
            });
    }
    onPermissions() {
        let lng: number = this._permissions.length;
        this.dataSource.forEach(e => {
            let rid: number = Math.floor(e.modelPk/7);
            if(rid < lng) {
                let sft: number = (e.modelPk - rid * 7) * 4;
                let rslt = (this._permissions[rid]) >> sft;
                e.selPrm = (rslt & 1) === 1;
                e.delPrm = (rslt & 2) === 2;
                e.updPrm = (rslt & 4) === 4;
                e.addPrm = (rslt & 8) === 8;
            } else {
                e.selPrm = false;
                e.delPrm = false;
                e.updPrm = false;
                e.addPrm = false;
            }
        });
        this.dataSource = this.dataSource.slice(0);
    }

    onChecked(v: MatCheckboxChange, modelPk: number, val: number) {
        let lng: number = this._permissions.length;
        let rid: number = Math.floor(modelPk/7);
        if(rid < lng) {
            let sft: number = (modelPk - rid * 7) * 4;
            if(v.checked) {
                this._permissions[rid] = this._permissions[rid] | (val << sft)
            } else {
                this._permissions[rid] = ~((~(this._permissions[rid])) | (val << sft));
            }
            this.outPermission.emit(this._permissions);
        } else {
            v.source.checked = false;
        }
    }
}



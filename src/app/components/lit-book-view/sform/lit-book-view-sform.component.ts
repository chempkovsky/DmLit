import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { AppGlblSettingsService } from './../../../shared/services/app-glbl-settings.service';
import { IWebServiceFilterDef } from './../../../shared/interfaces/web-service-filter-def.interface';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';
import { IEventEmitterData } from './../../../shared/interfaces/event-emitter-data.interface';
import { IMenuItemData } from './../../../shared/interfaces/menu-item-data.interface';
import { IEventEmitterPub } from './../../../shared/interfaces/event-emitter-pub.interface';
import { IItemHeightData } from './../../../shared/interfaces/item-height-data.interface';
import { IColumnSelectorItem } from './../../../shared/components/column-selector/column-selector-item.interface';
import { ColumnSelectorDlgComponent } from './../../../shared/components/column-selector-dlg/column-selector-dlg.component';


import { ILitBookView } from './../interfaces/lit-book-view.interface';
import { ILitBookViewPage } from './../interfaces/lit-book-view-page.interface';
import { ILitBookViewFilter } from './../interfaces/lit-book-view-filter.interface';
import { LitBookViewService } from './../../../services/lit-book-view/lit-book-view.service';



@Component({
  selector: 'app-lit-book-view-sform',
  templateUrl: './lit-book-view-sform.component.html',
  styleUrls: ['./lit-book-view-sform.component.css']
})
export class LitBookViewSformComponent implements OnInit, AfterViewInit, IEventEmitterPub, IItemHeightData {

    isOnInitCalled: boolean = false;
    protected currentFilter: Array<IWebServiceFilterRslt> = [];
    protected currentSortColumn: string = '';
    protected currentSortdirection: string = '';
    public currentPageIndex: number = 0;
    public currentPageSize: number = 10;
    public dataSource: Array<ILitBookView> = [];
    matPaginatorLen: number = 0;
    matPaginatorPageSize: number = 10;
    matPaginatorPageSizeOptions: Array<number> = [10, 25, 50, 100];
    displayedColumns:  Array<string> = ['selectAction', 'bookId', 'bookTitle', 'publicationDate', 'price', 'eEditionName', 'menuAction'];
    @Input('caption') caption: string = 'LitBookView';
    @Input('show-filter') showFilter: boolean = true;
    @Input('row-commands')  rowCommands:Array<IMenuItemData>;
    @Input('table-commands')  tableCommands:Array<IMenuItemData>;
    @Input('show-add-flt-item') showAddFltItem: boolean = true;

    @Input('show-back-btn') showBackBtn: boolean = false;
    @Output('on-back-btn') onBackBtn = new EventEmitter<any>();
    onBackBtnMd(v: any) {
        this.onBackBtn.emit(v);
    }


    @Output('on-cont-menu-item-click') onContMenuItemEmitter = new EventEmitter<IEventEmitterData>();
    @Input('cont-menu-items') contMenuItems: Array<IMenuItemData> = [];
    onContMenuItemClicked(v: IEventEmitterData)  {
        this.onContMenuItemEmitter.emit(v);
    }

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


    @Output('on-row-command') onRowCommand: EventEmitter<IEventEmitterData> = new EventEmitter<IEventEmitterData>();
    @Output('on-table-command') onTableCommand: EventEmitter<IEventEmitterData> = new EventEmitter<IEventEmitterData>();

    filterDefs: Array<IWebServiceFilterDef> = [
            {fltrName: 'bookId', fltrCaption: 'Id of the Book',  fltrDataType: 'int32', fltrMaxLen: null, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'bookTitle', fltrCaption: 'Title of the Literary Book',  fltrDataType: 'string', fltrMaxLen: 55, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'publicationDate', fltrCaption: 'Publication Date',  fltrDataType: 'datetime', fltrMaxLen: null, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'price', fltrCaption: 'Book Price',  fltrDataType: 'double', fltrMaxLen: null, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'pPublisherName', fltrCaption: 'Publisher Name',  fltrDataType: 'string', fltrMaxLen: 40, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'pCCountryName', fltrCaption: 'Publisher Country',  fltrDataType: 'string', fltrMaxLen: 40, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'mManuscriptTitle', fltrCaption: 'Manuscript Name',  fltrDataType: 'string', fltrMaxLen: 60, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'mCompletionDate', fltrCaption: 'Completion Date',  fltrDataType: 'datetime', fltrMaxLen: null, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'mAFirstName', fltrCaption: 'First Name',  fltrDataType: 'string', fltrMaxLen: 16, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'mALastName', fltrCaption: 'Last Name',  fltrDataType: 'string', fltrMaxLen: 30, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'mABirthDate', fltrCaption: 'Birth Date',  fltrDataType: 'datetime', fltrMaxLen: null, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'mACCountryName', fltrCaption: 'Birth Country',  fltrDataType: 'string', fltrMaxLen: 40, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'mGGenreName', fltrCaption: 'Manuscript Genre',  fltrDataType: 'string', fltrMaxLen: 20, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'mDDialectName', fltrCaption: 'Dialect Name',  fltrDataType: 'string', fltrMaxLen: 52, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'mDCCountryName', fltrCaption: 'Dialect Country',  fltrDataType: 'string', fltrMaxLen: 40, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'eEditionName', fltrCaption: 'Name of the edition',  fltrDataType: 'string', fltrMaxLen: 40, fltrMin: null, fltrMax: null }
        ];
    

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
          this.currentFilter = this.hiddenFilter;
          this.currentPageIndex = 0;
          this.onHiddenFilter();
          if(this.isOnInitCalled) {
            this.onFilter();
          }
        } 

    public currentRow: ILitBookView | null = null;
    @Output('selected-row') selectedRow: EventEmitter<ILitBookView> = new EventEmitter<ILitBookView>();
    @Output('apply-filter') applyFilter: EventEmitter<LitBookViewSformComponent> = new EventEmitter<LitBookViewSformComponent>();


    constructor(private  frmRootSrv: LitBookViewService, protected appGlblSettings: AppGlblSettingsService, protected dialog: MatDialog, private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

    onHiddenFilter() {
        let lcFltrDfs: Array<IWebServiceFilterDef> = [
            {fltrName: 'bookId', fltrCaption: 'Id of the Book',  fltrDataType: 'int32', fltrMaxLen: null, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'bookTitle', fltrCaption: 'Title of the Literary Book',  fltrDataType: 'string', fltrMaxLen: 55, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'publicationDate', fltrCaption: 'Publication Date',  fltrDataType: 'datetime', fltrMaxLen: null, fltrMin: null, fltrMax: null }
           ,  {fltrName: 'price', fltrCaption: 'Book Price',  fltrDataType: 'double', fltrMaxLen: null, fltrMin: null, fltrMax: null }
        ];
        let isDsbl: boolean = true;
        isDsbl = isDsbl && this.hiddenFilter.some(v => v.fltrName === 'publisherIdRef');
        if(!isDsbl) {
            lcFltrDfs.push({fltrName: 'pPublisherName', fltrCaption: 'Publisher Name',  fltrDataType: 'string', fltrMaxLen: 40, fltrMin: null, fltrMax: null });
            lcFltrDfs.push({fltrName: 'pCCountryName', fltrCaption: 'Publisher Country',  fltrDataType: 'string', fltrMaxLen: 40, fltrMin: null, fltrMax: null });

        }
        isDsbl = true;
        isDsbl = isDsbl && this.hiddenFilter.some(v => v.fltrName === 'manuscriptIdRef');
        if(!isDsbl) {
            lcFltrDfs.push({fltrName: 'mManuscriptTitle', fltrCaption: 'Manuscript Name',  fltrDataType: 'string', fltrMaxLen: 60, fltrMin: null, fltrMax: null });
            lcFltrDfs.push({fltrName: 'mCompletionDate', fltrCaption: 'Completion Date',  fltrDataType: 'datetime', fltrMaxLen: null, fltrMin: null, fltrMax: null });
            lcFltrDfs.push({fltrName: 'mAFirstName', fltrCaption: 'First Name',  fltrDataType: 'string', fltrMaxLen: 16, fltrMin: null, fltrMax: null });
            lcFltrDfs.push({fltrName: 'mALastName', fltrCaption: 'Last Name',  fltrDataType: 'string', fltrMaxLen: 30, fltrMin: null, fltrMax: null });
            lcFltrDfs.push({fltrName: 'mABirthDate', fltrCaption: 'Birth Date',  fltrDataType: 'datetime', fltrMaxLen: null, fltrMin: null, fltrMax: null });
            lcFltrDfs.push({fltrName: 'mACCountryName', fltrCaption: 'Birth Country',  fltrDataType: 'string', fltrMaxLen: 40, fltrMin: null, fltrMax: null });
            lcFltrDfs.push({fltrName: 'mGGenreName', fltrCaption: 'Manuscript Genre',  fltrDataType: 'string', fltrMaxLen: 20, fltrMin: null, fltrMax: null });
            lcFltrDfs.push({fltrName: 'mDDialectName', fltrCaption: 'Dialect Name',  fltrDataType: 'string', fltrMaxLen: 52, fltrMin: null, fltrMax: null });
            lcFltrDfs.push({fltrName: 'mDCCountryName', fltrCaption: 'Dialect Country',  fltrDataType: 'string', fltrMaxLen: 40, fltrMin: null, fltrMax: null });

        }
        isDsbl = true;
        isDsbl = isDsbl && this.hiddenFilter.some(v => v.fltrName === 'editionIdRef');
        if(!isDsbl) {
            lcFltrDfs.push({fltrName: 'eEditionName', fltrCaption: 'Name of the edition',  fltrDataType: 'string', fltrMaxLen: 40, fltrMin: null, fltrMax: null });

        }
        this.filterDefs = lcFltrDfs;
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
        let flt: ILitBookViewFilter = { page: this.currentPageIndex, pagesize: this.currentPageSize };
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
            .subscribe((v: ILitBookViewPage) =>{
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
                this.dataSource = rslt;
                this.applyFilter.emit(this);
                let currow: ILitBookView | null = null;
                if(Array.isArray(this.dataSource)) {
                    if(this.dataSource.length > 0) {
                        currow = this.dataSource[0];
                    }
                }
                this.onSelectRow(currow);
                this.cd.detectChanges();
            },
            error => {
                this.inQuery = false;
                this.appGlblSettings.showError('http', error)
            });
    }

    onSelectRow(e: ILitBookView) {
        if (typeof e === 'undefined') {
            this.currentRow = null;
        } else {
            this.currentRow = e;
        }
        this.cd.detectChanges();
        this.selectedRow.emit(this.currentRow);
    }
    rowCommand(e: ILitBookView, id: string) {
        let v: IEventEmitterData = {
            id: id,
            sender: this,
            value: e
        };
        this.onRowCommand.emit(v);
    }
    tableCommand(id: string) {
        let v: IEventEmitterData = {
            id: id,
            sender: this,
            value: null
        };
        this.onTableCommand.emit(v);
    }
    onSettings() {
        let locdata: Array<IColumnSelectorItem>=[
            {
                name: 'bookId',
                caption:'Id of the Book',
                checked: false
            },
            {
                name: 'bookTitle',
                caption:'Title of the Literary Book',
                checked: false
            },
            {
                name: 'publicationDate',
                caption:'Publication Date',
                checked: false
            },
            {
                name: 'price',
                caption:'Book Price',
                checked: false
            },
            {
                name: 'eEditionName',
                caption:'Name of the edition',
                checked: false
            },
            {
                name: 'pPublisherName',
                caption:'Publisher Name',
                checked: false
            },
            {
                name: 'pCCountryName',
                caption:'Publisher Country',
                checked: false
            },
            {
                name: 'mManuscriptTitle',
                caption:'Manuscript Name',
                checked: false
            },
            {
                name: 'mCompletionDate',
                caption:'Completion Date',
                checked: false
            },
            {
                name: 'mAFirstName',
                caption:'First Name',
                checked: false
            },
            {
                name: 'mALastName',
                caption:'Last Name',
                checked: false
            },
            {
                name: 'mABirthDate',
                caption:'Birth Date',
                checked: false
            },
            {
                name: 'mACCountryName',
                caption:'Birth Country',
                checked: false
            },
            {
                name: 'mGGenreName',
                caption:'Manuscript Genre',
                checked: false
            },
            {
                name: 'mDDialectName',
                caption:'Dialect Name',
                checked: false
            },
            {
                name: 'mDCCountryName',
                caption:'Dialect Country',
                checked: false
            },
        ];
        let len: number =  this.displayedColumns.length;
        for(var i = 1; i < len-1; i++) {
            let ind=locdata.findIndex(e => { return e.name === this.displayedColumns[i]; })
            if(ind > -1) {
                locdata[ind].checked = true;
            }
        }
        let dialogRef = this.dialog.open(ColumnSelectorDlgComponent, {
              data: locdata,
              maxWidth: '100vw',
              width: '65vw',
            });
        dialogRef.afterClosed().subscribe(rslt => {
            if (!(typeof rslt === 'undefined')) {
                if (!(rslt === null)) {
                    let r: string[] = ['selectAction'];
                    rslt.forEach(e => { if (e.checked) { r.push(e.name) }});
                    r.push('menuAction');
                    this.displayedColumns = r;
                    this.cd.detectChanges();
                }
            }
        });
    } 
}



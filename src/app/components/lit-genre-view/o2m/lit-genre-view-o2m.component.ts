import { Component,  Input, Output, EventEmitter, Inject, ChangeDetectorRef } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { AppGlblSettingsService } from './../../../shared/services/app-glbl-settings.service';
import { IDetailViewSel } from './../../../shared/interfaces/detail-view-sel.interface';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';
import { ILitGenreView } from './../interfaces/lit-genre-view.interface';
import { IEventEmitterData } from './../../../shared/interfaces/event-emitter-data.interface';
import { IMenuItemData } from './../../../shared/interfaces/menu-item-data.interface';
import { IEventEmitterPub } from './../../../shared/interfaces/event-emitter-pub.interface';


import { LitManuscriptViewLformComponent } from './../../lit-manuscript-view/lform/lit-manuscript-view-lform.component';

@Component({
  selector: 'app-lit-genre-view-o2m',
  templateUrl: './lit-genre-view-o2m.component.html',
  styleUrls: ['./lit-genre-view-o2m.component.css']
})
export class LitGenreViewO2mComponent implements IEventEmitterPub {
    @Input('caption') caption: string = 'LitGenreView';

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

    @Input('can-detail-add') canDetailAdd: boolean = true;
    @Input('can-detail-update') canDetailUpdate: boolean = true;
    @Input('can-detail-delete') canDetailDelete: boolean = true;
    @Input('show-detail-filter') showDetailFilter: boolean = true;

    @Input('selected-detail-caption') selectedDetailCaption: string = 'Current Detail';

    @Output('selected-row') selectedRow = new EventEmitter();
    @Output('selected-detail-row') selectedDetailRow = new EventEmitter();

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

    public hiddenDetailFilter: Array<IWebServiceFilterRslt> | null = null;
    public detailViewName: string | null = null;
    public detailViewSelModels: Array<IDetailViewSel> | null = [];
    public appearance: string = 'outline';

    constructor(protected appGlblSettings: AppGlblSettingsService, private cd: ChangeDetectorRef) {
        this.appearance = this.appGlblSettings.appearance;
        let msk: number = 0;
            msk = this.appGlblSettings.getViewModelMask('LitManuscriptView');
            if( (msk & 1) === 1 ) {
                this.detailViewSelModels.push({
                    viewName: 'LitManuscriptView',
                    foreignKeyName: 'Genre',
                    caption: 'LitManuscriptView' + ': ' + 'Genre'
                });
            }
        if (this.detailViewSelModels.length > 0) {
            this.dtlVw = this.detailViewSelModels[0];
        }
    }
    setDetailViewName(s: string | null) {
        this.detailViewName = s;
        this.cd.detectChanges();
    }
    setHiddenDetailFilter(flt: Array<IWebServiceFilterRslt> | null) {
        this.hiddenDetailFilter = flt;
        this.cd.detectChanges();
    }
    public mstrRow: ILitGenreView | null = null; 
    onSelectedRow(row: ILitGenreView | null) {
        let isNDef = true;
        if(!(typeof row === 'undefined')) {
            isNDef = (row === null);
        }
        if(isNDef) {
            this.mstrRow = null;
        } else {
            this.mstrRow = row;
        }
        this.selectedRow.emit(this.mstrRow);
        this.defineHiddenDetailFilter();
    }
    public dtlVw: IDetailViewSel | null = null;
    onSelectionChanged(v: MatSelectChange) {
        let isNDef = true;
        if(!(typeof v === 'undefined')) {
            isNDef = (v === null);
        }
        if(!isNDef) {
            if(!(typeof v.value === 'undefined')) {
                isNDef = (v.value === null);
            } else {
                isNDef = true;
            }
        }
        if(isNDef) {
            this.dtlVw = null;
        } else {
            this.dtlVw = v.value;
        }
        this.defineHiddenDetailFilter();
    }
    defineHiddenDetailFilter() {
        let isNDef = true;
        if(!(typeof this.mstrRow === 'undefined')) {
            isNDef = (this.mstrRow === null);
        }
        if(!isNDef) {
            isNDef = (typeof this.dtlVw === 'undefined');
            isNDef = isNDef ? isNDef : (this.dtlVw === null);
        }
        if(isNDef) {
            this.setDetailViewName(null);
            this.setHiddenDetailFilter(null);
            return;
        }
        let newFlt: Array<IWebServiceFilterRslt> = [];
        switch(this.dtlVw.viewName) {
  
            case 'LitManuscriptView':
                        newFlt.push({
                            fltrName: 'genreIdRef',
                            fltrDataType: 'int32',
                            fltrOperator: 'eq',
                            fltrValue: this.mstrRow.genreId
                        });
                break;  
        }
        this.setDetailViewName(this.dtlVw.viewName); 
        this.setHiddenDetailFilter(newFlt);
    }
    onDetailSelectedRow(v: MatSelectChange) {
        let isNDef = true;
        if(!(typeof v === 'undefined')) {
            isNDef = (v === null);
        }
        if(!isNDef) {
            if(!(typeof v.value === 'undefined')) {
                isNDef = (v.value === null);
            } else {
                isNDef = true;
            }
        }
        if(isNDef) {
            this.selectedDetailRow.emit(null);
        } else {
            this.selectedDetailRow.emit(v.value);
        }
    }
}


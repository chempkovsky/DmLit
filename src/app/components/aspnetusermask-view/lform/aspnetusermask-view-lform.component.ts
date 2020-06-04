

import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { AppGlblSettingsService } from './../../../shared/services/app-glbl-settings.service';
import { IItemHeightData } from './../../../shared/interfaces/item-height-data.interface';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';
import { IaspnetusermaskViewFilter } from './../interfaces/aspnetusermask-view-filter.interface';
import { IaspnetusermaskViewPage } from './../interfaces/aspnetusermask-view-page.interface';
import { AspnetusermaskViewService } from './../../../services/aspnetusermask-view/aspnetusermask-view.service';


@Component({
  selector: 'app-aspnetusermask-view-lform',
  templateUrl: './aspnetusermask-view-lform.component.html',
  styleUrls: ['./aspnetusermask-view-lform.component.css']
})
export class AspnetusermaskViewLformComponent implements OnInit,  IItemHeightData {

    @Input('filter-max-height')  filterMaxHeight: number | null = null;
    @Input('max-height') maxHeight: number | null = null;

    isOnInitCalled: boolean = false;

    @Input('show-filter') showFilter: boolean = true;
    @Input('show-add-flt-item') showAddFltItem: boolean = true;
    @Input('is-disabled') isDisabled: boolean = true;
    public permissions: Array<number> = [];

    @Input('can-add') canAdd: boolean = false;
    @Input('can-update') canUpdate: boolean = false;
    @Input('can-delete') canDelete: boolean = false;
    
    constructor(private  frmRootSrv: AspnetusermaskViewService, protected appGlblSettings: AppGlblSettingsService, private cd: ChangeDetectorRef) {
    }
    ngOnInit(): void {
        this.onFilter();
        this.isOnInitCalled = true;
    }

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
          if(this.isOnInitCalled) {
            this.onFilter();
          }
        } 

    inQuery: boolean = false;
    onFilter() {
        this.permissions = [];
        let flt: IaspnetusermaskViewFilter = { page: 1, pagesize: 1, orderby: [] };
        if (Array.isArray(this._hiddenFilter)) {
            this._hiddenFilter.forEach(e => {
                let opNm =  e.fltrName + 'Oprtr';
                if(typeof flt[e.fltrName] === 'undefined') {
                    flt[e.fltrName] = [];
                    flt[opNm] = [];
                }
                flt[e.fltrName].push(e.fltrValue);
                flt[opNm].push(e.fltrOperator);
            });
        }
        if(typeof flt['UserId'] === 'undefined') flt['UserId'] = [];
        if(flt['UserId'] === null) flt['UserId'] = [];
        flt['UserId'].push('noname');
        if(typeof flt['userIdOprtr'] === 'undefined') flt['userIdOprtr'] = [];
        if(flt['userIdOprtr'] === null) flt['userIdOprtr'] = [];
        flt['userIdOprtr'].push('eq');
        this.inQuery = true;
        this.frmRootSrv.getwithfilter(flt)
            .subscribe((v: IaspnetusermaskViewPage) =>{
                this.inQuery = false;
                this.permissions = this.frmRootSrv.src2array(v);
                this.cd.detectChanges();
            },
            error => {
                this.inQuery = false;
                this.appGlblSettings.showError('http', error)
            });
    }

}



import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

import { IWebServiceFilter } from './../../interfaces/web-service-filter.interface';
import { IWebServiceFilterDef } from './../../interfaces/web-service-filter-def.interface';
import { IWebServiceFilterOperator } from './../../interfaces/web-service-filter-operator.interface';
import { IWebServiceFilterRslt } from './../../interfaces/web-service-filter-rslt.interface';
import { AppGlblSettingsService } from './../../services/app-glbl-settings.service';
import { IMenuItemData } from './../../interfaces/menu-item-data.interface';
import { IEventEmitterData } from './../../interfaces/event-emitter-data.interface';
import { IEventEmitterPub } from './../../interfaces/event-emitter-pub.interface';


import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-web-service-filter',
  templateUrl: './web-service-filter.component.html',
  styleUrls: ['./web-service-filter.component.css']
})
export class WebServiceFilterComponent implements OnInit, IEventEmitterPub {
    protected isOnInitCalled: boolean = false;
    public appearance: string = 'outline';
    
    @Input('caption') caption: string = '';
    @Input('show-back-btn') showBackBtn: boolean = false;
    @Output('on-back-btn') onBackBtn = new EventEmitter<any>();
    onBackBtnMd() {
        this.onBackBtn.emit(null);
    }

    public ovrflw: string | null = null;   
    public  maxHeightX: number|null = null;
    protected _maxHeight: number|null = null;
    @Input('max-height')
        get maxHeight(): number {
            return this._maxHeight;
        }
      set maxHeight(inp: number) {
        if (!(typeof inp === 'undefined')) {
          if(!(inp === null)) {
            this.maxHeightX = inp * this.appGlblSettings.filterHeightFactor + this.appGlblSettings.filterHeightAddition;
            this._maxHeight = inp;
            this.ovrflw = 'auto';
            if(this.isOnInitCalled) {
              this.cd.detectChanges();
            }
            return;
          }
        }
        this._maxHeight = null;
        this.maxHeightX = null;
        this.ovrflw = null;
        if(this.isOnInitCalled) {
            this.cd.detectChanges();
        }
      }
    @Input('show-add-flt-item') showAddFltItem: boolean = true;
    @Output('on-cont-menu-item-click') onContMenuItemEmitter = new EventEmitter<IEventEmitterData>();
    @Input('cont-menu-items') contMenuItems: Array<IMenuItemData> = [];
    onContMenuItemClicked(v: IMenuItemData)  {
        let e: IEventEmitterData = {
            id: v.id,
            sender: this,
            value: null
        }
        this.onContMenuItemEmitter.emit(e);
    }

    protected _showFilter: boolean = true;
    @Input('show-filter') 
      get showFilter(): boolean {
        return this._showFilter;
      }
      set showFilter(inshow: boolean) {
        if (!(typeof inshow === 'undefined')) {
          if(!(inshow === null)) {
            this._showFilter = inshow;
            if(this.isOnInitCalled) {
              this.onFilterDefsChanged();
            }
          }
        }
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
            this.onFilterDefsChanged();
          }
        } 

    protected _inputFilterDefs: Array<IWebServiceFilterDef> = [];

    @Input('filter-defs') 
        get inputFilterDefs(): Array<IWebServiceFilterDef> {
          return this._inputFilterDefs;
        }
        set inputFilterDefs(inDef: Array<IWebServiceFilterDef>) {
          if (typeof inDef === 'undefined') {
            this._inputFilterDefs = [];
          } else if(!Array.isArray(inDef)) {
            this._inputFilterDefs = [];
          } else {
            this._inputFilterDefs =  inDef;
          }
          if(this.isOnInitCalled) {
            this.onFilterDefsChanged();
          }
        }


    @Output('on-apply-filter') onApplyFilter = new EventEmitter();
  
    webServiceFilterDefs: Array<IWebServiceFilterDef> = [];
    webServiceOperators: Array<IWebServiceFilterOperator> = [];
    webServiceFilters: Array<IWebServiceFilter> = [];

    constructor(protected appGlblSettings: AppGlblSettingsService, private cd: ChangeDetectorRef) { 
        this.appearance = this.appGlblSettings.appearance;
    }

    ngOnInit(): void {
        this.webServiceOperators = [
            {oName: 'eq', oCaption: '=='},
            {oName: 'gt', oCaption: '>='},
            {oName: 'lt', oCaption: '=<'},
            {oName: 'ne', oCaption: '<>'},
            {oName: 'lk', oCaption: 'Like'}
        ];
        this.onFilterDefsChanged();
        this.isOnInitCalled = true;
        this.cd.detectChanges();
    }

    onFilterDefsChanged(): void {
        this.webServiceFilterDefs = [{fltrName: '', fltrCaption: '--No filter--',  fltrDataType: '', fltrMaxLen: null, fltrMin: null, fltrMax: null }];
        this.inputFilterDefs.forEach(i => {
            if(this.hiddenFilter.findIndex(h => { return (h.fltrName === i.fltrName); }) < 0) {
            this.webServiceFilterDefs.push({ fltrName: i.fltrName, fltrCaption: i.fltrCaption, fltrDataType: i.fltrDataType, fltrMaxLen: i.fltrMaxLen, fltrMin: i.fltrMin, fltrMax: i.fltrMax });
            }
        });    
        if(this.showFilter) {
            const fltDef: IWebServiceFilterDef = this.webServiceFilterDefs[0];
            const fltOp: IWebServiceFilterOperator = this.webServiceOperators[0];

            this.webServiceFilters = [
                { fltrName: new FormControl(fltDef.fltrName), fltrDataType: fltDef.fltrDataType, 
                fltrOperator: new FormControl(fltOp.oName), fltrValue: new FormControl({ value: null, disabled: true }), 
                fltrMaxLen: fltDef.fltrMaxLen, fltrMin: fltDef.fltrMin, fltrMax: fltDef.fltrMax }
            ];
        } else {
            this.webServiceFilters = [];
        }
    }

    addFilter() {
        const fltDef: IWebServiceFilterDef = this.webServiceFilterDefs[0];
        const fltOp: IWebServiceFilterOperator = this.webServiceOperators[0];

        let item: IWebServiceFilter = { fltrName: new FormControl(fltDef.fltrName), fltrDataType: fltDef.fltrDataType, fltrOperator: new FormControl(fltOp.oName), 
          fltrValue: new FormControl({ value: null, disabled: true }), fltrMaxLen: fltDef.fltrMaxLen, fltrMin: fltDef.fltrMin, fltrMax: fltDef.fltrMax };
        this.webServiceFilters.push(item);
    }

    onSelectionChanged(event: MatSelectChange, flt: IWebServiceFilter) {
        if ((typeof flt === 'undefined') || (typeof event === 'undefined')) return;
        if (typeof event.value === 'undefined')  return;
        if ((flt === null) || (event.value === null))  return;

        let itm: IWebServiceFilterDef | null = this.webServiceFilterDefs.find((e,i,a) => {
            return (e.fltrName === event.value);
        });
        if(typeof itm === 'undefined') {
            itm = this.webServiceFilterDefs[0];
        } else if (itm === null) {
            itm = this.webServiceFilterDefs[0];
        } 

        if (!(typeof itm === 'undefined')) {
            if(!(itm === null)) {
            flt.fltrDataType = itm.fltrDataType;
            flt.fltrMaxLen = itm.fltrMaxLen;
            flt.fltrMax = itm.fltrMax;
            flt.fltrMin = itm.fltrMin;
            let validators: ValidatorFn[] = []; 

            if (!(typeof itm.fltrMaxLen === 'undefined')) {
                if (!(itm.fltrMaxLen === null)) {
                validators.push(Validators.maxLength(itm.fltrMaxLen));
                }
            }
            if (!(typeof itm.fltrMax === 'undefined')) {
                if (!(itm.fltrMax === null)) {
                validators.push(Validators.max(itm.fltrMax));
                }
            }
            if (!(typeof itm.fltrMin === 'undefined')) {
                if (!(itm.fltrMin === null)) {
                validators.push(Validators.min(itm.fltrMin));
                }
            }
            flt.fltrValue.setValidators([]);
            switch(itm.fltrDataType) {
                case '':
                    flt.fltrValue.reset({ value: null, disabled: true });
                    break;
                case 'int16':
                case 'int32':
                case 'int64':
                case 'uint16':
                case 'uint32':
                case 'uint64':
                    flt.fltrValue.reset({ value: null, disabled: false });
                    validators.push(Validators.pattern(/^[-+]?\d+$/));
                    flt.fltrValue.setValidators(validators);
                    break;
                case 'double':
                case 'decimal':
                case 'single':
                    flt.fltrValue.reset({ value: null, disabled: false });
                    validators.push(Validators.pattern(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/));
                    flt.fltrValue.setValidators(validators);
                    break;
                case 'guid':
                    flt.fltrValue.reset({ value: '', disabled: false });
                    //validators.push(Validators.pattern(/(?im)^[{(]?[0-9A-F]{8}[-]?(?:[0-9A-F]{4}[-]?){3}[0-9A-F]{12}[)}]?$/));
                    flt.fltrValue.setValidators(validators);
                    break;
                case 'datetime':
                    flt.fltrValue.reset({ value: null, disabled: false });
                    flt.fltrValue.setValidators(validators);
                    break;
                default:
                    flt.fltrValue.reset({ value: '', disabled: false });
                    flt.fltrValue.setValidators(validators);
                    break;
            }
            flt.fltrValue.updateValueAndValidity(); // must be called after resetting validators

            }
        }
    }

    removeFltr(wsfdDef: IWebServiceFilter) {
        if(typeof wsfdDef === 'undefined') return;
        if (this.webServiceFilters.length < 2) return;
        const i = this.webServiceFilters.indexOf(wsfdDef);
        if (i >= 0) {
          this.webServiceFilters.splice(i, 1);
        }
    }

    removeAllFilters() {
        let i: number = this.webServiceFilters.length;
        if (i > 1) {
          this.webServiceFilters.splice(1, i-1);
        }
    }

    getErrorMessage(fc: FormControl): string {
        let rslt: string = 'Filter item will not be applied.';
        if (typeof fc === 'undefined') {
          return rslt;
        }
        if (fc === null) {
          return rslt;
        }
        const errs: ValidationErrors = fc.errors;
        Object.keys(errs).forEach(k => {
          switch(k) {
            case 'max':
              rslt +=' The value must be less than ' + errs[k].max;
              break;
            case 'min':
              rslt +=' Value must be greater than ' + errs[k].min;
              break;
            case 'pattern':
              rslt +=' Icorrect format.' ;
              break;
            case 'matDatepickerMin':
              rslt +=' Value must be greater than ' + errs[k].min;
              break;
            case 'matDatepickerMax':
              rslt +=' The value must be less than ' + errs[k].max;
              break;
            case 'matDatepickerParse':
              rslt +=' Icorrect date format.' ;
              break;
            default:
              rslt +=' Icorrect format.' ;
              break;
          }
        });
        return rslt;
    }

    onApplyFilterClicked(): void {
        let result: Array<IWebServiceFilterRslt> = [];
        this.hiddenFilter.forEach(i => {
          result.push(i);
        });
        this.webServiceFilters.forEach(i => {
          if (i.fltrValue.enabled) {
            if(i.fltrValue.valid) {
              result.push({fltrName: i.fltrName.value, fltrDataType: i.fltrDataType, fltrOperator: i.fltrOperator.value, fltrValue: i.fltrValue.value});
            }
          }
        });
        this.onApplyFilter.emit(result);
    }
}


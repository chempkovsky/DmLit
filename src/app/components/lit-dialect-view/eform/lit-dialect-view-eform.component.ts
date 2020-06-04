
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, ValidatorFn, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap,  catchError, debounceTime } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import { EformMode } from './../../../shared/enums/eform-mode.enum';
import { AppGlblSettingsService } from './../../../shared/services/app-glbl-settings.service';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';
import { IEventEmitterData } from './../../../shared/interfaces/event-emitter-data.interface';
import { IMenuItemData } from './../../../shared/interfaces/menu-item-data.interface';
import { IEventEmitterPub } from './../../../shared/interfaces/event-emitter-pub.interface';

import { ILitCountryView } from './../../lit-country-view/interfaces/lit-country-view.interface';
import { ILitCountryViewPage } from './../../lit-country-view/interfaces/lit-country-view-page.interface';
import { ILitCountryViewFilter } from './../../lit-country-view/interfaces/lit-country-view-filter.interface';
import { LitCountryViewService } from './../../../services/lit-country-view/lit-country-view.service';
import { ILitLanguageView } from './../../lit-language-view/interfaces/lit-language-view.interface';
import { ILitLanguageViewPage } from './../../lit-language-view/interfaces/lit-language-view-page.interface';
import { ILitLanguageViewFilter } from './../../lit-language-view/interfaces/lit-language-view-filter.interface';
import { LitLanguageViewService } from './../../../services/lit-language-view/lit-language-view.service';
import { ILitDialectView } from './../interfaces/lit-dialect-view.interface';
import { ILitDialectViewPage } from './../interfaces/lit-dialect-view-page.interface';
import { ILitDialectViewFilter } from './../interfaces/lit-dialect-view-filter.interface';
import { LitDialectViewService } from './../../../services/lit-dialect-view/lit-dialect-view.service';
import { LitLanguageViewSdlgComponent } from './../../lit-language-view/sdlg/lit-language-view-sdlg.component';
import { ILitLanguageViewDlg } from './../../lit-language-view/sdlg/lit-language-view-dlg.interface';

@Component({
  selector: 'app-lit-dialect-view-eform',
  templateUrl: './lit-dialect-view-eform.component.html',
  styleUrls: ['./lit-dialect-view-eform.component.css']
})
export class LitDialectViewEformComponent implements OnInit, IEventEmitterPub {
    // start: variable declaration section
    @Input('caption') caption: string = 'Add(Modify/Delete) Item';

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



    public appearance: string = 'outline';
    private ngOnInitCalled: boolean = false;
    private _eformMode: EformMode = EformMode.DeleteMode;
    public mainFormGroup: FormGroup = null;
    public cCountryNameCmbCntrl: FormControl = null;
    public cCountryNameCmbCntrlVals : Array<ILitCountryView> | null = null;
    public lLanguageNameBttnItm: ILitLanguageView | null = null;
    public lLanguageNameBttnDsnbl: boolean = true;

    // end: variable declaration section
    // start: input variable declaration section
    @Input('eform-mode')
        set eformMode(inEformMode: EformMode) {
            if (typeof inEformMode === 'undefined') {
                return;
            }
            if (this._eformMode != inEformMode) {
                this._eformMode = inEformMode;
                if (this.ngOnInitCalled) {
                    this.OnEformModeChanged();
                    this.InputToControls();
                    this.DoClearControls();
                    this.DoInit();
                }
            }
        }
        get eformMode(): EformMode {
            return this._eformMode;
        }
    protected _eformControlModel: ILitDialectView | null = null;
    @Input('eform-control-model') 
        set eformControlModel (inFormControlModel : ILitDialectView) {
            let isInputNull: boolean = true;
            if (typeof inFormControlModel !== 'undefined') {
                isInputNull = (inFormControlModel === null);
            }
            if(! isInputNull) {
                this._eformControlModel = inFormControlModel;
            } else {
                this._eformControlModel = null;
            }
            if (this.ngOnInitCalled) {
                this.InputToControls();
                this.DoClearControls();
                this.DoInit();
            }
        }
        get eformControlModel(): ILitDialectView {
            return this._eformControlModel;
        } // end of get eformControlModel
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
          if(this.ngOnInitCalled) {
            this.InputToControls();
            this.DoClearControls();
            this.DoInit();
          }
        } 

    // end: input variable declaration section

    DefCntrlByHddn(proNm: string): boolean {
        let val = this.hiddenFilter.find(v => { return v.fltrName === proNm });
        if (typeof val === 'undefined') {
            return false;
        }
        if(typeof val.fltrValue == 'undefined') {
            return false;
        }
        this.mainFormGroup.patchValue({[proNm]: val.fltrValue });
        return true;
    }
    DefCntrlByModel(proNm: string) {
        if(typeof this._eformControlModel[proNm] === 'undefined') {
            this.mainFormGroup.patchValue({[proNm]: null});
        } else {
            this.mainFormGroup.patchValue({[proNm]: this._eformControlModel[proNm]});
        }
    }

    InputToControls() {
        let isInputNull: boolean = true;
        if (typeof this._eformControlModel !== 'undefined') {
            isInputNull = (this._eformControlModel === null);
        }
        let val: any = null;
        if(! isInputNull) {
            if(!this.DefCntrlByHddn('dialectId')) { this.DefCntrlByModel('dialectId'); }
            if(!this.DefCntrlByHddn('dialectName')) { this.DefCntrlByModel('dialectName'); }
            if(!this.DefCntrlByHddn('iso3CntrRef')) { this.DefCntrlByModel('iso3CntrRef'); }
            if(!this.DefCntrlByHddn('iso2CntrRef')) { this.DefCntrlByModel('iso2CntrRef'); }
            if(!this.DefCntrlByHddn('iso3LngRef')) { this.DefCntrlByModel('iso3LngRef'); }
            if(!this.DefCntrlByHddn('iso2LngRef')) { this.DefCntrlByModel('iso2LngRef'); }
            if(!this.DefCntrlByHddn('cCountryName')) { this.DefCntrlByModel('cCountryName'); }
            if(!this.DefCntrlByHddn('lLanguageName')) { this.DefCntrlByModel('lLanguageName'); }
        } else {
            if(!this.DefCntrlByHddn('dialectId') ) { this.mainFormGroup.patchValue({'dialectId': null}); };
            if(!this.DefCntrlByHddn('dialectName') ) { this.mainFormGroup.patchValue({'dialectName': null}); };
            if(!this.DefCntrlByHddn('iso3CntrRef') ) { this.mainFormGroup.patchValue({'iso3CntrRef': null}); };
            if(!this.DefCntrlByHddn('iso2CntrRef') ) { this.mainFormGroup.patchValue({'iso2CntrRef': null}); };
            if(!this.DefCntrlByHddn('iso3LngRef') ) { this.mainFormGroup.patchValue({'iso3LngRef': null}); };
            if(!this.DefCntrlByHddn('iso2LngRef') ) { this.mainFormGroup.patchValue({'iso2LngRef': null}); };
            if(!this.DefCntrlByHddn('cCountryName') ) { this.mainFormGroup.patchValue({'cCountryName': null}); };
            if(!this.DefCntrlByHddn('lLanguageName') ) { this.mainFormGroup.patchValue({'lLanguageName': null}); };
        }
    }



    constructor(private frmSrvLitCountryView: LitCountryViewService, private frmSrvLitLanguageView: LitLanguageViewService, private frmSrvLitDialectView: LitDialectViewService, public dialog: MatDialog, protected appGlblSettings: AppGlblSettingsService ) {
        this.appearance = this.appGlblSettings.appearance;
        this.mainFormGroup =  new FormGroup({});
        let locValidators: ValidatorFn[]; 
        locValidators = [ Validators.required,Validators.maxLength(14),Validators.minLength(5) ];
        this.mainFormGroup.addControl('dialectId', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(52),Validators.minLength(2) ];
        this.mainFormGroup.addControl('dialectName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(3),Validators.minLength(3) ];
        this.mainFormGroup.addControl('iso3CntrRef', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(3),Validators.minLength(2) ];
        this.mainFormGroup.addControl('iso2CntrRef', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(3),Validators.minLength(3) ];
        this.mainFormGroup.addControl('iso3LngRef', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(3),Validators.minLength(2) ];
        this.mainFormGroup.addControl('iso2LngRef', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(40),Validators.minLength(3) ];
        this.mainFormGroup.addControl('cCountryName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(27),Validators.minLength(2) ];
        this.mainFormGroup.addControl('lLanguageName', new FormControl({ value: null, disabled: true}, locValidators));
    } // end of constructor
    private handleError<T> (result?: T) {
        return (error: any): Observable<T> => {
          this.appGlblSettings.showError('http', error)
          return of(result as T);
        };
    }
    ngOnInit(): void {
        this.InputToControls();
        this.OnEformModeChanged();
        this.DoClearControls();
        this.DoInit();
        this.ngOnInitCalled = true;
    }

    getErrorMessage(fc: AbstractControl): string {
        return this.appGlblSettings.getValidationErrorMessage(fc);
    } // end of getErrorMessage

    OnEformModeChanged(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            this.mainFormGroup.controls['dialectId'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['dialectName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['cCountryName'].enable( {emitEvent: false} );
            this.cCountryNameCmbCntrl = new FormControl({ value: null, disabled: true }, [ 
                (fc)=>{  if ((typeof fc.value === 'string') || (typeof fc.value === 'undefined') || (fc.value === null)) { 
                            this.mainFormGroup.patchValue({'cCountryName': null });
                            return  this.mainFormGroup.controls['cCountryName'].errors; }  
                        return null; }]);
                                
            this.cCountryNameCmbCntrl.valueChanges.subscribe(val => this.OnValChangedcCountryName(val, true));
            this.mainFormGroup.controls['lLanguageName'].enable( {emitEvent: false} ); 
        } 
        if (this.eformMode === EformMode.DeleteMode) {
            this.mainFormGroup.controls['dialectId'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['dialectName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['cCountryName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['lLanguageName'].enable( {emitEvent: false} );
        } 
    } // end of EformMode

    DoClearControls(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            this.cCountryNameCmbCntrl.patchValue(null, {emitEvent: false});
            this.cCountryNameCmbCntrl.disable( {emitEvent: false} );
            this.cCountryNameCmbCntrlVals = null;
            this.lLanguageNameBttnItm = null;
            this.lLanguageNameBttnDsnbl = true;
        } 
        else if (this.eformMode === EformMode.DeleteMode) {
        } 
    }


//
// TODO: check if DoInit()-method is required
//
    DoInit() {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            this.OnInitcCountryName();
            this.OnInitlLanguageName();
        }
    } // DoInit() 

    OnInitcCountryName(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let pkpIso3: any = null;
            let pkpIso2: any = null;
            if(!(typeof this.mainFormGroup.controls['iso3CntrRef'].value === 'undefined')) {
                if(!(this.mainFormGroup.controls['iso3CntrRef'].value === null)) {
                    pkpIso3 = this.mainFormGroup.controls['iso3CntrRef'].value;
                }
            }
            if(!(typeof this.mainFormGroup.controls['iso2CntrRef'].value === 'undefined')) {
                if(!(this.mainFormGroup.controls['iso2CntrRef'].value === null)) {
                    pkpIso2 = this.mainFormGroup.controls['iso2CntrRef'].value;
                }
            }
            let isPkNtDf: boolean =  (typeof pkpIso3 === 'undefined')  ||  (typeof pkpIso2 === 'undefined')   ;
            isPkNtDf = isPkNtDf ? isPkNtDf :  (pkpIso3 === null)  ||  (pkpIso2 === null)   ;
            if (isPkNtDf) { 
                this.OnValChangedcCountryName(null, true);
                this.OnUpdatecCountryNameCmbCntrlVals();
            } else {
                this.frmSrvLitCountryView.getone(pkpIso3, pkpIso2 )
                .subscribe(
                    (data: ILitCountryView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.cCountryNameCmbCntrl.patchValue(data, {emitEvent: false});
                                
                            }
                        }
                        this.OnValChangedcCountryName(this.cCountryNameCmbCntrl.value, false);
                        this.OnUpdatecCountryNameCmbCntrlVals();
                    },
                    error => { // error path
                        this.OnValChangedcCountryName(null, true);
                        this.OnUpdatecCountryNameCmbCntrlVals();
                        this.appGlblSettings.showError('http', error)
                    } 
                ); // end of .subscribe
            }
        }
    }
    OnInitlLanguageName(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let pkpIso3: any = null;
            let pkpIso2: any = null;
            if(!(typeof this.mainFormGroup.controls['iso3LngRef'].value === 'undefined')) {
                if(!(this.mainFormGroup.controls['iso3LngRef'].value === null)) {
                    pkpIso3 = this.mainFormGroup.controls['iso3LngRef'].value;
                }
            }
            if(!(typeof this.mainFormGroup.controls['iso2LngRef'].value === 'undefined')) {
                if(!(this.mainFormGroup.controls['iso2LngRef'].value === null)) {
                    pkpIso2 = this.mainFormGroup.controls['iso2LngRef'].value;
                }
            }
            let isPkNtDf: boolean =  (typeof pkpIso3 === 'undefined')  ||  (typeof pkpIso2 === 'undefined')   ;
            isPkNtDf = isPkNtDf ? isPkNtDf :  (pkpIso3 === null)  ||  (pkpIso2 === null)   ;
            if (isPkNtDf) { 
                this.OnValChangedlLanguageName(null, true);
            } else {
                this.frmSrvLitLanguageView.getone(pkpIso3, pkpIso2 )
                .subscribe(
                    (data: ILitLanguageView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.lLanguageNameBttnItm = data;
                            }
                        }
                        this.OnValChangedlLanguageName(this.lLanguageNameBttnItm, false);
                    },
                    error => { // error path
                        this.OnValChangedlLanguageName(null, true);
                        this.appGlblSettings.showError('http', error)
                    } 
                ); // end of .subscribe
            }
        }
    }

    OnUpdatecCountryNameCmbCntrlVals(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let flt = {};
            flt['orderby']=['countryName'];
            this.frmSrvLitCountryView.getwithfilter(flt).subscribe(
                (data: ILitCountryViewPage ) => { // success path
                    this.cCountryNameCmbCntrlVals = [];
                    if (!(typeof data === 'undefined')) {
                        if (!(data === null)) {
                            if (!(typeof data.items === 'undefined')) {
                                if (Array.isArray(data.items)) {
                                    this.cCountryNameCmbCntrlVals = data.items;
                                    let lfc: any = this.cCountryNameCmbCntrl.value;
                                    if (!(typeof lfc === 'undefined')) {
                                        if (!(lfc === null)) {
                                            let ind: number = this.cCountryNameCmbCntrlVals.findIndex(e => {
                                                        return  (e.iso3 === lfc.iso3) && (e.iso2 === lfc.iso2) ;
                                                });                            
                                            if (ind > -1) {
                                                this.cCountryNameCmbCntrlVals.splice(ind,1,lfc);
                                            } else {
                                                this.OnValChangedcCountryName(null, true);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(this.cCountryNameCmbCntrlVals.length < 1) {
                        this.OnValChangedcCountryName(null, true);
                    }
                }, 
                error => { // error path
                    this.cCountryNameCmbCntrlVals = [];
                    this.OnValChangedcCountryName(null, true);
                    this.appGlblSettings.showError('http', error)
                } 
            );
        }
    }


    OnValChangedcCountryName(inVal: any, dscrdChld: boolean): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof inVal === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (inVal === null);
            if (hasNoVal) { 
                dscrdChld = true; 
            }
            this.cCountryNameCmbCntrl.enable( {emitEvent: false} );
            let isDsbl: boolean = false;
            isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'iso3CntrRef');
            isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'iso2CntrRef');
            if(isDsbl) {
                this.cCountryNameCmbCntrl.disable( {emitEvent: false} );
            } else {
                this.cCountryNameCmbCntrl.enable( {emitEvent: false} );
            }
            if (hasNoVal) { 
                this.mainFormGroup.patchValue({'cCountryName': null});
                this.mainFormGroup.patchValue({'iso3CntrRef': null});
                this.mainFormGroup.patchValue({'iso2CntrRef': null});
            } else {
                if(typeof inVal.countryName === 'undefined') {
                    this.mainFormGroup.patchValue({'cCountryName': null});
                } else {
                    this.mainFormGroup.patchValue({'cCountryName': inVal.countryName});
                }
                if(typeof inVal.iso3 === 'undefined') {
                    this.mainFormGroup.patchValue({'iso3CntrRef': null});
                } else {
                    this.mainFormGroup.patchValue({'iso3CntrRef': inVal.iso3});
                }
                if(typeof inVal.iso2 === 'undefined') {
                    this.mainFormGroup.patchValue({'iso2CntrRef': null});
                } else {
                    this.mainFormGroup.patchValue({'iso2CntrRef': inVal.iso2});
                }
            }
        }
    }
    OnValChangedlLanguageName(inVal: any, dscrdChld: boolean): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof inVal === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (inVal === null);
            if (hasNoVal) { 
                dscrdChld = true; 
            }
            this.lLanguageNameBttnDsnbl = false;
            let isDsbl: boolean = false;
            isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'iso3LngRef');
            isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'iso2LngRef');
            this.lLanguageNameBttnDsnbl =  isDsbl;
            if (hasNoVal) { 
                this.mainFormGroup.patchValue({'lLanguageName': null});
                this.mainFormGroup.patchValue({'iso3LngRef': null});
                this.mainFormGroup.patchValue({'iso2LngRef': null});
            } else {
                if(typeof inVal.languageName === 'undefined') {
                    this.mainFormGroup.patchValue({'lLanguageName': null});
                } else {
                    this.mainFormGroup.patchValue({'lLanguageName': inVal.languageName});
                }
                if(typeof inVal.iso3 === 'undefined') {
                    this.mainFormGroup.patchValue({'iso3LngRef': null});
                } else {
                    this.mainFormGroup.patchValue({'iso3LngRef': inVal.iso3});
                }
                if(typeof inVal.iso2 === 'undefined') {
                    this.mainFormGroup.patchValue({'iso2LngRef': null});
                } else {
                    this.mainFormGroup.patchValue({'iso2LngRef': inVal.iso2});
                }
            }
        }
    }



    lLanguageNameSrchClck(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = false;
            let flt: ILitLanguageViewDlg = {
                title: 'Select Item',
                showFilter: true,
                canAdd: false,
                canUpdate: false,
                canDelete: false,
                hiddenFilter: [],
                selectedItems: null,
                maxHeight: 6,
                filterMaxHeight: 2

            };
            let w: string = this.appGlblSettings.getDialogWidth('LitDialectView');
            let mw: string = this.appGlblSettings.getDialogMaxWidth('LitDialectView');
            let dialogRef = this.dialog.open(LitLanguageViewSdlgComponent, {
              data: flt,
              maxWidth: mw,
              width: w,
            });
            dialogRef.afterClosed().subscribe(rslt => {
                if (!(typeof rslt === 'undefined')) {
                    if (!(rslt === null)) {
                        if (!(rslt.selectedItems === 'undefined')) {
                            if(Array.isArray(rslt.selectedItems)) {
                                if(rslt.selectedItems.length > 0) {
                                    this.lLanguageNameBttnItm = rslt.selectedItems[0];
                                    this.OnValChangedlLanguageName(rslt.selectedItems[0], true);
                                }
                            }
                        }
                    }
                }
            });
        }
    }




    @Output('before-submit') beforeSubmit = new EventEmitter();
    @Output('after-submit') afterSubmit = new EventEmitter<ILitDialectView>();

    doSubmit() {
        if(typeof this.mainFormGroup === 'undefined') return;
        if(this.mainFormGroup === null) return;
        if (this.mainFormGroup.invalid) {
            this.mainFormGroup.markAllAsTouched();
            if (this.eformMode === EformMode.AddMode) { 
                this.cCountryNameCmbCntrl.markAllAsTouched();
            }
            if (this.eformMode === EformMode.UpdateMode) { 
                this.cCountryNameCmbCntrl.markAllAsTouched();
            }
            if (this.eformMode === EformMode.DeleteMode) { 
            }
            return;
        }
        this.beforeSubmit.emit(this.mainFormGroup.value);

        if (this.eformMode === EformMode.AddMode) { 
            this.frmSrvLitDialectView.addone(this.mainFormGroup.getRawValue())
            .subscribe(
                (respdata: ILitDialectView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );
        } else if (this.eformMode === EformMode.UpdateMode) { 
            this.frmSrvLitDialectView.updateone(this.mainFormGroup.getRawValue())
            .subscribe(
                (respdata: ILitDialectView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );

        } else if (this.eformMode === EformMode.DeleteMode) { 
            this.frmSrvLitDialectView.deleteone(  this.mainFormGroup.controls['dialectId'].value )
            .subscribe(
                (respdata: ILitDialectView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );
        }
    }

} // the end of the LitDialectViewEformComponent class body



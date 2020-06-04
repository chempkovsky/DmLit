
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
import { ILitAuthorView } from './../interfaces/lit-author-view.interface';
import { ILitAuthorViewPage } from './../interfaces/lit-author-view-page.interface';
import { ILitAuthorViewFilter } from './../interfaces/lit-author-view-filter.interface';
import { LitAuthorViewService } from './../../../services/lit-author-view/lit-author-view.service';
import { LitCountryViewSdlgComponent } from './../../lit-country-view/sdlg/lit-country-view-sdlg.component';
import { ILitCountryViewDlg } from './../../lit-country-view/sdlg/lit-country-view-dlg.interface';

@Component({
  selector: 'app-lit-author-view-eform',
  templateUrl: './lit-author-view-eform.component.html',
  styleUrls: ['./lit-author-view-eform.component.css']
})
export class LitAuthorViewEformComponent implements OnInit, IEventEmitterPub {
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
    public cCountryNameBttnItm: ILitCountryView | null = null;
    public cCountryNameBttnDsnbl: boolean = true;

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
    protected _eformControlModel: ILitAuthorView | null = null;
    @Input('eform-control-model') 
        set eformControlModel (inFormControlModel : ILitAuthorView) {
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
        get eformControlModel(): ILitAuthorView {
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
            if(!this.DefCntrlByHddn('authorId')) { this.DefCntrlByModel('authorId'); }
            if(!this.DefCntrlByHddn('firstName')) { this.DefCntrlByModel('firstName'); }
            if(!this.DefCntrlByHddn('lastName')) { this.DefCntrlByModel('lastName'); }
            if(!this.DefCntrlByHddn('birthDate')) { this.DefCntrlByModel('birthDate'); }
            if(!this.DefCntrlByHddn('deathDate')) { this.DefCntrlByModel('deathDate'); }
            if(!this.DefCntrlByHddn('iso3CntrRef')) { this.DefCntrlByModel('iso3CntrRef'); }
            if(!this.DefCntrlByHddn('iso2CntrRef')) { this.DefCntrlByModel('iso2CntrRef'); }
            if(!this.DefCntrlByHddn('cCountryName')) { this.DefCntrlByModel('cCountryName'); }
        } else {
            if(!this.DefCntrlByHddn('authorId') ) { this.mainFormGroup.patchValue({'authorId': null}); };
            if(!this.DefCntrlByHddn('firstName') ) { this.mainFormGroup.patchValue({'firstName': null}); };
            if(!this.DefCntrlByHddn('lastName') ) { this.mainFormGroup.patchValue({'lastName': null}); };
            if(!this.DefCntrlByHddn('birthDate') ) { this.mainFormGroup.patchValue({'birthDate': null}); };
            if(!this.DefCntrlByHddn('deathDate') ) { this.mainFormGroup.patchValue({'deathDate': null}); };
            if(!this.DefCntrlByHddn('iso3CntrRef') ) { this.mainFormGroup.patchValue({'iso3CntrRef': null}); };
            if(!this.DefCntrlByHddn('iso2CntrRef') ) { this.mainFormGroup.patchValue({'iso2CntrRef': null}); };
            if(!this.DefCntrlByHddn('cCountryName') ) { this.mainFormGroup.patchValue({'cCountryName': null}); };
        }
    }



    constructor(private frmSrvLitCountryView: LitCountryViewService, private frmSrvLitAuthorView: LitAuthorViewService, public dialog: MatDialog, protected appGlblSettings: AppGlblSettingsService ) {
        this.appearance = this.appGlblSettings.appearance;
        this.mainFormGroup =  new FormGroup({});
        let locValidators: ValidatorFn[]; 
        locValidators = [ ];
        this.mainFormGroup.addControl('authorId', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(16),Validators.minLength(3) ];
        this.mainFormGroup.addControl('firstName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(30),Validators.minLength(3) ];
        this.mainFormGroup.addControl('lastName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [  ];
        this.mainFormGroup.addControl('birthDate', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [  ];
        this.mainFormGroup.addControl('deathDate', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(3),Validators.minLength(3) ];
        this.mainFormGroup.addControl('iso3CntrRef', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(3),Validators.minLength(2) ];
        this.mainFormGroup.addControl('iso2CntrRef', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(40),Validators.minLength(3) ];
        this.mainFormGroup.addControl('cCountryName', new FormControl({ value: null, disabled: true}, locValidators));
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
            this.mainFormGroup.controls['authorId'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['firstName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['lastName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['birthDate'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['deathDate'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['cCountryName'].enable( {emitEvent: false} ); 
        } 
        if (this.eformMode === EformMode.DeleteMode) {
            this.mainFormGroup.controls['authorId'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['firstName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['lastName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['birthDate'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['deathDate'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['cCountryName'].enable( {emitEvent: false} );
        } 
    } // end of EformMode

    DoClearControls(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            this.cCountryNameBttnItm = null;
            this.cCountryNameBttnDsnbl = true;
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
            } else {
                this.frmSrvLitCountryView.getone(pkpIso3, pkpIso2 )
                .subscribe(
                    (data: ILitCountryView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.cCountryNameBttnItm = data;
                            }
                        }
                        this.OnValChangedcCountryName(this.cCountryNameBttnItm, false);
                    },
                    error => { // error path
                        this.OnValChangedcCountryName(null, true);
                        this.appGlblSettings.showError('http', error)
                    } 
                ); // end of .subscribe
            }
        }
    }



    OnValChangedcCountryName(inVal: any, dscrdChld: boolean): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof inVal === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (inVal === null);
            if (hasNoVal) { 
                dscrdChld = true; 
            }
            this.cCountryNameBttnDsnbl = false;
            let isDsbl: boolean = false;
            isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'iso3CntrRef');
            isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'iso2CntrRef');
            this.cCountryNameBttnDsnbl =  isDsbl;
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



    cCountryNameSrchClck(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = false;
            let flt: ILitCountryViewDlg = {
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
            let w: string = this.appGlblSettings.getDialogWidth('LitAuthorView');
            let mw: string = this.appGlblSettings.getDialogMaxWidth('LitAuthorView');
            let dialogRef = this.dialog.open(LitCountryViewSdlgComponent, {
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
                                    this.cCountryNameBttnItm = rslt.selectedItems[0];
                                    this.OnValChangedcCountryName(rslt.selectedItems[0], true);
                                }
                            }
                        }
                    }
                }
            });
        }
    }




    @Output('before-submit') beforeSubmit = new EventEmitter();
    @Output('after-submit') afterSubmit = new EventEmitter<ILitAuthorView>();

    doSubmit() {
        if(typeof this.mainFormGroup === 'undefined') return;
        if(this.mainFormGroup === null) return;
        if (this.mainFormGroup.invalid) {
            this.mainFormGroup.markAllAsTouched();
            if (this.eformMode === EformMode.AddMode) { 
            }
            if (this.eformMode === EformMode.UpdateMode) { 
            }
            if (this.eformMode === EformMode.DeleteMode) { 
            }
            return;
        }
        this.beforeSubmit.emit(this.mainFormGroup.value);

        if (this.eformMode === EformMode.AddMode) { 
            this.frmSrvLitAuthorView.addone(this.mainFormGroup.getRawValue())
            .subscribe(
                (respdata: ILitAuthorView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );
        } else if (this.eformMode === EformMode.UpdateMode) { 
            this.frmSrvLitAuthorView.updateone(this.mainFormGroup.getRawValue())
            .subscribe(
                (respdata: ILitAuthorView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );

        } else if (this.eformMode === EformMode.DeleteMode) { 
            this.frmSrvLitAuthorView.deleteone(  this.mainFormGroup.controls['authorId'].value )
            .subscribe(
                (respdata: ILitAuthorView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );
        }
    }

} // the end of the LitAuthorViewEformComponent class body



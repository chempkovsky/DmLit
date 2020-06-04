
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

import { ILitAuthorView } from './../../lit-author-view/interfaces/lit-author-view.interface';
import { ILitAuthorViewPage } from './../../lit-author-view/interfaces/lit-author-view-page.interface';
import { ILitAuthorViewFilter } from './../../lit-author-view/interfaces/lit-author-view-filter.interface';
import { LitAuthorViewService } from './../../../services/lit-author-view/lit-author-view.service';
import { ILitCountryView } from './../../lit-country-view/interfaces/lit-country-view.interface';
import { ILitCountryViewPage } from './../../lit-country-view/interfaces/lit-country-view-page.interface';
import { ILitCountryViewFilter } from './../../lit-country-view/interfaces/lit-country-view-filter.interface';
import { LitCountryViewService } from './../../../services/lit-country-view/lit-country-view.service';
import { ILitGenreView } from './../../lit-genre-view/interfaces/lit-genre-view.interface';
import { ILitGenreViewPage } from './../../lit-genre-view/interfaces/lit-genre-view-page.interface';
import { ILitGenreViewFilter } from './../../lit-genre-view/interfaces/lit-genre-view-filter.interface';
import { LitGenreViewService } from './../../../services/lit-genre-view/lit-genre-view.service';
import { ILitDialectView } from './../../lit-dialect-view/interfaces/lit-dialect-view.interface';
import { ILitDialectViewPage } from './../../lit-dialect-view/interfaces/lit-dialect-view-page.interface';
import { ILitDialectViewFilter } from './../../lit-dialect-view/interfaces/lit-dialect-view-filter.interface';
import { LitDialectViewService } from './../../../services/lit-dialect-view/lit-dialect-view.service';
import { ILitManuscriptView } from './../interfaces/lit-manuscript-view.interface';
import { ILitManuscriptViewPage } from './../interfaces/lit-manuscript-view-page.interface';
import { ILitManuscriptViewFilter } from './../interfaces/lit-manuscript-view-filter.interface';
import { LitManuscriptViewService } from './../../../services/lit-manuscript-view/lit-manuscript-view.service';
import { LitCountryViewSdlgComponent } from './../../lit-country-view/sdlg/lit-country-view-sdlg.component';
import { ILitCountryViewDlg } from './../../lit-country-view/sdlg/lit-country-view-dlg.interface';

@Component({
  selector: 'app-lit-manuscript-view-eform',
  templateUrl: './lit-manuscript-view-eform.component.html',
  styleUrls: ['./lit-manuscript-view-eform.component.css']
})
export class LitManuscriptViewEformComponent implements OnInit, IEventEmitterPub {
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
    public aLastNameCmbCntrl: FormControl = null;
    public aLastNameCmbCntrlVals : Array<ILitAuthorView> | null = null;
    public aCCountryNameBttnItm: ILitCountryView | null = null;
    public aCCountryNameBttnDsnbl: boolean = true;

    public gGenreNameCmbCntrl: FormControl = null;
    public gGenreNameCmbCntrlVals : Array<ILitGenreView> | null = null;
    public dDialectNameCmbCntrl: FormControl = null;
    public dDialectNameCmbCntrlVals : Array<ILitDialectView> | null = null;
    public dCCountryNameBttnItm: ILitCountryView | null = null;
    public dCCountryNameBttnDsnbl: boolean = true;

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
    protected _eformControlModel: ILitManuscriptView | null = null;
    @Input('eform-control-model') 
        set eformControlModel (inFormControlModel : ILitManuscriptView) {
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
        get eformControlModel(): ILitManuscriptView {
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
            if(!this.DefCntrlByHddn('manuscriptId')) { this.DefCntrlByModel('manuscriptId'); }
            if(!this.DefCntrlByHddn('manuscriptTitle')) { this.DefCntrlByModel('manuscriptTitle'); }
            if(!this.DefCntrlByHddn('completionDate')) { this.DefCntrlByModel('completionDate'); }
            if(!this.DefCntrlByHddn('beginningDate')) { this.DefCntrlByModel('beginningDate'); }
            if(!this.DefCntrlByHddn('authorIdRef')) { this.DefCntrlByModel('authorIdRef'); }
            if(!this.DefCntrlByHddn('genreIdRef')) { this.DefCntrlByModel('genreIdRef'); }
            if(!this.DefCntrlByHddn('dialectIdRef')) { this.DefCntrlByModel('dialectIdRef'); }
            if(!this.DefCntrlByHddn('aFirstName')) { this.DefCntrlByModel('aFirstName'); }
            if(!this.DefCntrlByHddn('aLastName')) { this.DefCntrlByModel('aLastName'); }
            if(!this.DefCntrlByHddn('aBirthDate')) { this.DefCntrlByModel('aBirthDate'); }
            if(!this.DefCntrlByHddn('aCCountryName')) { this.DefCntrlByModel('aCCountryName'); }
            if(!this.DefCntrlByHddn('gGenreName')) { this.DefCntrlByModel('gGenreName'); }
            if(!this.DefCntrlByHddn('dDialectName')) { this.DefCntrlByModel('dDialectName'); }
            if(!this.DefCntrlByHddn('dCCountryName')) { this.DefCntrlByModel('dCCountryName'); }
        } else {
            if(!this.DefCntrlByHddn('manuscriptId') ) { this.mainFormGroup.patchValue({'manuscriptId': null}); };
            if(!this.DefCntrlByHddn('manuscriptTitle') ) { this.mainFormGroup.patchValue({'manuscriptTitle': null}); };
            if(!this.DefCntrlByHddn('completionDate') ) { this.mainFormGroup.patchValue({'completionDate': null}); };
            if(!this.DefCntrlByHddn('beginningDate') ) { this.mainFormGroup.patchValue({'beginningDate': null}); };
            if(!this.DefCntrlByHddn('authorIdRef') ) { this.mainFormGroup.patchValue({'authorIdRef': null}); };
            if(!this.DefCntrlByHddn('genreIdRef') ) { this.mainFormGroup.patchValue({'genreIdRef': null}); };
            if(!this.DefCntrlByHddn('dialectIdRef') ) { this.mainFormGroup.patchValue({'dialectIdRef': null}); };
            if(!this.DefCntrlByHddn('aFirstName') ) { this.mainFormGroup.patchValue({'aFirstName': null}); };
            if(!this.DefCntrlByHddn('aLastName') ) { this.mainFormGroup.patchValue({'aLastName': null}); };
            if(!this.DefCntrlByHddn('aBirthDate') ) { this.mainFormGroup.patchValue({'aBirthDate': null}); };
            if(!this.DefCntrlByHddn('aCCountryName') ) { this.mainFormGroup.patchValue({'aCCountryName': null}); };
            if(!this.DefCntrlByHddn('gGenreName') ) { this.mainFormGroup.patchValue({'gGenreName': null}); };
            if(!this.DefCntrlByHddn('dDialectName') ) { this.mainFormGroup.patchValue({'dDialectName': null}); };
            if(!this.DefCntrlByHddn('dCCountryName') ) { this.mainFormGroup.patchValue({'dCCountryName': null}); };
        }
    }



    constructor(private frmSrvLitAuthorView: LitAuthorViewService, private frmSrvLitCountryView: LitCountryViewService, private frmSrvLitGenreView: LitGenreViewService, private frmSrvLitDialectView: LitDialectViewService, private frmSrvLitManuscriptView: LitManuscriptViewService, public dialog: MatDialog, protected appGlblSettings: AppGlblSettingsService ) {
        this.appearance = this.appGlblSettings.appearance;
        this.mainFormGroup =  new FormGroup({});
        let locValidators: ValidatorFn[]; 
        locValidators = [ ];
        this.mainFormGroup.addControl('manuscriptId', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(60),Validators.minLength(3) ];
        this.mainFormGroup.addControl('manuscriptTitle', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required ];
        this.mainFormGroup.addControl('completionDate', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [  ];
        this.mainFormGroup.addControl('beginningDate', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('authorIdRef', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('genreIdRef', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(14),Validators.minLength(5) ];
        this.mainFormGroup.addControl('dialectIdRef', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(16),Validators.minLength(3) ];
        this.mainFormGroup.addControl('aFirstName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(30),Validators.minLength(3) ];
        this.mainFormGroup.addControl('aLastName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [  ];
        this.mainFormGroup.addControl('aBirthDate', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(40),Validators.minLength(3) ];
        this.mainFormGroup.addControl('aCCountryName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(20),Validators.minLength(3) ];
        this.mainFormGroup.addControl('gGenreName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(52),Validators.minLength(2) ];
        this.mainFormGroup.addControl('dDialectName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(40),Validators.minLength(3) ];
        this.mainFormGroup.addControl('dCCountryName', new FormControl({ value: null, disabled: true}, locValidators));
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
            this.mainFormGroup.controls['manuscriptId'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['manuscriptTitle'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['completionDate'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['beginningDate'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['aFirstName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['aLastName'].enable( {emitEvent: false} );
            this.aLastNameCmbCntrl = new FormControl({ value: null, disabled: true }, [ 
                (fc)=>{  if ((typeof fc.value === 'string') || (typeof fc.value === 'undefined') || (fc.value === null)) { 
                            this.mainFormGroup.patchValue({'aLastName': null });
                            return  this.mainFormGroup.controls['aLastName'].errors; }  
                        return null; }]);
                                
            this.aLastNameCmbCntrl.valueChanges.subscribe(val => this.OnValChangedaLastName(val, true));
            this.mainFormGroup.controls['aBirthDate'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['aCCountryName'].enable( {emitEvent: false} ); 
            this.mainFormGroup.controls['gGenreName'].enable( {emitEvent: false} );
            this.gGenreNameCmbCntrl = new FormControl({ value: null, disabled: true }, [ 
                (fc)=>{  if ((typeof fc.value === 'string') || (typeof fc.value === 'undefined') || (fc.value === null)) { 
                            this.mainFormGroup.patchValue({'gGenreName': null });
                            return  this.mainFormGroup.controls['gGenreName'].errors; }  
                        return null; }]);
                                
            this.gGenreNameCmbCntrl.valueChanges.subscribe(val => this.OnValChangedgGenreName(val, true));
            this.mainFormGroup.controls['dDialectName'].enable( {emitEvent: false} );
            this.dDialectNameCmbCntrl = new FormControl({ value: null, disabled: true }, [ 
                (fc)=>{  if ((typeof fc.value === 'string') || (typeof fc.value === 'undefined') || (fc.value === null)) { 
                            this.mainFormGroup.patchValue({'dDialectName': null });
                            return  this.mainFormGroup.controls['dDialectName'].errors; }  
                        return null; }]);
                                
            this.dDialectNameCmbCntrl.valueChanges.subscribe(val => this.OnValChangeddDialectName(val, true));
            this.mainFormGroup.controls['dCCountryName'].enable( {emitEvent: false} ); 
        } 
        if (this.eformMode === EformMode.DeleteMode) {
            this.mainFormGroup.controls['manuscriptId'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['manuscriptTitle'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['completionDate'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['beginningDate'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['aFirstName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['aLastName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['aBirthDate'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['aCCountryName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['gGenreName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['dDialectName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['dCCountryName'].enable( {emitEvent: false} );
        } 
    } // end of EformMode

    DoClearControls(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            this.aLastNameCmbCntrl.patchValue(null, {emitEvent: false});
            this.aLastNameCmbCntrl.disable( {emitEvent: false} );
            this.aLastNameCmbCntrlVals = null;
            this.aCCountryNameBttnItm = null;
            this.aCCountryNameBttnDsnbl = true;
            this.gGenreNameCmbCntrl.patchValue(null, {emitEvent: false});
            this.gGenreNameCmbCntrl.disable( {emitEvent: false} );
            this.gGenreNameCmbCntrlVals = null;
            this.dDialectNameCmbCntrl.patchValue(null, {emitEvent: false});
            this.dDialectNameCmbCntrl.disable( {emitEvent: false} );
            this.dDialectNameCmbCntrlVals = null;
            this.dCCountryNameBttnItm = null;
            this.dCCountryNameBttnDsnbl = true;
        } 
        else if (this.eformMode === EformMode.DeleteMode) {
        } 
    }


//
// TODO: check if DoInit()-method is required
//
    DoInit() {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            this.OnInitaLastName();
            this.OnInitgGenreName();
            this.OnInitdDialectName();
        }
    } // DoInit() 

    OnInitaLastName(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let pkpAuthorId: any = null;
            if(!(typeof this.mainFormGroup.controls['authorIdRef'].value === 'undefined')) {
                if(!(this.mainFormGroup.controls['authorIdRef'].value === null)) {
                    pkpAuthorId = this.mainFormGroup.controls['authorIdRef'].value;
                }
            }
            let isPkNtDf: boolean =  (typeof pkpAuthorId === 'undefined')   ;
            isPkNtDf = isPkNtDf ? isPkNtDf :  (pkpAuthorId === null)   ;
            if (isPkNtDf) { 
                this.OnInitaCCountryName();
            } else {
                this.frmSrvLitAuthorView.getone(pkpAuthorId )
                .subscribe(
                    (data: ILitAuthorView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.aLastNameCmbCntrl.patchValue(data, {emitEvent: false});
                                
                            }
                        }
                        this.OnInitaCCountryName();
                    },
                    error => { // error path
                        this.OnInitaCCountryName();
                        this.appGlblSettings.showError('http', error)
                    } 
                ); // end of .subscribe
            }
        }
    }
    OnInitaCCountryName(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let pkpIso3: any = null;
            let pkpIso2: any = null;
            if(!(typeof this.aLastNameCmbCntrl.value === 'undefined')) {
                if(!(this.aLastNameCmbCntrl.value === null)) {
                    if(!(typeof this.aLastNameCmbCntrl.value.iso3CntrRef  === 'undefined')) {
                        pkpIso3 = this.aLastNameCmbCntrl.value.iso3CntrRef;
                    }
                }
            }
            if(!(typeof this.aLastNameCmbCntrl.value === 'undefined')) {
                if(!(this.aLastNameCmbCntrl.value === null)) {
                    if(!(typeof this.aLastNameCmbCntrl.value.iso2CntrRef  === 'undefined')) {
                        pkpIso2 = this.aLastNameCmbCntrl.value.iso2CntrRef;
                    }
                }
            }
            let isPkNtDf: boolean =  (typeof pkpIso3 === 'undefined')  ||  (typeof pkpIso2 === 'undefined')   ;
            isPkNtDf = isPkNtDf ? isPkNtDf :  (pkpIso3 === null)  ||  (pkpIso2 === null)   ;
            if (isPkNtDf) { 
                this.OnValChangedaCCountryName(null, true);
            } else {
                this.frmSrvLitCountryView.getone(pkpIso3, pkpIso2 )
                .subscribe(
                    (data: ILitCountryView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.aCCountryNameBttnItm = data;
                            }
                        }
                        this.OnValChangedaCCountryName(this.aCCountryNameBttnItm, false);
                    },
                    error => { // error path
                        this.OnValChangedaCCountryName(null, true);
                        this.appGlblSettings.showError('http', error)
                    } 
                ); // end of .subscribe
            }
        }
    }
    OnInitgGenreName(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let pkpGenreId: any = null;
            if(!(typeof this.mainFormGroup.controls['genreIdRef'].value === 'undefined')) {
                if(!(this.mainFormGroup.controls['genreIdRef'].value === null)) {
                    pkpGenreId = this.mainFormGroup.controls['genreIdRef'].value;
                }
            }
            let isPkNtDf: boolean =  (typeof pkpGenreId === 'undefined')   ;
            isPkNtDf = isPkNtDf ? isPkNtDf :  (pkpGenreId === null)   ;
            if (isPkNtDf) { 
                this.OnValChangedgGenreName(null, true);
                this.OnUpdategGenreNameCmbCntrlVals();
            } else {
                this.frmSrvLitGenreView.getone(pkpGenreId )
                .subscribe(
                    (data: ILitGenreView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.gGenreNameCmbCntrl.patchValue(data, {emitEvent: false});
                                
                            }
                        }
                        this.OnValChangedgGenreName(this.gGenreNameCmbCntrl.value, false);
                        this.OnUpdategGenreNameCmbCntrlVals();
                    },
                    error => { // error path
                        this.OnValChangedgGenreName(null, true);
                        this.OnUpdategGenreNameCmbCntrlVals();
                        this.appGlblSettings.showError('http', error)
                    } 
                ); // end of .subscribe
            }
        }
    }
    OnInitdDialectName(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let pkpDialectId: any = null;
            if(!(typeof this.mainFormGroup.controls['dialectIdRef'].value === 'undefined')) {
                if(!(this.mainFormGroup.controls['dialectIdRef'].value === null)) {
                    pkpDialectId = this.mainFormGroup.controls['dialectIdRef'].value;
                }
            }
            let isPkNtDf: boolean =  (typeof pkpDialectId === 'undefined')   ;
            isPkNtDf = isPkNtDf ? isPkNtDf :  (pkpDialectId === null)   ;
            if (isPkNtDf) { 
                this.OnInitdCCountryName();
            } else {
                this.frmSrvLitDialectView.getone(pkpDialectId )
                .subscribe(
                    (data: ILitDialectView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.dDialectNameCmbCntrl.patchValue(data, {emitEvent: false});
                                
                            }
                        }
                        this.OnInitdCCountryName();
                    },
                    error => { // error path
                        this.OnInitdCCountryName();
                        this.appGlblSettings.showError('http', error)
                    } 
                ); // end of .subscribe
            }
        }
    }
    OnInitdCCountryName(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let pkpIso3: any = null;
            let pkpIso2: any = null;
            if(!(typeof this.dDialectNameCmbCntrl.value === 'undefined')) {
                if(!(this.dDialectNameCmbCntrl.value === null)) {
                    if(!(typeof this.dDialectNameCmbCntrl.value.iso3CntrRef  === 'undefined')) {
                        pkpIso3 = this.dDialectNameCmbCntrl.value.iso3CntrRef;
                    }
                }
            }
            if(!(typeof this.dDialectNameCmbCntrl.value === 'undefined')) {
                if(!(this.dDialectNameCmbCntrl.value === null)) {
                    if(!(typeof this.dDialectNameCmbCntrl.value.iso2CntrRef  === 'undefined')) {
                        pkpIso2 = this.dDialectNameCmbCntrl.value.iso2CntrRef;
                    }
                }
            }
            let isPkNtDf: boolean =  (typeof pkpIso3 === 'undefined')  ||  (typeof pkpIso2 === 'undefined')   ;
            isPkNtDf = isPkNtDf ? isPkNtDf :  (pkpIso3 === null)  ||  (pkpIso2 === null)   ;
            if (isPkNtDf) { 
                this.OnValChangeddCCountryName(null, true);
            } else {
                this.frmSrvLitCountryView.getone(pkpIso3, pkpIso2 )
                .subscribe(
                    (data: ILitCountryView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.dCCountryNameBttnItm = data;
                            }
                        }
                        this.OnValChangeddCCountryName(this.dCCountryNameBttnItm, false);
                    },
                    error => { // error path
                        this.OnValChangeddCCountryName(null, true);
                        this.appGlblSettings.showError('http', error)
                    } 
                ); // end of .subscribe
            }
        }
    }

    OnUpdateaLastNameCmbCntrlVals(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof this.aLastNameCmbCntrl.value === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (this.aLastNameCmbCntrl.value === null);
            let flt: ILitAuthorViewFilter | null = null;
            if (! hasNoVal) {
                let lfc: ILitAuthorView = this.aLastNameCmbCntrl.value;
                hasNoVal = hasNoVal ? hasNoVal :  ((typeof lfc.iso3CntrRef === 'undefined') || (typeof lfc.iso2CntrRef === 'undefined')); 
                hasNoVal = hasNoVal ? hasNoVal :  ((lfc.iso3CntrRef === null) || (lfc.iso2CntrRef === null));                               
                if(!hasNoVal) {
                    flt={};
                    flt.iso3CntrRef = [lfc.iso3CntrRef];
                    flt.iso2CntrRef = [lfc.iso2CntrRef];
                }
            }
            if (hasNoVal) {
                hasNoVal = false;

                hasNoVal = hasNoVal ? hasNoVal : (typeof this.aCCountryNameBttnItm === 'undefined');
                hasNoVal = hasNoVal ? hasNoVal : (this.aCCountryNameBttnItm === null);
          
                if (! hasNoVal) {
                    hasNoVal = hasNoVal ? hasNoVal : (typeof this.aCCountryNameBttnItm.iso3 === 'undefined');
                    hasNoVal = hasNoVal ? hasNoVal : (this.aCCountryNameBttnItm.iso3 === null);
                    hasNoVal = hasNoVal ? hasNoVal : (typeof this.aCCountryNameBttnItm.iso2 === 'undefined');
                    hasNoVal = hasNoVal ? hasNoVal : (this.aCCountryNameBttnItm.iso2 === null);
                }
                if (!hasNoVal) {
                    flt = {};
                    flt['iso3CntrRef'] = [this.aCCountryNameBttnItm.iso3];
                    flt['iso2CntrRef'] = [this.aCCountryNameBttnItm.iso2];
                }
            }
            if (!hasNoVal) {
                    flt['orderby']=['lastName'];
                    this.frmSrvLitAuthorView.getwithfilter(flt).subscribe(
                        (data: ILitAuthorViewPage ) => { // success path
                            this.aLastNameCmbCntrlVals = [];
                            if (!(typeof data === 'undefined')) {
                                if (!(data === null)) {
                                    if (!(typeof data.items === 'undefined')) {
                                        if (Array.isArray(data.items)) {
                                            this.aLastNameCmbCntrlVals = data.items;
                                            let lfc: any = this.aLastNameCmbCntrl.value;
                                            if (!(typeof lfc === 'undefined')) {
                                                if (!(lfc === null)) {
                                                    let ind: number = this.aLastNameCmbCntrlVals.findIndex(e => {
                                                                return  (e.authorId === lfc.authorId) ;
                                                        });                            
                                                    if (ind > -1) {
                                                        this.aLastNameCmbCntrlVals.splice(ind,1,lfc);
                                                    } else {
                                                        this.OnValChangedaLastName(null, true);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if(this.aLastNameCmbCntrlVals.length < 1) {
                                this.OnValChangedaLastName(null, true);
                            }
                        }, 
                        error => { // error path
                            this.aLastNameCmbCntrlVals = [];
                            this.OnValChangedaLastName(null, true);
                            this.appGlblSettings.showError('http', error)
                        } 
                    );
            } else {
                this.aLastNameCmbCntrlVals = [];
                this.OnValChangedaLastName(null, true);
            }
        }
    }
    OnUpdategGenreNameCmbCntrlVals(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let flt = {};
            flt['orderby']=['genreName'];
            this.frmSrvLitGenreView.getwithfilter(flt).subscribe(
                (data: ILitGenreViewPage ) => { // success path
                    this.gGenreNameCmbCntrlVals = [];
                    if (!(typeof data === 'undefined')) {
                        if (!(data === null)) {
                            if (!(typeof data.items === 'undefined')) {
                                if (Array.isArray(data.items)) {
                                    this.gGenreNameCmbCntrlVals = data.items;
                                    let lfc: any = this.gGenreNameCmbCntrl.value;
                                    if (!(typeof lfc === 'undefined')) {
                                        if (!(lfc === null)) {
                                            let ind: number = this.gGenreNameCmbCntrlVals.findIndex(e => {
                                                        return  (e.genreId === lfc.genreId) ;
                                                });                            
                                            if (ind > -1) {
                                                this.gGenreNameCmbCntrlVals.splice(ind,1,lfc);
                                            } else {
                                                this.OnValChangedgGenreName(null, true);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(this.gGenreNameCmbCntrlVals.length < 1) {
                        this.OnValChangedgGenreName(null, true);
                    }
                }, 
                error => { // error path
                    this.gGenreNameCmbCntrlVals = [];
                    this.OnValChangedgGenreName(null, true);
                    this.appGlblSettings.showError('http', error)
                } 
            );
        }
    }
    OnUpdatedDialectNameCmbCntrlVals(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof this.dDialectNameCmbCntrl.value === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (this.dDialectNameCmbCntrl.value === null);
            let flt: ILitDialectViewFilter | null = null;
            if (! hasNoVal) {
                let lfc: ILitDialectView = this.dDialectNameCmbCntrl.value;
                hasNoVal = hasNoVal ? hasNoVal :  ((typeof lfc.iso3CntrRef === 'undefined') || (typeof lfc.iso2CntrRef === 'undefined')); 
                hasNoVal = hasNoVal ? hasNoVal :  ((lfc.iso3CntrRef === null) || (lfc.iso2CntrRef === null));                               
                if(!hasNoVal) {
                    flt={};
                    flt.iso3CntrRef = [lfc.iso3CntrRef];
                    flt.iso2CntrRef = [lfc.iso2CntrRef];
                }
            }
            if (hasNoVal) {
                hasNoVal = false;

                hasNoVal = hasNoVal ? hasNoVal : (typeof this.dCCountryNameBttnItm === 'undefined');
                hasNoVal = hasNoVal ? hasNoVal : (this.dCCountryNameBttnItm === null);
          
                if (! hasNoVal) {
                    hasNoVal = hasNoVal ? hasNoVal : (typeof this.dCCountryNameBttnItm.iso3 === 'undefined');
                    hasNoVal = hasNoVal ? hasNoVal : (this.dCCountryNameBttnItm.iso3 === null);
                    hasNoVal = hasNoVal ? hasNoVal : (typeof this.dCCountryNameBttnItm.iso2 === 'undefined');
                    hasNoVal = hasNoVal ? hasNoVal : (this.dCCountryNameBttnItm.iso2 === null);
                }
                if (!hasNoVal) {
                    flt = {};
                    flt['iso3CntrRef'] = [this.dCCountryNameBttnItm.iso3];
                    flt['iso2CntrRef'] = [this.dCCountryNameBttnItm.iso2];
                }
            }
            if (!hasNoVal) {
                    flt['orderby']=['dialectName'];
                    this.frmSrvLitDialectView.getwithfilter(flt).subscribe(
                        (data: ILitDialectViewPage ) => { // success path
                            this.dDialectNameCmbCntrlVals = [];
                            if (!(typeof data === 'undefined')) {
                                if (!(data === null)) {
                                    if (!(typeof data.items === 'undefined')) {
                                        if (Array.isArray(data.items)) {
                                            this.dDialectNameCmbCntrlVals = data.items;
                                            let lfc: any = this.dDialectNameCmbCntrl.value;
                                            if (!(typeof lfc === 'undefined')) {
                                                if (!(lfc === null)) {
                                                    let ind: number = this.dDialectNameCmbCntrlVals.findIndex(e => {
                                                                return  (e.dialectId === lfc.dialectId) ;
                                                        });                            
                                                    if (ind > -1) {
                                                        this.dDialectNameCmbCntrlVals.splice(ind,1,lfc);
                                                    } else {
                                                        this.OnValChangeddDialectName(null, true);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if(this.dDialectNameCmbCntrlVals.length < 1) {
                                this.OnValChangeddDialectName(null, true);
                            }
                        }, 
                        error => { // error path
                            this.dDialectNameCmbCntrlVals = [];
                            this.OnValChangeddDialectName(null, true);
                            this.appGlblSettings.showError('http', error)
                        } 
                    );
            } else {
                this.dDialectNameCmbCntrlVals = [];
                this.OnValChangeddDialectName(null, true);
            }
        }
    }


    OnValChangedaLastName(inVal: any, dscrdChld: boolean): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof inVal === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (inVal === null);
            if (hasNoVal) { 
                dscrdChld = true; 
            }
            let isDsbl: boolean = false;
            isDsbl = isDsbl ? isDsbl : (typeof this.aCCountryNameBttnItm === 'undefined') ;
            isDsbl = isDsbl ? isDsbl : (this.aCCountryNameBttnItm === null);
            if(!isDsbl) {
                isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'authorIdRef');
            }
            if(isDsbl) {
                this.aLastNameCmbCntrl.disable( {emitEvent: false} );
            } else {
                this.aLastNameCmbCntrl.enable( {emitEvent: false} );
            }
            if (hasNoVal) { 
                this.mainFormGroup.patchValue({'aFirstName': null});
                this.mainFormGroup.patchValue({'aLastName': null});
                this.mainFormGroup.patchValue({'aBirthDate': null});
                this.mainFormGroup.patchValue({'authorIdRef': null});
            } else {
                if(typeof inVal.firstName === 'undefined') {
                    this.mainFormGroup.patchValue({'aFirstName': null});
                } else {
                    this.mainFormGroup.patchValue({'aFirstName': inVal.firstName});
                }
                if(typeof inVal.lastName === 'undefined') {
                    this.mainFormGroup.patchValue({'aLastName': null});
                } else {
                    this.mainFormGroup.patchValue({'aLastName': inVal.lastName});
                }
                if(typeof inVal.birthDate === 'undefined') {
                    this.mainFormGroup.patchValue({'aBirthDate': null});
                } else {
                    this.mainFormGroup.patchValue({'aBirthDate': inVal.birthDate});
                }
                if(typeof inVal.authorId === 'undefined') {
                    this.mainFormGroup.patchValue({'authorIdRef': null});
                } else {
                    this.mainFormGroup.patchValue({'authorIdRef': inVal.authorId});
                }
            }
        }
    }
    OnValChangedaCCountryName(inVal: any, dscrdChld: boolean): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof inVal === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (inVal === null);
            if (hasNoVal) { 
                dscrdChld = true; 
            }
            this.aCCountryNameBttnDsnbl = false;
            let isDsbl: boolean = false;
            isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'authorIdRef');
            this.aCCountryNameBttnDsnbl =  isDsbl;
            if (hasNoVal) { 
                this.mainFormGroup.patchValue({'aCCountryName': null});
            } else {
                if(typeof inVal.countryName === 'undefined') {
                    this.mainFormGroup.patchValue({'aCCountryName': null});
                } else {
                    this.mainFormGroup.patchValue({'aCCountryName': inVal.countryName});
                }
            }
            if(dscrdChld) {
                this.aLastNameCmbCntrl.patchValue(null, {emitEvent: false});
                this.aLastNameCmbCntrlVals=[];
                this.OnValChangedaLastName(null, dscrdChld);
            } else {
                this.OnValChangedaLastName(this.aLastNameCmbCntrl.value, dscrdChld);                
            }
            this.OnUpdateaLastNameCmbCntrlVals();
        }
    }
    OnValChangedgGenreName(inVal: any, dscrdChld: boolean): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof inVal === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (inVal === null);
            if (hasNoVal) { 
                dscrdChld = true; 
            }
            this.gGenreNameCmbCntrl.enable( {emitEvent: false} );
            let isDsbl: boolean = false;
            isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'genreIdRef');
            if(isDsbl) {
                this.gGenreNameCmbCntrl.disable( {emitEvent: false} );
            } else {
                this.gGenreNameCmbCntrl.enable( {emitEvent: false} );
            }
            if (hasNoVal) { 
                this.mainFormGroup.patchValue({'gGenreName': null});
                this.mainFormGroup.patchValue({'genreIdRef': null});
            } else {
                if(typeof inVal.genreName === 'undefined') {
                    this.mainFormGroup.patchValue({'gGenreName': null});
                } else {
                    this.mainFormGroup.patchValue({'gGenreName': inVal.genreName});
                }
                if(typeof inVal.genreId === 'undefined') {
                    this.mainFormGroup.patchValue({'genreIdRef': null});
                } else {
                    this.mainFormGroup.patchValue({'genreIdRef': inVal.genreId});
                }
            }
        }
    }
    OnValChangeddDialectName(inVal: any, dscrdChld: boolean): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof inVal === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (inVal === null);
            if (hasNoVal) { 
                dscrdChld = true; 
            }
            let isDsbl: boolean = false;
            isDsbl = isDsbl ? isDsbl : (typeof this.dCCountryNameBttnItm === 'undefined') ;
            isDsbl = isDsbl ? isDsbl : (this.dCCountryNameBttnItm === null);
            if(!isDsbl) {
                isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'dialectIdRef');
            }
            if(isDsbl) {
                this.dDialectNameCmbCntrl.disable( {emitEvent: false} );
            } else {
                this.dDialectNameCmbCntrl.enable( {emitEvent: false} );
            }
            if (hasNoVal) { 
                this.mainFormGroup.patchValue({'dDialectName': null});
                this.mainFormGroup.patchValue({'dialectIdRef': null});
            } else {
                if(typeof inVal.dialectName === 'undefined') {
                    this.mainFormGroup.patchValue({'dDialectName': null});
                } else {
                    this.mainFormGroup.patchValue({'dDialectName': inVal.dialectName});
                }
                if(typeof inVal.dialectId === 'undefined') {
                    this.mainFormGroup.patchValue({'dialectIdRef': null});
                } else {
                    this.mainFormGroup.patchValue({'dialectIdRef': inVal.dialectId});
                }
            }
        }
    }
    OnValChangeddCCountryName(inVal: any, dscrdChld: boolean): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof inVal === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (inVal === null);
            if (hasNoVal) { 
                dscrdChld = true; 
            }
            this.dCCountryNameBttnDsnbl = false;
            let isDsbl: boolean = false;
            isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'dialectIdRef');
            this.dCCountryNameBttnDsnbl =  isDsbl;
            if (hasNoVal) { 
                this.mainFormGroup.patchValue({'dCCountryName': null});
            } else {
                if(typeof inVal.countryName === 'undefined') {
                    this.mainFormGroup.patchValue({'dCCountryName': null});
                } else {
                    this.mainFormGroup.patchValue({'dCCountryName': inVal.countryName});
                }
            }
            if(dscrdChld) {
                this.dDialectNameCmbCntrl.patchValue(null, {emitEvent: false});
                this.dDialectNameCmbCntrlVals=[];
                this.OnValChangeddDialectName(null, dscrdChld);
            } else {
                this.OnValChangeddDialectName(this.dDialectNameCmbCntrl.value, dscrdChld);                
            }
            this.OnUpdatedDialectNameCmbCntrlVals();
        }
    }



    aCCountryNameSrchClck(): void {
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
            let w: string = this.appGlblSettings.getDialogWidth('LitManuscriptView');
            let mw: string = this.appGlblSettings.getDialogMaxWidth('LitManuscriptView');
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
                                    this.aCCountryNameBttnItm = rslt.selectedItems[0];
                                    this.OnValChangedaCCountryName(rslt.selectedItems[0], true);
                                }
                            }
                        }
                    }
                }
            });
        }
    }


    dCCountryNameSrchClck(): void {
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
            let w: string = this.appGlblSettings.getDialogWidth('LitManuscriptView');
            let mw: string = this.appGlblSettings.getDialogMaxWidth('LitManuscriptView');
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
                                    this.dCCountryNameBttnItm = rslt.selectedItems[0];
                                    this.OnValChangeddCCountryName(rslt.selectedItems[0], true);
                                }
                            }
                        }
                    }
                }
            });
        }
    }




    @Output('before-submit') beforeSubmit = new EventEmitter();
    @Output('after-submit') afterSubmit = new EventEmitter<ILitManuscriptView>();

    doSubmit() {
        if(typeof this.mainFormGroup === 'undefined') return;
        if(this.mainFormGroup === null) return;
        if (this.mainFormGroup.invalid) {
            this.mainFormGroup.markAllAsTouched();
            if (this.eformMode === EformMode.AddMode) { 
                this.aLastNameCmbCntrl.markAllAsTouched();
                this.gGenreNameCmbCntrl.markAllAsTouched();
                this.dDialectNameCmbCntrl.markAllAsTouched();
            }
            if (this.eformMode === EformMode.UpdateMode) { 
                this.aLastNameCmbCntrl.markAllAsTouched();
                this.gGenreNameCmbCntrl.markAllAsTouched();
                this.dDialectNameCmbCntrl.markAllAsTouched();
            }
            if (this.eformMode === EformMode.DeleteMode) { 
            }
            return;
        }
        this.beforeSubmit.emit(this.mainFormGroup.value);

        if (this.eformMode === EformMode.AddMode) { 
            this.frmSrvLitManuscriptView.addone(this.mainFormGroup.getRawValue())
            .subscribe(
                (respdata: ILitManuscriptView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );
        } else if (this.eformMode === EformMode.UpdateMode) { 
            this.frmSrvLitManuscriptView.updateone(this.mainFormGroup.getRawValue())
            .subscribe(
                (respdata: ILitManuscriptView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );

        } else if (this.eformMode === EformMode.DeleteMode) { 
            this.frmSrvLitManuscriptView.deleteone(  this.mainFormGroup.controls['manuscriptId'].value )
            .subscribe(
                (respdata: ILitManuscriptView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );
        }
    }

} // the end of the LitManuscriptViewEformComponent class body



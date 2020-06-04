
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

import { ILitEditionView } from './../../lit-edition-view/interfaces/lit-edition-view.interface';
import { ILitEditionViewPage } from './../../lit-edition-view/interfaces/lit-edition-view-page.interface';
import { ILitEditionViewFilter } from './../../lit-edition-view/interfaces/lit-edition-view-filter.interface';
import { LitEditionViewService } from './../../../services/lit-edition-view/lit-edition-view.service';
import { ILitPublisherView } from './../../lit-publisher-view/interfaces/lit-publisher-view.interface';
import { ILitPublisherViewPage } from './../../lit-publisher-view/interfaces/lit-publisher-view-page.interface';
import { ILitPublisherViewFilter } from './../../lit-publisher-view/interfaces/lit-publisher-view-filter.interface';
import { LitPublisherViewService } from './../../../services/lit-publisher-view/lit-publisher-view.service';
import { ILitCountryView } from './../../lit-country-view/interfaces/lit-country-view.interface';
import { ILitCountryViewPage } from './../../lit-country-view/interfaces/lit-country-view-page.interface';
import { ILitCountryViewFilter } from './../../lit-country-view/interfaces/lit-country-view-filter.interface';
import { LitCountryViewService } from './../../../services/lit-country-view/lit-country-view.service';
import { ILitManuscriptView } from './../../lit-manuscript-view/interfaces/lit-manuscript-view.interface';
import { ILitManuscriptViewPage } from './../../lit-manuscript-view/interfaces/lit-manuscript-view-page.interface';
import { ILitManuscriptViewFilter } from './../../lit-manuscript-view/interfaces/lit-manuscript-view-filter.interface';
import { LitManuscriptViewService } from './../../../services/lit-manuscript-view/lit-manuscript-view.service';
import { ILitAuthorView } from './../../lit-author-view/interfaces/lit-author-view.interface';
import { ILitAuthorViewPage } from './../../lit-author-view/interfaces/lit-author-view-page.interface';
import { ILitAuthorViewFilter } from './../../lit-author-view/interfaces/lit-author-view-filter.interface';
import { LitAuthorViewService } from './../../../services/lit-author-view/lit-author-view.service';
import { ILitGenreView } from './../../lit-genre-view/interfaces/lit-genre-view.interface';
import { ILitGenreViewPage } from './../../lit-genre-view/interfaces/lit-genre-view-page.interface';
import { ILitGenreViewFilter } from './../../lit-genre-view/interfaces/lit-genre-view-filter.interface';
import { LitGenreViewService } from './../../../services/lit-genre-view/lit-genre-view.service';
import { ILitDialectView } from './../../lit-dialect-view/interfaces/lit-dialect-view.interface';
import { ILitDialectViewPage } from './../../lit-dialect-view/interfaces/lit-dialect-view-page.interface';
import { ILitDialectViewFilter } from './../../lit-dialect-view/interfaces/lit-dialect-view-filter.interface';
import { LitDialectViewService } from './../../../services/lit-dialect-view/lit-dialect-view.service';
import { ILitBookView } from './../interfaces/lit-book-view.interface';
import { ILitBookViewPage } from './../interfaces/lit-book-view-page.interface';
import { ILitBookViewFilter } from './../interfaces/lit-book-view-filter.interface';
import { LitBookViewService } from './../../../services/lit-book-view/lit-book-view.service';
import { LitCountryViewSdlgComponent } from './../../lit-country-view/sdlg/lit-country-view-sdlg.component';
import { ILitCountryViewDlg } from './../../lit-country-view/sdlg/lit-country-view-dlg.interface';

@Component({
  selector: 'app-lit-book-view-eform',
  templateUrl: './lit-book-view-eform.component.html',
  styleUrls: ['./lit-book-view-eform.component.css']
})
export class LitBookViewEformComponent implements OnInit, IEventEmitterPub {
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
    public eEditionNameCmbCntrl: FormControl = null;
    public eEditionNameCmbCntrlVals : Array<ILitEditionView> | null = null;
    public pPublisherNameCmbCntrl: FormControl = null;
    public pPublisherNameCmbCntrlVals : Array<ILitPublisherView> | null = null;
    public pCCountryNameBttnItm: ILitCountryView | null = null;
    public pCCountryNameBttnDsnbl: boolean = true;

    public mManuscriptTitleCmbCntrl: FormControl = null;
    public mManuscriptTitleCmbCntrlVals : Array<ILitManuscriptView> | null = null;
    public mALastNameCmbCntrl: FormControl = null;
    public mALastNameCmbCntrlVals : Array<ILitAuthorView> | null = null;
    public mACCountryNameBttnItm: ILitCountryView | null = null;
    public mACCountryNameBttnDsnbl: boolean = true;

    public mGGenreNameCmbCntrl: FormControl = null;
    public mGGenreNameCmbCntrlVals : Array<ILitGenreView> | null = null;
    public mDDialectNameCmbCntrl: FormControl = null;
    public mDDialectNameCmbCntrlVals : Array<ILitDialectView> | null = null;
    public mDCCountryNameBttnItm: ILitCountryView | null = null;
    public mDCCountryNameBttnDsnbl: boolean = true;

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
    protected _eformControlModel: ILitBookView | null = null;
    @Input('eform-control-model') 
        set eformControlModel (inFormControlModel : ILitBookView) {
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
        get eformControlModel(): ILitBookView {
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
            if(!this.DefCntrlByHddn('bookId')) { this.DefCntrlByModel('bookId'); }
            if(!this.DefCntrlByHddn('bookTitle')) { this.DefCntrlByModel('bookTitle'); }
            if(!this.DefCntrlByHddn('publicationDate')) { this.DefCntrlByModel('publicationDate'); }
            if(!this.DefCntrlByHddn('price')) { this.DefCntrlByModel('price'); }
            if(!this.DefCntrlByHddn('eEditionName')) { this.DefCntrlByModel('eEditionName'); }
            if(!this.DefCntrlByHddn('publisherIdRef')) { this.DefCntrlByModel('publisherIdRef'); }
            if(!this.DefCntrlByHddn('manuscriptIdRef')) { this.DefCntrlByModel('manuscriptIdRef'); }
            if(!this.DefCntrlByHddn('editionIdRef')) { this.DefCntrlByModel('editionIdRef'); }
            if(!this.DefCntrlByHddn('pPublisherName')) { this.DefCntrlByModel('pPublisherName'); }
            if(!this.DefCntrlByHddn('pCCountryName')) { this.DefCntrlByModel('pCCountryName'); }
            if(!this.DefCntrlByHddn('mManuscriptTitle')) { this.DefCntrlByModel('mManuscriptTitle'); }
            if(!this.DefCntrlByHddn('mCompletionDate')) { this.DefCntrlByModel('mCompletionDate'); }
            if(!this.DefCntrlByHddn('mAFirstName')) { this.DefCntrlByModel('mAFirstName'); }
            if(!this.DefCntrlByHddn('mALastName')) { this.DefCntrlByModel('mALastName'); }
            if(!this.DefCntrlByHddn('mABirthDate')) { this.DefCntrlByModel('mABirthDate'); }
            if(!this.DefCntrlByHddn('mACCountryName')) { this.DefCntrlByModel('mACCountryName'); }
            if(!this.DefCntrlByHddn('mGGenreName')) { this.DefCntrlByModel('mGGenreName'); }
            if(!this.DefCntrlByHddn('mDDialectName')) { this.DefCntrlByModel('mDDialectName'); }
            if(!this.DefCntrlByHddn('mDCCountryName')) { this.DefCntrlByModel('mDCCountryName'); }
        } else {
            if(!this.DefCntrlByHddn('bookId') ) { this.mainFormGroup.patchValue({'bookId': null}); };
            if(!this.DefCntrlByHddn('bookTitle') ) { this.mainFormGroup.patchValue({'bookTitle': null}); };
            if(!this.DefCntrlByHddn('publicationDate') ) { this.mainFormGroup.patchValue({'publicationDate': null}); };
            if(!this.DefCntrlByHddn('price') ) { this.mainFormGroup.patchValue({'price': null}); };
            if(!this.DefCntrlByHddn('eEditionName') ) { this.mainFormGroup.patchValue({'eEditionName': null}); };
            if(!this.DefCntrlByHddn('publisherIdRef') ) { this.mainFormGroup.patchValue({'publisherIdRef': null}); };
            if(!this.DefCntrlByHddn('manuscriptIdRef') ) { this.mainFormGroup.patchValue({'manuscriptIdRef': null}); };
            if(!this.DefCntrlByHddn('editionIdRef') ) { this.mainFormGroup.patchValue({'editionIdRef': null}); };
            if(!this.DefCntrlByHddn('pPublisherName') ) { this.mainFormGroup.patchValue({'pPublisherName': null}); };
            if(!this.DefCntrlByHddn('pCCountryName') ) { this.mainFormGroup.patchValue({'pCCountryName': null}); };
            if(!this.DefCntrlByHddn('mManuscriptTitle') ) { this.mainFormGroup.patchValue({'mManuscriptTitle': null}); };
            if(!this.DefCntrlByHddn('mCompletionDate') ) { this.mainFormGroup.patchValue({'mCompletionDate': null}); };
            if(!this.DefCntrlByHddn('mAFirstName') ) { this.mainFormGroup.patchValue({'mAFirstName': null}); };
            if(!this.DefCntrlByHddn('mALastName') ) { this.mainFormGroup.patchValue({'mALastName': null}); };
            if(!this.DefCntrlByHddn('mABirthDate') ) { this.mainFormGroup.patchValue({'mABirthDate': null}); };
            if(!this.DefCntrlByHddn('mACCountryName') ) { this.mainFormGroup.patchValue({'mACCountryName': null}); };
            if(!this.DefCntrlByHddn('mGGenreName') ) { this.mainFormGroup.patchValue({'mGGenreName': null}); };
            if(!this.DefCntrlByHddn('mDDialectName') ) { this.mainFormGroup.patchValue({'mDDialectName': null}); };
            if(!this.DefCntrlByHddn('mDCCountryName') ) { this.mainFormGroup.patchValue({'mDCCountryName': null}); };
        }
    }



    constructor(private frmSrvLitEditionView: LitEditionViewService, private frmSrvLitPublisherView: LitPublisherViewService, private frmSrvLitCountryView: LitCountryViewService, private frmSrvLitManuscriptView: LitManuscriptViewService, private frmSrvLitAuthorView: LitAuthorViewService, private frmSrvLitGenreView: LitGenreViewService, private frmSrvLitDialectView: LitDialectViewService, private frmSrvLitBookView: LitBookViewService, public dialog: MatDialog, protected appGlblSettings: AppGlblSettingsService ) {
        this.appearance = this.appGlblSettings.appearance;
        this.mainFormGroup =  new FormGroup({});
        let locValidators: ValidatorFn[]; 
        locValidators = [ ];
        this.mainFormGroup.addControl('bookId', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(55),Validators.minLength(3) ];
        this.mainFormGroup.addControl('bookTitle', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required ];
        this.mainFormGroup.addControl('publicationDate', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/) ];
        this.mainFormGroup.addControl('price', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.maxLength(40),Validators.minLength(3) ];
        this.mainFormGroup.addControl('eEditionName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('publisherIdRef', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('manuscriptIdRef', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('editionIdRef', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(40),Validators.minLength(3) ];
        this.mainFormGroup.addControl('pPublisherName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(40),Validators.minLength(3) ];
        this.mainFormGroup.addControl('pCCountryName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(60),Validators.minLength(3) ];
        this.mainFormGroup.addControl('mManuscriptTitle', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required ];
        this.mainFormGroup.addControl('mCompletionDate', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(16),Validators.minLength(3) ];
        this.mainFormGroup.addControl('mAFirstName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(30),Validators.minLength(3) ];
        this.mainFormGroup.addControl('mALastName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [  ];
        this.mainFormGroup.addControl('mABirthDate', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(40),Validators.minLength(3) ];
        this.mainFormGroup.addControl('mACCountryName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(20),Validators.minLength(3) ];
        this.mainFormGroup.addControl('mGGenreName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(52),Validators.minLength(2) ];
        this.mainFormGroup.addControl('mDDialectName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(40),Validators.minLength(3) ];
        this.mainFormGroup.addControl('mDCCountryName', new FormControl({ value: null, disabled: true}, locValidators));
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
            this.mainFormGroup.controls['bookId'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['bookTitle'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['publicationDate'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['price'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['eEditionName'].enable( {emitEvent: false} );
            this.eEditionNameCmbCntrl = new FormControl({ value: null, disabled: true }, [ 
                (fc)=>{  if ((typeof fc.value === 'string') || (typeof fc.value === 'undefined') || (fc.value === null)) { 
                            this.mainFormGroup.patchValue({'eEditionName': null });
                            return  this.mainFormGroup.controls['eEditionName'].errors; }  
                        return null; }]);
                                
            this.eEditionNameCmbCntrl.valueChanges.subscribe(val => this.OnValChangedeEditionName(val, true));
            this.mainFormGroup.controls['pPublisherName'].enable( {emitEvent: false} );
            this.pPublisherNameCmbCntrl = new FormControl({ value: null, disabled: true }, [ 
                (fc)=>{  if ((typeof fc.value === 'string') || (typeof fc.value === 'undefined') || (fc.value === null)) { 
                            this.mainFormGroup.patchValue({'pPublisherName': null });
                            return  this.mainFormGroup.controls['pPublisherName'].errors; }  
                        return null; }]);
                                
            this.pPublisherNameCmbCntrl.valueChanges.subscribe(val => this.OnValChangedpPublisherName(val, true));
            this.mainFormGroup.controls['pCCountryName'].enable( {emitEvent: false} ); 
            this.mainFormGroup.controls['mManuscriptTitle'].enable( {emitEvent: false} );
            this.mManuscriptTitleCmbCntrl = new FormControl({ value: null, disabled: true }, [ 
                (fc)=>{  if ((typeof fc.value === 'string') || (typeof fc.value === 'undefined') || (fc.value === null)) { 
                            this.mainFormGroup.patchValue({'mManuscriptTitle': null });
                            return  this.mainFormGroup.controls['mManuscriptTitle'].errors; }  
                        return null; }]);
                                
            this.mManuscriptTitleCmbCntrl.valueChanges.subscribe(val => this.OnValChangedmManuscriptTitle(val, true));
            this.mainFormGroup.controls['mCompletionDate'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mAFirstName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mALastName'].enable( {emitEvent: false} );
            this.mALastNameCmbCntrl = new FormControl({ value: null, disabled: true }, [ 
                (fc)=>{  if ((typeof fc.value === 'string') || (typeof fc.value === 'undefined') || (fc.value === null)) { 
                            this.mainFormGroup.patchValue({'mALastName': null });
                            return  this.mainFormGroup.controls['mALastName'].errors; }  
                        return null; }]);
                                
            this.mALastNameCmbCntrl.valueChanges.subscribe(val => this.OnValChangedmALastName(val, true));
            this.mainFormGroup.controls['mABirthDate'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mACCountryName'].enable( {emitEvent: false} ); 
            this.mainFormGroup.controls['mGGenreName'].enable( {emitEvent: false} );
            this.mGGenreNameCmbCntrl = new FormControl({ value: null, disabled: true }, [ 
                (fc)=>{  if ((typeof fc.value === 'string') || (typeof fc.value === 'undefined') || (fc.value === null)) { 
                            this.mainFormGroup.patchValue({'mGGenreName': null });
                            return  this.mainFormGroup.controls['mGGenreName'].errors; }  
                        return null; }]);
                                
            this.mGGenreNameCmbCntrl.valueChanges.subscribe(val => this.OnValChangedmGGenreName(val, true));
            this.mainFormGroup.controls['mDDialectName'].enable( {emitEvent: false} );
            this.mDDialectNameCmbCntrl = new FormControl({ value: null, disabled: true }, [ 
                (fc)=>{  if ((typeof fc.value === 'string') || (typeof fc.value === 'undefined') || (fc.value === null)) { 
                            this.mainFormGroup.patchValue({'mDDialectName': null });
                            return  this.mainFormGroup.controls['mDDialectName'].errors; }  
                        return null; }]);
                                
            this.mDDialectNameCmbCntrl.valueChanges.subscribe(val => this.OnValChangedmDDialectName(val, true));
            this.mainFormGroup.controls['mDCCountryName'].enable( {emitEvent: false} ); 
        } 
        if (this.eformMode === EformMode.DeleteMode) {
            this.mainFormGroup.controls['bookId'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['bookTitle'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['publicationDate'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['price'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['eEditionName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['pPublisherName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['pCCountryName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mManuscriptTitle'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mCompletionDate'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mAFirstName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mALastName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mABirthDate'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mACCountryName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mGGenreName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mDDialectName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mDCCountryName'].enable( {emitEvent: false} );
        } 
    } // end of EformMode

    DoClearControls(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            this.eEditionNameCmbCntrl.patchValue(null, {emitEvent: false});
            this.eEditionNameCmbCntrl.disable( {emitEvent: false} );
            this.eEditionNameCmbCntrlVals = null;
            this.pPublisherNameCmbCntrl.patchValue(null, {emitEvent: false});
            this.pPublisherNameCmbCntrl.disable( {emitEvent: false} );
            this.pPublisherNameCmbCntrlVals = null;
            this.pCCountryNameBttnItm = null;
            this.pCCountryNameBttnDsnbl = true;
            this.mManuscriptTitleCmbCntrl.patchValue(null, {emitEvent: false});
            this.mManuscriptTitleCmbCntrl.disable( {emitEvent: false} );
            this.mManuscriptTitleCmbCntrlVals = null;
            this.mALastNameCmbCntrl.patchValue(null, {emitEvent: false});
            this.mALastNameCmbCntrl.disable( {emitEvent: false} );
            this.mALastNameCmbCntrlVals = null;
            this.mACCountryNameBttnItm = null;
            this.mACCountryNameBttnDsnbl = true;
            this.mGGenreNameCmbCntrl.patchValue(null, {emitEvent: false});
            this.mGGenreNameCmbCntrl.disable( {emitEvent: false} );
            this.mGGenreNameCmbCntrlVals = null;
            this.mDDialectNameCmbCntrl.patchValue(null, {emitEvent: false});
            this.mDDialectNameCmbCntrl.disable( {emitEvent: false} );
            this.mDDialectNameCmbCntrlVals = null;
            this.mDCCountryNameBttnItm = null;
            this.mDCCountryNameBttnDsnbl = true;
        } 
        else if (this.eformMode === EformMode.DeleteMode) {
        } 
    }


//
// TODO: check if DoInit()-method is required
//
    DoInit() {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            this.OnIniteEditionName();
            this.OnInitpPublisherName();
            this.OnInitmManuscriptTitle();
        }
    } // DoInit() 

    OnIniteEditionName(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let pkpEditionId: any = null;
            if(!(typeof this.mainFormGroup.controls['editionIdRef'].value === 'undefined')) {
                if(!(this.mainFormGroup.controls['editionIdRef'].value === null)) {
                    pkpEditionId = this.mainFormGroup.controls['editionIdRef'].value;
                }
            }
            let isPkNtDf: boolean =  (typeof pkpEditionId === 'undefined')   ;
            isPkNtDf = isPkNtDf ? isPkNtDf :  (pkpEditionId === null)   ;
            if (isPkNtDf) { 
                this.OnValChangedeEditionName(null, true);
                this.OnUpdateeEditionNameCmbCntrlVals();
            } else {
                this.frmSrvLitEditionView.getone(pkpEditionId )
                .subscribe(
                    (data: ILitEditionView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.eEditionNameCmbCntrl.patchValue(data, {emitEvent: false});
                                
                            }
                        }
                        this.OnValChangedeEditionName(this.eEditionNameCmbCntrl.value, false);
                        this.OnUpdateeEditionNameCmbCntrlVals();
                    },
                    error => { // error path
                        this.OnValChangedeEditionName(null, true);
                        this.OnUpdateeEditionNameCmbCntrlVals();
                        this.appGlblSettings.showError('http', error)
                    } 
                ); // end of .subscribe
            }
        }
    }
    OnInitpPublisherName(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let pkpPublisherId: any = null;
            if(!(typeof this.mainFormGroup.controls['publisherIdRef'].value === 'undefined')) {
                if(!(this.mainFormGroup.controls['publisherIdRef'].value === null)) {
                    pkpPublisherId = this.mainFormGroup.controls['publisherIdRef'].value;
                }
            }
            let isPkNtDf: boolean =  (typeof pkpPublisherId === 'undefined')   ;
            isPkNtDf = isPkNtDf ? isPkNtDf :  (pkpPublisherId === null)   ;
            if (isPkNtDf) { 
                this.OnInitpCCountryName();
            } else {
                this.frmSrvLitPublisherView.getone(pkpPublisherId )
                .subscribe(
                    (data: ILitPublisherView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.pPublisherNameCmbCntrl.patchValue(data, {emitEvent: false});
                                
                            }
                        }
                        this.OnInitpCCountryName();
                    },
                    error => { // error path
                        this.OnInitpCCountryName();
                        this.appGlblSettings.showError('http', error)
                    } 
                ); // end of .subscribe
            }
        }
    }
    OnInitpCCountryName(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let pkpIso3: any = null;
            let pkpIso2: any = null;
            if(!(typeof this.pPublisherNameCmbCntrl.value === 'undefined')) {
                if(!(this.pPublisherNameCmbCntrl.value === null)) {
                    if(!(typeof this.pPublisherNameCmbCntrl.value.iso3CntrRef  === 'undefined')) {
                        pkpIso3 = this.pPublisherNameCmbCntrl.value.iso3CntrRef;
                    }
                }
            }
            if(!(typeof this.pPublisherNameCmbCntrl.value === 'undefined')) {
                if(!(this.pPublisherNameCmbCntrl.value === null)) {
                    if(!(typeof this.pPublisherNameCmbCntrl.value.iso2CntrRef  === 'undefined')) {
                        pkpIso2 = this.pPublisherNameCmbCntrl.value.iso2CntrRef;
                    }
                }
            }
            let isPkNtDf: boolean =  (typeof pkpIso3 === 'undefined')  ||  (typeof pkpIso2 === 'undefined')   ;
            isPkNtDf = isPkNtDf ? isPkNtDf :  (pkpIso3 === null)  ||  (pkpIso2 === null)   ;
            if (isPkNtDf) { 
                this.OnValChangedpCCountryName(null, true);
            } else {
                this.frmSrvLitCountryView.getone(pkpIso3, pkpIso2 )
                .subscribe(
                    (data: ILitCountryView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.pCCountryNameBttnItm = data;
                            }
                        }
                        this.OnValChangedpCCountryName(this.pCCountryNameBttnItm, false);
                    },
                    error => { // error path
                        this.OnValChangedpCCountryName(null, true);
                        this.appGlblSettings.showError('http', error)
                    } 
                ); // end of .subscribe
            }
        }
    }
    OnInitmManuscriptTitle(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let pkpManuscriptId: any = null;
            if(!(typeof this.mainFormGroup.controls['manuscriptIdRef'].value === 'undefined')) {
                if(!(this.mainFormGroup.controls['manuscriptIdRef'].value === null)) {
                    pkpManuscriptId = this.mainFormGroup.controls['manuscriptIdRef'].value;
                }
            }
            let isPkNtDf: boolean =  (typeof pkpManuscriptId === 'undefined')   ;
            isPkNtDf = isPkNtDf ? isPkNtDf :  (pkpManuscriptId === null)   ;
            if (isPkNtDf) { 
                this.OnInitmALastName();
                this.OnInitmGGenreName();
                this.OnInitmDDialectName();
            } else {
                this.frmSrvLitManuscriptView.getone(pkpManuscriptId )
                .subscribe(
                    (data: ILitManuscriptView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.mManuscriptTitleCmbCntrl.patchValue(data, {emitEvent: false});
                                
                            }
                        }
                        this.OnInitmALastName();
                        this.OnInitmGGenreName();
                        this.OnInitmDDialectName();
                    },
                    error => { // error path
                        this.OnInitmALastName();
                        this.OnInitmGGenreName();
                        this.OnInitmDDialectName();
                        this.appGlblSettings.showError('http', error)
                    } 
                ); // end of .subscribe
            }
        }
    }
    OnInitmALastName(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let pkpAuthorId: any = null;
            if(!(typeof this.mManuscriptTitleCmbCntrl.value === 'undefined')) {
                if(!(this.mManuscriptTitleCmbCntrl.value === null)) {
                    if(!(typeof this.mManuscriptTitleCmbCntrl.value.authorIdRef  === 'undefined')) {
                        pkpAuthorId = this.mManuscriptTitleCmbCntrl.value.authorIdRef;
                    }
                }
            }
            let isPkNtDf: boolean =  (typeof pkpAuthorId === 'undefined')   ;
            isPkNtDf = isPkNtDf ? isPkNtDf :  (pkpAuthorId === null)   ;
            if (isPkNtDf) { 
                this.OnInitmACCountryName();
            } else {
                this.frmSrvLitAuthorView.getone(pkpAuthorId )
                .subscribe(
                    (data: ILitAuthorView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.mALastNameCmbCntrl.patchValue(data, {emitEvent: false});
                                
                            }
                        }
                        this.OnInitmACCountryName();
                    },
                    error => { // error path
                        this.OnInitmACCountryName();
                        this.appGlblSettings.showError('http', error)
                    } 
                ); // end of .subscribe
            }
        }
    }
    OnInitmACCountryName(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let pkpIso3: any = null;
            let pkpIso2: any = null;
            if(!(typeof this.mALastNameCmbCntrl.value === 'undefined')) {
                if(!(this.mALastNameCmbCntrl.value === null)) {
                    if(!(typeof this.mALastNameCmbCntrl.value.iso3CntrRef  === 'undefined')) {
                        pkpIso3 = this.mALastNameCmbCntrl.value.iso3CntrRef;
                    }
                }
            }
            if(!(typeof this.mALastNameCmbCntrl.value === 'undefined')) {
                if(!(this.mALastNameCmbCntrl.value === null)) {
                    if(!(typeof this.mALastNameCmbCntrl.value.iso2CntrRef  === 'undefined')) {
                        pkpIso2 = this.mALastNameCmbCntrl.value.iso2CntrRef;
                    }
                }
            }
            let isPkNtDf: boolean =  (typeof pkpIso3 === 'undefined')  ||  (typeof pkpIso2 === 'undefined')   ;
            isPkNtDf = isPkNtDf ? isPkNtDf :  (pkpIso3 === null)  ||  (pkpIso2 === null)   ;
            if (isPkNtDf) { 
                this.OnValChangedmACCountryName(null, true);
            } else {
                this.frmSrvLitCountryView.getone(pkpIso3, pkpIso2 )
                .subscribe(
                    (data: ILitCountryView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.mACCountryNameBttnItm = data;
                            }
                        }
                        this.OnValChangedmACCountryName(this.mACCountryNameBttnItm, false);
                    },
                    error => { // error path
                        this.OnValChangedmACCountryName(null, true);
                        this.appGlblSettings.showError('http', error)
                    } 
                ); // end of .subscribe
            }
        }
    }
    OnInitmGGenreName(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let pkpGenreId: any = null;
            if(!(typeof this.mManuscriptTitleCmbCntrl.value === 'undefined')) {
                if(!(this.mManuscriptTitleCmbCntrl.value === null)) {
                    if(!(typeof this.mManuscriptTitleCmbCntrl.value.genreIdRef  === 'undefined')) {
                        pkpGenreId = this.mManuscriptTitleCmbCntrl.value.genreIdRef;
                    }
                }
            }
            let isPkNtDf: boolean =  (typeof pkpGenreId === 'undefined')   ;
            isPkNtDf = isPkNtDf ? isPkNtDf :  (pkpGenreId === null)   ;
            if (isPkNtDf) { 
                this.OnValChangedmGGenreName(null, true);
                this.OnUpdatemGGenreNameCmbCntrlVals();
            } else {
                this.frmSrvLitGenreView.getone(pkpGenreId )
                .subscribe(
                    (data: ILitGenreView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.mGGenreNameCmbCntrl.patchValue(data, {emitEvent: false});
                                
                            }
                        }
                        this.OnValChangedmGGenreName(this.mGGenreNameCmbCntrl.value, false);
                        this.OnUpdatemGGenreNameCmbCntrlVals();
                    },
                    error => { // error path
                        this.OnValChangedmGGenreName(null, true);
                        this.OnUpdatemGGenreNameCmbCntrlVals();
                        this.appGlblSettings.showError('http', error)
                    } 
                ); // end of .subscribe
            }
        }
    }
    OnInitmDDialectName(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let pkpDialectId: any = null;
            if(!(typeof this.mManuscriptTitleCmbCntrl.value === 'undefined')) {
                if(!(this.mManuscriptTitleCmbCntrl.value === null)) {
                    if(!(typeof this.mManuscriptTitleCmbCntrl.value.dialectIdRef  === 'undefined')) {
                        pkpDialectId = this.mManuscriptTitleCmbCntrl.value.dialectIdRef;
                    }
                }
            }
            let isPkNtDf: boolean =  (typeof pkpDialectId === 'undefined')   ;
            isPkNtDf = isPkNtDf ? isPkNtDf :  (pkpDialectId === null)   ;
            if (isPkNtDf) { 
                this.OnInitmDCCountryName();
            } else {
                this.frmSrvLitDialectView.getone(pkpDialectId )
                .subscribe(
                    (data: ILitDialectView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.mDDialectNameCmbCntrl.patchValue(data, {emitEvent: false});
                                
                            }
                        }
                        this.OnInitmDCCountryName();
                    },
                    error => { // error path
                        this.OnInitmDCCountryName();
                        this.appGlblSettings.showError('http', error)
                    } 
                ); // end of .subscribe
            }
        }
    }
    OnInitmDCCountryName(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let pkpIso3: any = null;
            let pkpIso2: any = null;
            if(!(typeof this.mDDialectNameCmbCntrl.value === 'undefined')) {
                if(!(this.mDDialectNameCmbCntrl.value === null)) {
                    if(!(typeof this.mDDialectNameCmbCntrl.value.iso3CntrRef  === 'undefined')) {
                        pkpIso3 = this.mDDialectNameCmbCntrl.value.iso3CntrRef;
                    }
                }
            }
            if(!(typeof this.mDDialectNameCmbCntrl.value === 'undefined')) {
                if(!(this.mDDialectNameCmbCntrl.value === null)) {
                    if(!(typeof this.mDDialectNameCmbCntrl.value.iso2CntrRef  === 'undefined')) {
                        pkpIso2 = this.mDDialectNameCmbCntrl.value.iso2CntrRef;
                    }
                }
            }
            let isPkNtDf: boolean =  (typeof pkpIso3 === 'undefined')  ||  (typeof pkpIso2 === 'undefined')   ;
            isPkNtDf = isPkNtDf ? isPkNtDf :  (pkpIso3 === null)  ||  (pkpIso2 === null)   ;
            if (isPkNtDf) { 
                this.OnValChangedmDCCountryName(null, true);
            } else {
                this.frmSrvLitCountryView.getone(pkpIso3, pkpIso2 )
                .subscribe(
                    (data: ILitCountryView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.mDCCountryNameBttnItm = data;
                            }
                        }
                        this.OnValChangedmDCCountryName(this.mDCCountryNameBttnItm, false);
                    },
                    error => { // error path
                        this.OnValChangedmDCCountryName(null, true);
                        this.appGlblSettings.showError('http', error)
                    } 
                ); // end of .subscribe
            }
        }
    }

    OnUpdateeEditionNameCmbCntrlVals(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let flt = {};
            flt['orderby']=['editionName'];
            this.frmSrvLitEditionView.getwithfilter(flt).subscribe(
                (data: ILitEditionViewPage ) => { // success path
                    this.eEditionNameCmbCntrlVals = [];
                    if (!(typeof data === 'undefined')) {
                        if (!(data === null)) {
                            if (!(typeof data.items === 'undefined')) {
                                if (Array.isArray(data.items)) {
                                    this.eEditionNameCmbCntrlVals = data.items;
                                    let lfc: any = this.eEditionNameCmbCntrl.value;
                                    if (!(typeof lfc === 'undefined')) {
                                        if (!(lfc === null)) {
                                            let ind: number = this.eEditionNameCmbCntrlVals.findIndex(e => {
                                                        return  (e.editionId === lfc.editionId) ;
                                                });                            
                                            if (ind > -1) {
                                                this.eEditionNameCmbCntrlVals.splice(ind,1,lfc);
                                            } else {
                                                this.OnValChangedeEditionName(null, true);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(this.eEditionNameCmbCntrlVals.length < 1) {
                        this.OnValChangedeEditionName(null, true);
                    }
                }, 
                error => { // error path
                    this.eEditionNameCmbCntrlVals = [];
                    this.OnValChangedeEditionName(null, true);
                    this.appGlblSettings.showError('http', error)
                } 
            );
        }
    }
    OnUpdatepPublisherNameCmbCntrlVals(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof this.pPublisherNameCmbCntrl.value === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (this.pPublisherNameCmbCntrl.value === null);
            let flt: ILitPublisherViewFilter | null = null;
            if (! hasNoVal) {
                let lfc: ILitPublisherView = this.pPublisherNameCmbCntrl.value;
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

                hasNoVal = hasNoVal ? hasNoVal : (typeof this.pCCountryNameBttnItm === 'undefined');
                hasNoVal = hasNoVal ? hasNoVal : (this.pCCountryNameBttnItm === null);
          
                if (! hasNoVal) {
                    hasNoVal = hasNoVal ? hasNoVal : (typeof this.pCCountryNameBttnItm.iso3 === 'undefined');
                    hasNoVal = hasNoVal ? hasNoVal : (this.pCCountryNameBttnItm.iso3 === null);
                    hasNoVal = hasNoVal ? hasNoVal : (typeof this.pCCountryNameBttnItm.iso2 === 'undefined');
                    hasNoVal = hasNoVal ? hasNoVal : (this.pCCountryNameBttnItm.iso2 === null);
                }
                if (!hasNoVal) {
                    flt = {};
                    flt['iso3CntrRef'] = [this.pCCountryNameBttnItm.iso3];
                    flt['iso2CntrRef'] = [this.pCCountryNameBttnItm.iso2];
                }
            }
            if (!hasNoVal) {
                    flt['orderby']=['publisherName'];
                    this.frmSrvLitPublisherView.getwithfilter(flt).subscribe(
                        (data: ILitPublisherViewPage ) => { // success path
                            this.pPublisherNameCmbCntrlVals = [];
                            if (!(typeof data === 'undefined')) {
                                if (!(data === null)) {
                                    if (!(typeof data.items === 'undefined')) {
                                        if (Array.isArray(data.items)) {
                                            this.pPublisherNameCmbCntrlVals = data.items;
                                            let lfc: any = this.pPublisherNameCmbCntrl.value;
                                            if (!(typeof lfc === 'undefined')) {
                                                if (!(lfc === null)) {
                                                    let ind: number = this.pPublisherNameCmbCntrlVals.findIndex(e => {
                                                                return  (e.publisherId === lfc.publisherId) ;
                                                        });                            
                                                    if (ind > -1) {
                                                        this.pPublisherNameCmbCntrlVals.splice(ind,1,lfc);
                                                    } else {
                                                        this.OnValChangedpPublisherName(null, true);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if(this.pPublisherNameCmbCntrlVals.length < 1) {
                                this.OnValChangedpPublisherName(null, true);
                            }
                        }, 
                        error => { // error path
                            this.pPublisherNameCmbCntrlVals = [];
                            this.OnValChangedpPublisherName(null, true);
                            this.appGlblSettings.showError('http', error)
                        } 
                    );
            } else {
                this.pPublisherNameCmbCntrlVals = [];
                this.OnValChangedpPublisherName(null, true);
            }
        }
    }
    OnUpdatemManuscriptTitleCmbCntrlVals(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof this.mManuscriptTitleCmbCntrl.value === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (this.mManuscriptTitleCmbCntrl.value === null);
            let flt: ILitManuscriptViewFilter | null = null;
            if (! hasNoVal) {
                let lfc: ILitManuscriptView = this.mManuscriptTitleCmbCntrl.value;
                hasNoVal = hasNoVal ? hasNoVal :  ((typeof lfc.authorIdRef === 'undefined')); 
                hasNoVal = hasNoVal ? hasNoVal :  ((lfc.authorIdRef === null));                 hasNoVal = hasNoVal ? hasNoVal :  ((typeof lfc.genreIdRef === 'undefined')); 
                hasNoVal = hasNoVal ? hasNoVal :  ((lfc.genreIdRef === null));                 hasNoVal = hasNoVal ? hasNoVal :  ((typeof lfc.dialectIdRef === 'undefined')); 
                hasNoVal = hasNoVal ? hasNoVal :  ((lfc.dialectIdRef === null));                               
                if(!hasNoVal) {
                    flt={};
                    flt.authorIdRef = [lfc.authorIdRef];
                    flt.genreIdRef = [lfc.genreIdRef];
                    flt.dialectIdRef = [lfc.dialectIdRef];
                }
            }
            if (hasNoVal) {
                hasNoVal = false;

                hasNoVal = hasNoVal ? hasNoVal : (typeof this.mALastNameCmbCntrl.value === 'undefined');
                hasNoVal = hasNoVal ? hasNoVal : (this.mALastNameCmbCntrl.value === null);
          
                if (! hasNoVal) {
                    hasNoVal = hasNoVal ? hasNoVal : (typeof this.mALastNameCmbCntrl.value.authorId === 'undefined');
                    hasNoVal = hasNoVal ? hasNoVal : (this.mALastNameCmbCntrl.value.authorId === null);
                }
                hasNoVal = hasNoVal ? hasNoVal : (typeof this.mGGenreNameCmbCntrl.value === 'undefined');
                hasNoVal = hasNoVal ? hasNoVal : (this.mGGenreNameCmbCntrl.value === null);
          
                if (! hasNoVal) {
                    hasNoVal = hasNoVal ? hasNoVal : (typeof this.mGGenreNameCmbCntrl.value.genreId === 'undefined');
                    hasNoVal = hasNoVal ? hasNoVal : (this.mGGenreNameCmbCntrl.value.genreId === null);
                }
                hasNoVal = hasNoVal ? hasNoVal : (typeof this.mDDialectNameCmbCntrl.value === 'undefined');
                hasNoVal = hasNoVal ? hasNoVal : (this.mDDialectNameCmbCntrl.value === null);
          
                if (! hasNoVal) {
                    hasNoVal = hasNoVal ? hasNoVal : (typeof this.mDDialectNameCmbCntrl.value.dialectId === 'undefined');
                    hasNoVal = hasNoVal ? hasNoVal : (this.mDDialectNameCmbCntrl.value.dialectId === null);
                }
                if (!hasNoVal) {
                    flt = {};
                    flt['authorIdRef'] = [this.mALastNameCmbCntrl.value.authorId];
                    flt['genreIdRef'] = [this.mGGenreNameCmbCntrl.value.genreId];
                    flt['dialectIdRef'] = [this.mDDialectNameCmbCntrl.value.dialectId];
                }
            }
            if (!hasNoVal) {
                    flt['orderby']=['manuscriptTitle'];
                    this.frmSrvLitManuscriptView.getwithfilter(flt).subscribe(
                        (data: ILitManuscriptViewPage ) => { // success path
                            this.mManuscriptTitleCmbCntrlVals = [];
                            if (!(typeof data === 'undefined')) {
                                if (!(data === null)) {
                                    if (!(typeof data.items === 'undefined')) {
                                        if (Array.isArray(data.items)) {
                                            this.mManuscriptTitleCmbCntrlVals = data.items;
                                            let lfc: any = this.mManuscriptTitleCmbCntrl.value;
                                            if (!(typeof lfc === 'undefined')) {
                                                if (!(lfc === null)) {
                                                    let ind: number = this.mManuscriptTitleCmbCntrlVals.findIndex(e => {
                                                                return  (e.manuscriptId === lfc.manuscriptId) ;
                                                        });                            
                                                    if (ind > -1) {
                                                        this.mManuscriptTitleCmbCntrlVals.splice(ind,1,lfc);
                                                    } else {
                                                        this.OnValChangedmManuscriptTitle(null, true);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if(this.mManuscriptTitleCmbCntrlVals.length < 1) {
                                this.OnValChangedmManuscriptTitle(null, true);
                            }
                        }, 
                        error => { // error path
                            this.mManuscriptTitleCmbCntrlVals = [];
                            this.OnValChangedmManuscriptTitle(null, true);
                            this.appGlblSettings.showError('http', error)
                        } 
                    );
            } else {
                this.mManuscriptTitleCmbCntrlVals = [];
                this.OnValChangedmManuscriptTitle(null, true);
            }
        }
    }
    OnUpdatemALastNameCmbCntrlVals(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof this.mALastNameCmbCntrl.value === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (this.mALastNameCmbCntrl.value === null);
            let flt: ILitAuthorViewFilter | null = null;
            if (! hasNoVal) {
                let lfc: ILitAuthorView = this.mALastNameCmbCntrl.value;
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

                hasNoVal = hasNoVal ? hasNoVal : (typeof this.mACCountryNameBttnItm === 'undefined');
                hasNoVal = hasNoVal ? hasNoVal : (this.mACCountryNameBttnItm === null);
          
                if (! hasNoVal) {
                    hasNoVal = hasNoVal ? hasNoVal : (typeof this.mACCountryNameBttnItm.iso3 === 'undefined');
                    hasNoVal = hasNoVal ? hasNoVal : (this.mACCountryNameBttnItm.iso3 === null);
                    hasNoVal = hasNoVal ? hasNoVal : (typeof this.mACCountryNameBttnItm.iso2 === 'undefined');
                    hasNoVal = hasNoVal ? hasNoVal : (this.mACCountryNameBttnItm.iso2 === null);
                }
                if (!hasNoVal) {
                    flt = {};
                    flt['iso3CntrRef'] = [this.mACCountryNameBttnItm.iso3];
                    flt['iso2CntrRef'] = [this.mACCountryNameBttnItm.iso2];
                }
            }
            if (!hasNoVal) {
                    flt['orderby']=['lastName'];
                    this.frmSrvLitAuthorView.getwithfilter(flt).subscribe(
                        (data: ILitAuthorViewPage ) => { // success path
                            this.mALastNameCmbCntrlVals = [];
                            if (!(typeof data === 'undefined')) {
                                if (!(data === null)) {
                                    if (!(typeof data.items === 'undefined')) {
                                        if (Array.isArray(data.items)) {
                                            this.mALastNameCmbCntrlVals = data.items;
                                            let lfc: any = this.mALastNameCmbCntrl.value;
                                            if (!(typeof lfc === 'undefined')) {
                                                if (!(lfc === null)) {
                                                    let ind: number = this.mALastNameCmbCntrlVals.findIndex(e => {
                                                                return  (e.authorId === lfc.authorId) ;
                                                        });                            
                                                    if (ind > -1) {
                                                        this.mALastNameCmbCntrlVals.splice(ind,1,lfc);
                                                    } else {
                                                        this.OnValChangedmALastName(null, true);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if(this.mALastNameCmbCntrlVals.length < 1) {
                                this.OnValChangedmALastName(null, true);
                            }
                        }, 
                        error => { // error path
                            this.mALastNameCmbCntrlVals = [];
                            this.OnValChangedmALastName(null, true);
                            this.appGlblSettings.showError('http', error)
                        } 
                    );
            } else {
                this.mALastNameCmbCntrlVals = [];
                this.OnValChangedmALastName(null, true);
            }
        }
    }
    OnUpdatemGGenreNameCmbCntrlVals(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let flt = {};
            flt['orderby']=['genreName'];
            this.frmSrvLitGenreView.getwithfilter(flt).subscribe(
                (data: ILitGenreViewPage ) => { // success path
                    this.mGGenreNameCmbCntrlVals = [];
                    if (!(typeof data === 'undefined')) {
                        if (!(data === null)) {
                            if (!(typeof data.items === 'undefined')) {
                                if (Array.isArray(data.items)) {
                                    this.mGGenreNameCmbCntrlVals = data.items;
                                    let lfc: any = this.mGGenreNameCmbCntrl.value;
                                    if (!(typeof lfc === 'undefined')) {
                                        if (!(lfc === null)) {
                                            let ind: number = this.mGGenreNameCmbCntrlVals.findIndex(e => {
                                                        return  (e.genreId === lfc.genreId) ;
                                                });                            
                                            if (ind > -1) {
                                                this.mGGenreNameCmbCntrlVals.splice(ind,1,lfc);
                                            } else {
                                                this.OnValChangedmGGenreName(null, true);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(this.mGGenreNameCmbCntrlVals.length < 1) {
                        this.OnValChangedmGGenreName(null, true);
                    }
                }, 
                error => { // error path
                    this.mGGenreNameCmbCntrlVals = [];
                    this.OnValChangedmGGenreName(null, true);
                    this.appGlblSettings.showError('http', error)
                } 
            );
        }
    }
    OnUpdatemDDialectNameCmbCntrlVals(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof this.mDDialectNameCmbCntrl.value === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (this.mDDialectNameCmbCntrl.value === null);
            let flt: ILitDialectViewFilter | null = null;
            if (! hasNoVal) {
                let lfc: ILitDialectView = this.mDDialectNameCmbCntrl.value;
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

                hasNoVal = hasNoVal ? hasNoVal : (typeof this.mDCCountryNameBttnItm === 'undefined');
                hasNoVal = hasNoVal ? hasNoVal : (this.mDCCountryNameBttnItm === null);
          
                if (! hasNoVal) {
                    hasNoVal = hasNoVal ? hasNoVal : (typeof this.mDCCountryNameBttnItm.iso3 === 'undefined');
                    hasNoVal = hasNoVal ? hasNoVal : (this.mDCCountryNameBttnItm.iso3 === null);
                    hasNoVal = hasNoVal ? hasNoVal : (typeof this.mDCCountryNameBttnItm.iso2 === 'undefined');
                    hasNoVal = hasNoVal ? hasNoVal : (this.mDCCountryNameBttnItm.iso2 === null);
                }
                if (!hasNoVal) {
                    flt = {};
                    flt['iso3CntrRef'] = [this.mDCCountryNameBttnItm.iso3];
                    flt['iso2CntrRef'] = [this.mDCCountryNameBttnItm.iso2];
                }
            }
            if (!hasNoVal) {
                    flt['orderby']=['dialectName'];
                    this.frmSrvLitDialectView.getwithfilter(flt).subscribe(
                        (data: ILitDialectViewPage ) => { // success path
                            this.mDDialectNameCmbCntrlVals = [];
                            if (!(typeof data === 'undefined')) {
                                if (!(data === null)) {
                                    if (!(typeof data.items === 'undefined')) {
                                        if (Array.isArray(data.items)) {
                                            this.mDDialectNameCmbCntrlVals = data.items;
                                            let lfc: any = this.mDDialectNameCmbCntrl.value;
                                            if (!(typeof lfc === 'undefined')) {
                                                if (!(lfc === null)) {
                                                    let ind: number = this.mDDialectNameCmbCntrlVals.findIndex(e => {
                                                                return  (e.dialectId === lfc.dialectId) ;
                                                        });                            
                                                    if (ind > -1) {
                                                        this.mDDialectNameCmbCntrlVals.splice(ind,1,lfc);
                                                    } else {
                                                        this.OnValChangedmDDialectName(null, true);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if(this.mDDialectNameCmbCntrlVals.length < 1) {
                                this.OnValChangedmDDialectName(null, true);
                            }
                        }, 
                        error => { // error path
                            this.mDDialectNameCmbCntrlVals = [];
                            this.OnValChangedmDDialectName(null, true);
                            this.appGlblSettings.showError('http', error)
                        } 
                    );
            } else {
                this.mDDialectNameCmbCntrlVals = [];
                this.OnValChangedmDDialectName(null, true);
            }
        }
    }


    OnValChangedeEditionName(inVal: any, dscrdChld: boolean): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof inVal === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (inVal === null);
            if (hasNoVal) { 
                dscrdChld = true; 
            }
            this.eEditionNameCmbCntrl.enable( {emitEvent: false} );
            let isDsbl: boolean = false;
            isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'editionIdRef');
            if(isDsbl) {
                this.eEditionNameCmbCntrl.disable( {emitEvent: false} );
            } else {
                this.eEditionNameCmbCntrl.enable( {emitEvent: false} );
            }
            if (hasNoVal) { 
                this.mainFormGroup.patchValue({'eEditionName': null});
                this.mainFormGroup.patchValue({'editionIdRef': null});
            } else {
                if(typeof inVal.editionName === 'undefined') {
                    this.mainFormGroup.patchValue({'eEditionName': null});
                } else {
                    this.mainFormGroup.patchValue({'eEditionName': inVal.editionName});
                }
                if(typeof inVal.editionId === 'undefined') {
                    this.mainFormGroup.patchValue({'editionIdRef': null});
                } else {
                    this.mainFormGroup.patchValue({'editionIdRef': inVal.editionId});
                }
            }
        }
    }
    OnValChangedpPublisherName(inVal: any, dscrdChld: boolean): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof inVal === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (inVal === null);
            if (hasNoVal) { 
                dscrdChld = true; 
            }
            let isDsbl: boolean = false;
            isDsbl = isDsbl ? isDsbl : (typeof this.pCCountryNameBttnItm === 'undefined') ;
            isDsbl = isDsbl ? isDsbl : (this.pCCountryNameBttnItm === null);
            if(!isDsbl) {
                isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'publisherIdRef');
            }
            if(isDsbl) {
                this.pPublisherNameCmbCntrl.disable( {emitEvent: false} );
            } else {
                this.pPublisherNameCmbCntrl.enable( {emitEvent: false} );
            }
            if (hasNoVal) { 
                this.mainFormGroup.patchValue({'pPublisherName': null});
                this.mainFormGroup.patchValue({'publisherIdRef': null});
            } else {
                if(typeof inVal.publisherName === 'undefined') {
                    this.mainFormGroup.patchValue({'pPublisherName': null});
                } else {
                    this.mainFormGroup.patchValue({'pPublisherName': inVal.publisherName});
                }
                if(typeof inVal.publisherId === 'undefined') {
                    this.mainFormGroup.patchValue({'publisherIdRef': null});
                } else {
                    this.mainFormGroup.patchValue({'publisherIdRef': inVal.publisherId});
                }
            }
        }
    }
    OnValChangedpCCountryName(inVal: any, dscrdChld: boolean): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof inVal === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (inVal === null);
            if (hasNoVal) { 
                dscrdChld = true; 
            }
            this.pCCountryNameBttnDsnbl = false;
            let isDsbl: boolean = false;
            isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'publisherIdRef');
            this.pCCountryNameBttnDsnbl =  isDsbl;
            if (hasNoVal) { 
                this.mainFormGroup.patchValue({'pCCountryName': null});
            } else {
                if(typeof inVal.countryName === 'undefined') {
                    this.mainFormGroup.patchValue({'pCCountryName': null});
                } else {
                    this.mainFormGroup.patchValue({'pCCountryName': inVal.countryName});
                }
            }
            if(dscrdChld) {
                this.pPublisherNameCmbCntrl.patchValue(null, {emitEvent: false});
                this.pPublisherNameCmbCntrlVals=[];
                this.OnValChangedpPublisherName(null, dscrdChld);
            } else {
                this.OnValChangedpPublisherName(this.pPublisherNameCmbCntrl.value, dscrdChld);                
            }
            this.OnUpdatepPublisherNameCmbCntrlVals();
        }
    }
    OnValChangedmManuscriptTitle(inVal: any, dscrdChld: boolean): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof inVal === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (inVal === null);
            if (hasNoVal) { 
                dscrdChld = true; 
            }
            let isDsbl: boolean = false;
            isDsbl = isDsbl ? isDsbl : (typeof this.mALastNameCmbCntrl.value === 'undefined');
            isDsbl = isDsbl ? isDsbl : (this.mALastNameCmbCntrl.value === null);
            isDsbl = isDsbl ? isDsbl : (typeof this.mGGenreNameCmbCntrl.value === 'undefined');
            isDsbl = isDsbl ? isDsbl : (this.mGGenreNameCmbCntrl.value === null);
            isDsbl = isDsbl ? isDsbl : (typeof this.mDDialectNameCmbCntrl.value === 'undefined');
            isDsbl = isDsbl ? isDsbl : (this.mDDialectNameCmbCntrl.value === null);
            if(!isDsbl) {
                isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'manuscriptIdRef');
            }
            if(isDsbl) {
                this.mManuscriptTitleCmbCntrl.disable( {emitEvent: false} );
            } else {
                this.mManuscriptTitleCmbCntrl.enable( {emitEvent: false} );
            }
            if (hasNoVal) { 
                this.mainFormGroup.patchValue({'mManuscriptTitle': null});
                this.mainFormGroup.patchValue({'mCompletionDate': null});
                this.mainFormGroup.patchValue({'manuscriptIdRef': null});
            } else {
                if(typeof inVal.manuscriptTitle === 'undefined') {
                    this.mainFormGroup.patchValue({'mManuscriptTitle': null});
                } else {
                    this.mainFormGroup.patchValue({'mManuscriptTitle': inVal.manuscriptTitle});
                }
                if(typeof inVal.completionDate === 'undefined') {
                    this.mainFormGroup.patchValue({'mCompletionDate': null});
                } else {
                    this.mainFormGroup.patchValue({'mCompletionDate': inVal.completionDate});
                }
                if(typeof inVal.manuscriptId === 'undefined') {
                    this.mainFormGroup.patchValue({'manuscriptIdRef': null});
                } else {
                    this.mainFormGroup.patchValue({'manuscriptIdRef': inVal.manuscriptId});
                }
            }
        }
    }
    OnValChangedmALastName(inVal: any, dscrdChld: boolean): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof inVal === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (inVal === null);
            if (hasNoVal) { 
                dscrdChld = true; 
            }
            let isDsbl: boolean = false;
            isDsbl = isDsbl ? isDsbl : (typeof this.mACCountryNameBttnItm === 'undefined') ;
            isDsbl = isDsbl ? isDsbl : (this.mACCountryNameBttnItm === null);
            if(!isDsbl) {
                isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'manuscriptIdRef');
            }
            if(isDsbl) {
                this.mALastNameCmbCntrl.disable( {emitEvent: false} );
            } else {
                this.mALastNameCmbCntrl.enable( {emitEvent: false} );
            }
            if (hasNoVal) { 
                this.mainFormGroup.patchValue({'mAFirstName': null});
                this.mainFormGroup.patchValue({'mALastName': null});
                this.mainFormGroup.patchValue({'mABirthDate': null});
            } else {
                if(typeof inVal.firstName === 'undefined') {
                    this.mainFormGroup.patchValue({'mAFirstName': null});
                } else {
                    this.mainFormGroup.patchValue({'mAFirstName': inVal.firstName});
                }
                if(typeof inVal.lastName === 'undefined') {
                    this.mainFormGroup.patchValue({'mALastName': null});
                } else {
                    this.mainFormGroup.patchValue({'mALastName': inVal.lastName});
                }
                if(typeof inVal.birthDate === 'undefined') {
                    this.mainFormGroup.patchValue({'mABirthDate': null});
                } else {
                    this.mainFormGroup.patchValue({'mABirthDate': inVal.birthDate});
                }
            }
            if(dscrdChld) {
                this.mManuscriptTitleCmbCntrl.patchValue(null, {emitEvent: false});
                this.mManuscriptTitleCmbCntrlVals=[];
                this.OnValChangedmManuscriptTitle(null, dscrdChld);
            } else {
                this.OnValChangedmManuscriptTitle(this.mManuscriptTitleCmbCntrl.value, dscrdChld);                
            }
            this.OnUpdatemManuscriptTitleCmbCntrlVals();
        }
    }
    OnValChangedmACCountryName(inVal: any, dscrdChld: boolean): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof inVal === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (inVal === null);
            if (hasNoVal) { 
                dscrdChld = true; 
            }
            this.mACCountryNameBttnDsnbl = false;
            let isDsbl: boolean = false;
            isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'manuscriptIdRef');
            this.mACCountryNameBttnDsnbl =  isDsbl;
            if (hasNoVal) { 
                this.mainFormGroup.patchValue({'mACCountryName': null});
            } else {
                if(typeof inVal.countryName === 'undefined') {
                    this.mainFormGroup.patchValue({'mACCountryName': null});
                } else {
                    this.mainFormGroup.patchValue({'mACCountryName': inVal.countryName});
                }
            }
            if(dscrdChld) {
                this.mALastNameCmbCntrl.patchValue(null, {emitEvent: false});
                this.mALastNameCmbCntrlVals=[];
                this.OnValChangedmALastName(null, dscrdChld);
            } else {
                this.OnValChangedmALastName(this.mALastNameCmbCntrl.value, dscrdChld);                
            }
            this.OnUpdatemALastNameCmbCntrlVals();
        }
    }
    OnValChangedmGGenreName(inVal: any, dscrdChld: boolean): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof inVal === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (inVal === null);
            if (hasNoVal) { 
                dscrdChld = true; 
            }
            this.mGGenreNameCmbCntrl.enable( {emitEvent: false} );
            let isDsbl: boolean = false;
            isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'manuscriptIdRef');
            if(isDsbl) {
                this.mGGenreNameCmbCntrl.disable( {emitEvent: false} );
            } else {
                this.mGGenreNameCmbCntrl.enable( {emitEvent: false} );
            }
            if (hasNoVal) { 
                this.mainFormGroup.patchValue({'mGGenreName': null});
            } else {
                if(typeof inVal.genreName === 'undefined') {
                    this.mainFormGroup.patchValue({'mGGenreName': null});
                } else {
                    this.mainFormGroup.patchValue({'mGGenreName': inVal.genreName});
                }
            }
            if(dscrdChld) {
                this.mManuscriptTitleCmbCntrl.patchValue(null, {emitEvent: false});
                this.mManuscriptTitleCmbCntrlVals=[];
                this.OnValChangedmManuscriptTitle(null, dscrdChld);
            } else {
                this.OnValChangedmManuscriptTitle(this.mManuscriptTitleCmbCntrl.value, dscrdChld);                
            }
            this.OnUpdatemManuscriptTitleCmbCntrlVals();
        }
    }
    OnValChangedmDDialectName(inVal: any, dscrdChld: boolean): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof inVal === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (inVal === null);
            if (hasNoVal) { 
                dscrdChld = true; 
            }
            let isDsbl: boolean = false;
            isDsbl = isDsbl ? isDsbl : (typeof this.mDCCountryNameBttnItm === 'undefined') ;
            isDsbl = isDsbl ? isDsbl : (this.mDCCountryNameBttnItm === null);
            if(!isDsbl) {
                isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'manuscriptIdRef');
            }
            if(isDsbl) {
                this.mDDialectNameCmbCntrl.disable( {emitEvent: false} );
            } else {
                this.mDDialectNameCmbCntrl.enable( {emitEvent: false} );
            }
            if (hasNoVal) { 
                this.mainFormGroup.patchValue({'mDDialectName': null});
            } else {
                if(typeof inVal.dialectName === 'undefined') {
                    this.mainFormGroup.patchValue({'mDDialectName': null});
                } else {
                    this.mainFormGroup.patchValue({'mDDialectName': inVal.dialectName});
                }
            }
            if(dscrdChld) {
                this.mManuscriptTitleCmbCntrl.patchValue(null, {emitEvent: false});
                this.mManuscriptTitleCmbCntrlVals=[];
                this.OnValChangedmManuscriptTitle(null, dscrdChld);
            } else {
                this.OnValChangedmManuscriptTitle(this.mManuscriptTitleCmbCntrl.value, dscrdChld);                
            }
            this.OnUpdatemManuscriptTitleCmbCntrlVals();
        }
    }
    OnValChangedmDCCountryName(inVal: any, dscrdChld: boolean): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof inVal === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (inVal === null);
            if (hasNoVal) { 
                dscrdChld = true; 
            }
            this.mDCCountryNameBttnDsnbl = false;
            let isDsbl: boolean = false;
            isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'manuscriptIdRef');
            this.mDCCountryNameBttnDsnbl =  isDsbl;
            if (hasNoVal) { 
                this.mainFormGroup.patchValue({'mDCCountryName': null});
            } else {
                if(typeof inVal.countryName === 'undefined') {
                    this.mainFormGroup.patchValue({'mDCCountryName': null});
                } else {
                    this.mainFormGroup.patchValue({'mDCCountryName': inVal.countryName});
                }
            }
            if(dscrdChld) {
                this.mDDialectNameCmbCntrl.patchValue(null, {emitEvent: false});
                this.mDDialectNameCmbCntrlVals=[];
                this.OnValChangedmDDialectName(null, dscrdChld);
            } else {
                this.OnValChangedmDDialectName(this.mDDialectNameCmbCntrl.value, dscrdChld);                
            }
            this.OnUpdatemDDialectNameCmbCntrlVals();
        }
    }



    pCCountryNameSrchClck(): void {
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
            let w: string = this.appGlblSettings.getDialogWidth('LitBookView');
            let mw: string = this.appGlblSettings.getDialogMaxWidth('LitBookView');
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
                                    this.pCCountryNameBttnItm = rslt.selectedItems[0];
                                    this.OnValChangedpCCountryName(rslt.selectedItems[0], true);
                                }
                            }
                        }
                    }
                }
            });
        }
    }


    mACCountryNameSrchClck(): void {
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
            let w: string = this.appGlblSettings.getDialogWidth('LitBookView');
            let mw: string = this.appGlblSettings.getDialogMaxWidth('LitBookView');
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
                                    this.mACCountryNameBttnItm = rslt.selectedItems[0];
                                    this.OnValChangedmACCountryName(rslt.selectedItems[0], true);
                                }
                            }
                        }
                    }
                }
            });
        }
    }


    mDCCountryNameSrchClck(): void {
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
            let w: string = this.appGlblSettings.getDialogWidth('LitBookView');
            let mw: string = this.appGlblSettings.getDialogMaxWidth('LitBookView');
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
                                    this.mDCCountryNameBttnItm = rslt.selectedItems[0];
                                    this.OnValChangedmDCCountryName(rslt.selectedItems[0], true);
                                }
                            }
                        }
                    }
                }
            });
        }
    }




    @Output('before-submit') beforeSubmit = new EventEmitter();
    @Output('after-submit') afterSubmit = new EventEmitter<ILitBookView>();

    doSubmit() {
        if(typeof this.mainFormGroup === 'undefined') return;
        if(this.mainFormGroup === null) return;
        if (this.mainFormGroup.invalid) {
            this.mainFormGroup.markAllAsTouched();
            if (this.eformMode === EformMode.AddMode) { 
                this.eEditionNameCmbCntrl.markAllAsTouched();
                this.pPublisherNameCmbCntrl.markAllAsTouched();
                this.mManuscriptTitleCmbCntrl.markAllAsTouched();
                this.mALastNameCmbCntrl.markAllAsTouched();
                this.mGGenreNameCmbCntrl.markAllAsTouched();
                this.mDDialectNameCmbCntrl.markAllAsTouched();
            }
            if (this.eformMode === EformMode.UpdateMode) { 
                this.eEditionNameCmbCntrl.markAllAsTouched();
                this.pPublisherNameCmbCntrl.markAllAsTouched();
                this.mManuscriptTitleCmbCntrl.markAllAsTouched();
                this.mALastNameCmbCntrl.markAllAsTouched();
                this.mGGenreNameCmbCntrl.markAllAsTouched();
                this.mDDialectNameCmbCntrl.markAllAsTouched();
            }
            if (this.eformMode === EformMode.DeleteMode) { 
            }
            return;
        }
        this.beforeSubmit.emit(this.mainFormGroup.value);

        if (this.eformMode === EformMode.AddMode) { 
            this.frmSrvLitBookView.addone(this.mainFormGroup.getRawValue())
            .subscribe(
                (respdata: ILitBookView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );
        } else if (this.eformMode === EformMode.UpdateMode) { 
            this.frmSrvLitBookView.updateone(this.mainFormGroup.getRawValue())
            .subscribe(
                (respdata: ILitBookView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );

        } else if (this.eformMode === EformMode.DeleteMode) { 
            this.frmSrvLitBookView.deleteone(  this.mainFormGroup.controls['bookId'].value )
            .subscribe(
                (respdata: ILitBookView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );
        }
    }

} // the end of the LitBookViewEformComponent class body




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

import { IaspnetuserView } from './../interfaces/aspnetuser-view.interface';
import { IaspnetuserViewPage } from './../interfaces/aspnetuser-view-page.interface';
import { IaspnetuserViewFilter } from './../interfaces/aspnetuser-view-filter.interface';
import { AspnetuserViewService } from './../../../services/aspnetuser-view/aspnetuser-view.service';

@Component({
  selector: 'app-aspnetuser-view-eform',
  templateUrl: './aspnetuser-view-eform.component.html',
  styleUrls: ['./aspnetuser-view-eform.component.css']
})
export class AspnetuserViewEformComponent implements OnInit, IEventEmitterPub {
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
    protected _eformControlModel: IaspnetuserView | null = null;
    @Input('eform-control-model') 
        set eformControlModel (inFormControlModel : IaspnetuserView) {
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
        get eformControlModel(): IaspnetuserView {
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
            if(!this.DefCntrlByHddn('id')) { this.DefCntrlByModel('id'); }
            if(!this.DefCntrlByHddn('userName')) { this.DefCntrlByModel('userName'); }
            if(!this.DefCntrlByHddn('email')) { this.DefCntrlByModel('email'); }
            if(!this.DefCntrlByHddn('emailConfirmed')) { this.DefCntrlByModel('emailConfirmed'); }
            if(!this.DefCntrlByHddn('phoneNumber')) { this.DefCntrlByModel('phoneNumber'); }
            if(!this.DefCntrlByHddn('phoneNumberConfirmed')) { this.DefCntrlByModel('phoneNumberConfirmed'); }
            if(!this.DefCntrlByHddn('twoFactorEnabled')) { this.DefCntrlByModel('twoFactorEnabled'); }
            if(!this.DefCntrlByHddn('lockoutEndDateUtc')) { this.DefCntrlByModel('lockoutEndDateUtc'); }
            if(!this.DefCntrlByHddn('lockoutEnabled')) { this.DefCntrlByModel('lockoutEnabled'); }
            if(!this.DefCntrlByHddn('accessFailedCount')) { this.DefCntrlByModel('accessFailedCount'); }
        } else {
            if(!this.DefCntrlByHddn('id') ) { this.mainFormGroup.patchValue({'id': null}); };
            if(!this.DefCntrlByHddn('userName') ) { this.mainFormGroup.patchValue({'userName': null}); };
            if(!this.DefCntrlByHddn('email') ) { this.mainFormGroup.patchValue({'email': null}); };
            if(!this.DefCntrlByHddn('emailConfirmed') ) { this.mainFormGroup.patchValue({'emailConfirmed': null}); };
            if(!this.DefCntrlByHddn('phoneNumber') ) { this.mainFormGroup.patchValue({'phoneNumber': null}); };
            if(!this.DefCntrlByHddn('phoneNumberConfirmed') ) { this.mainFormGroup.patchValue({'phoneNumberConfirmed': null}); };
            if(!this.DefCntrlByHddn('twoFactorEnabled') ) { this.mainFormGroup.patchValue({'twoFactorEnabled': null}); };
            if(!this.DefCntrlByHddn('lockoutEndDateUtc') ) { this.mainFormGroup.patchValue({'lockoutEndDateUtc': null}); };
            if(!this.DefCntrlByHddn('lockoutEnabled') ) { this.mainFormGroup.patchValue({'lockoutEnabled': null}); };
            if(!this.DefCntrlByHddn('accessFailedCount') ) { this.mainFormGroup.patchValue({'accessFailedCount': null}); };
        }
    }



    constructor(private frmSrvaspnetuserView: AspnetuserViewService, public dialog: MatDialog, protected appGlblSettings: AppGlblSettingsService ) {
        this.appearance = this.appGlblSettings.appearance;
        this.mainFormGroup =  new FormGroup({});
        let locValidators: ValidatorFn[]; 
        locValidators = [ ];
        this.mainFormGroup.addControl('id', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.maxLength(256),Validators.minLength(1) ];
        this.mainFormGroup.addControl('userName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.maxLength(256),Validators.minLength(0) ];
        this.mainFormGroup.addControl('email', new FormControl({ value: null, disabled: true}, locValidators));
        this.mainFormGroup.addControl('emailConfirmed', new FormControl({ value: false, disabled: true}));
        locValidators = [  ];
        this.mainFormGroup.addControl('phoneNumber', new FormControl({ value: null, disabled: true}, locValidators));
        this.mainFormGroup.addControl('phoneNumberConfirmed', new FormControl({ value: false, disabled: true}));
        this.mainFormGroup.addControl('twoFactorEnabled', new FormControl({ value: false, disabled: true}));
        locValidators = [  ];
        this.mainFormGroup.addControl('lockoutEndDateUtc', new FormControl({ value: null, disabled: true}, locValidators));
        this.mainFormGroup.addControl('lockoutEnabled', new FormControl({ value: false, disabled: true}));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('accessFailedCount', new FormControl({ value: null, disabled: true}, locValidators));
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
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode)  || (this.eformMode === EformMode.DeleteMode) ) {
            this.mainFormGroup.controls['id'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['userName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['email'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['emailConfirmed'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['phoneNumber'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['phoneNumberConfirmed'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['twoFactorEnabled'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['lockoutEndDateUtc'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['lockoutEnabled'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['accessFailedCount'].enable( {emitEvent: false} );
        } 
    } // end of EformMode

    DoClearControls(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode)  || (this.eformMode === EformMode.DeleteMode) ) {
        } 
    }


//
// TODO: check if DoInit()-method is required
//
    DoInit() {
    } // DoInit() 









    @Output('before-submit') beforeSubmit = new EventEmitter();
    @Output('after-submit') afterSubmit = new EventEmitter<IaspnetuserView>();

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
            this.frmSrvaspnetuserView.addone(this.mainFormGroup.getRawValue())
            .subscribe(
                (respdata: IaspnetuserView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );
        } else if (this.eformMode === EformMode.UpdateMode) { 
            this.frmSrvaspnetuserView.updateone(this.mainFormGroup.getRawValue())
            .subscribe(
                (respdata: IaspnetuserView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );

        } else if (this.eformMode === EformMode.DeleteMode) { 
            this.frmSrvaspnetuserView.deleteone(  this.mainFormGroup.controls['id'].value )
            .subscribe(
                (respdata: IaspnetuserView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );
        }
    }

} // the end of the AspnetuserViewEformComponent class body



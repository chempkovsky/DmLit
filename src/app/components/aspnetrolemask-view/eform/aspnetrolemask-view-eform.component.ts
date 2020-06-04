
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

import { IaspnetrolemaskView } from './../interfaces/aspnetrolemask-view.interface';
import { IaspnetrolemaskViewPage } from './../interfaces/aspnetrolemask-view-page.interface';
import { IaspnetrolemaskViewFilter } from './../interfaces/aspnetrolemask-view-filter.interface';
import { AspnetrolemaskViewService } from './../../../services/aspnetrolemask-view/aspnetrolemask-view.service';

@Component({
  selector: 'app-aspnetrolemask-view-eform',
  templateUrl: './aspnetrolemask-view-eform.component.html',
  styleUrls: ['./aspnetrolemask-view-eform.component.css']
})
export class AspnetrolemaskViewEformComponent implements OnInit, IEventEmitterPub {
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
    protected _eformControlModel: IaspnetrolemaskView | null = null;
    @Input('eform-control-model') 
        set eformControlModel (inFormControlModel : IaspnetrolemaskView) {
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
        get eformControlModel(): IaspnetrolemaskView {
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
            if(!this.DefCntrlByHddn('roleName')) { this.DefCntrlByModel('roleName'); }
            if(!this.DefCntrlByHddn('roleDescription')) { this.DefCntrlByModel('roleDescription'); }
            if(!this.DefCntrlByHddn('mask0')) { this.DefCntrlByModel('mask0'); }
            if(!this.DefCntrlByHddn('mask1')) { this.DefCntrlByModel('mask1'); }
            if(!this.DefCntrlByHddn('mask2')) { this.DefCntrlByModel('mask2'); }
            if(!this.DefCntrlByHddn('mask3')) { this.DefCntrlByModel('mask3'); }
            if(!this.DefCntrlByHddn('mask4')) { this.DefCntrlByModel('mask4'); }
            if(!this.DefCntrlByHddn('mask5')) { this.DefCntrlByModel('mask5'); }
            if(!this.DefCntrlByHddn('mask6')) { this.DefCntrlByModel('mask6'); }
            if(!this.DefCntrlByHddn('mask7')) { this.DefCntrlByModel('mask7'); }
            if(!this.DefCntrlByHddn('mask8')) { this.DefCntrlByModel('mask8'); }
            if(!this.DefCntrlByHddn('mask9')) { this.DefCntrlByModel('mask9'); }
            if(!this.DefCntrlByHddn('maskA')) { this.DefCntrlByModel('maskA'); }
            if(!this.DefCntrlByHddn('maskB')) { this.DefCntrlByModel('maskB'); }
            if(!this.DefCntrlByHddn('maskC')) { this.DefCntrlByModel('maskC'); }
            if(!this.DefCntrlByHddn('maskD')) { this.DefCntrlByModel('maskD'); }
            if(!this.DefCntrlByHddn('dask0')) { this.DefCntrlByModel('dask0'); }
            if(!this.DefCntrlByHddn('dask1')) { this.DefCntrlByModel('dask1'); }
            if(!this.DefCntrlByHddn('dask2')) { this.DefCntrlByModel('dask2'); }
        } else {
            if(!this.DefCntrlByHddn('roleName') ) { this.mainFormGroup.patchValue({'roleName': null}); };
            if(!this.DefCntrlByHddn('roleDescription') ) { this.mainFormGroup.patchValue({'roleDescription': null}); };
            if(!this.DefCntrlByHddn('mask0') ) { this.mainFormGroup.patchValue({'mask0': null}); };
            if(!this.DefCntrlByHddn('mask1') ) { this.mainFormGroup.patchValue({'mask1': null}); };
            if(!this.DefCntrlByHddn('mask2') ) { this.mainFormGroup.patchValue({'mask2': null}); };
            if(!this.DefCntrlByHddn('mask3') ) { this.mainFormGroup.patchValue({'mask3': null}); };
            if(!this.DefCntrlByHddn('mask4') ) { this.mainFormGroup.patchValue({'mask4': null}); };
            if(!this.DefCntrlByHddn('mask5') ) { this.mainFormGroup.patchValue({'mask5': null}); };
            if(!this.DefCntrlByHddn('mask6') ) { this.mainFormGroup.patchValue({'mask6': null}); };
            if(!this.DefCntrlByHddn('mask7') ) { this.mainFormGroup.patchValue({'mask7': null}); };
            if(!this.DefCntrlByHddn('mask8') ) { this.mainFormGroup.patchValue({'mask8': null}); };
            if(!this.DefCntrlByHddn('mask9') ) { this.mainFormGroup.patchValue({'mask9': null}); };
            if(!this.DefCntrlByHddn('maskA') ) { this.mainFormGroup.patchValue({'maskA': null}); };
            if(!this.DefCntrlByHddn('maskB') ) { this.mainFormGroup.patchValue({'maskB': null}); };
            if(!this.DefCntrlByHddn('maskC') ) { this.mainFormGroup.patchValue({'maskC': null}); };
            if(!this.DefCntrlByHddn('maskD') ) { this.mainFormGroup.patchValue({'maskD': null}); };
            if(!this.DefCntrlByHddn('dask0') ) { this.mainFormGroup.patchValue({'dask0': null}); };
            if(!this.DefCntrlByHddn('dask1') ) { this.mainFormGroup.patchValue({'dask1': null}); };
            if(!this.DefCntrlByHddn('dask2') ) { this.mainFormGroup.patchValue({'dask2': null}); };
        }
    }



    constructor(private frmSrvaspnetrolemaskView: AspnetrolemaskViewService, public dialog: MatDialog, protected appGlblSettings: AppGlblSettingsService ) {
        this.appearance = this.appGlblSettings.appearance;
        this.mainFormGroup =  new FormGroup({});
        let locValidators: ValidatorFn[]; 
        locValidators = [ Validators.required,Validators.maxLength(128),Validators.minLength(1) ];
        this.mainFormGroup.addControl('roleName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.maxLength(70),Validators.minLength(0) ];
        this.mainFormGroup.addControl('roleDescription', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('mask0', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('mask1', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('mask2', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('mask3', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('mask4', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('mask5', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('mask6', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('mask7', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('mask8', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('mask9', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('maskA', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('maskB', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('maskC', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('maskD', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('dask0', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('dask1', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('dask2', new FormControl({ value: null, disabled: true}, locValidators));
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
            this.mainFormGroup.controls['roleName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['roleDescription'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mask0'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mask1'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mask2'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mask3'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mask4'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mask5'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mask6'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mask7'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mask8'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['mask9'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['maskA'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['maskB'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['maskC'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['maskD'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['dask0'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['dask1'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['dask2'].enable( {emitEvent: false} );
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
    @Output('after-submit') afterSubmit = new EventEmitter<IaspnetrolemaskView>();

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
            this.frmSrvaspnetrolemaskView.addone(this.mainFormGroup.getRawValue())
            .subscribe(
                (respdata: IaspnetrolemaskView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );
        } else if (this.eformMode === EformMode.UpdateMode) { 
            this.frmSrvaspnetrolemaskView.updateone(this.mainFormGroup.getRawValue())
            .subscribe(
                (respdata: IaspnetrolemaskView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );

        } else if (this.eformMode === EformMode.DeleteMode) { 
            this.frmSrvaspnetrolemaskView.deleteone(  this.mainFormGroup.controls['roleName'].value )
            .subscribe(
                (respdata: IaspnetrolemaskView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );
        }
    }

} // the end of the AspnetrolemaskViewEformComponent class body




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

import { IaspnetmodelView } from './../interfaces/aspnetmodel-view.interface';
import { IaspnetmodelViewPage } from './../interfaces/aspnetmodel-view-page.interface';
import { IaspnetmodelViewFilter } from './../interfaces/aspnetmodel-view-filter.interface';
import { AspnetmodelViewService } from './../../../services/aspnetmodel-view/aspnetmodel-view.service';

@Component({
  selector: 'app-aspnetmodel-view-eform',
  templateUrl: './aspnetmodel-view-eform.component.html',
  styleUrls: ['./aspnetmodel-view-eform.component.css']
})
export class AspnetmodelViewEformComponent implements OnInit, IEventEmitterPub {
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
    protected _eformControlModel: IaspnetmodelView | null = null;
    @Input('eform-control-model') 
        set eformControlModel (inFormControlModel : IaspnetmodelView) {
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
        get eformControlModel(): IaspnetmodelView {
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
            if(!this.DefCntrlByHddn('modelPk')) { this.DefCntrlByModel('modelPk'); }
            if(!this.DefCntrlByHddn('modelName')) { this.DefCntrlByModel('modelName'); }
            if(!this.DefCntrlByHddn('modelDescription')) { this.DefCntrlByModel('modelDescription'); }
        } else {
            if(!this.DefCntrlByHddn('modelPk') ) { this.mainFormGroup.patchValue({'modelPk': null}); };
            if(!this.DefCntrlByHddn('modelName') ) { this.mainFormGroup.patchValue({'modelName': null}); };
            if(!this.DefCntrlByHddn('modelDescription') ) { this.mainFormGroup.patchValue({'modelDescription': null}); };
        }
    }



    constructor(private frmSrvaspnetmodelView: AspnetmodelViewService, public dialog: MatDialog, protected appGlblSettings: AppGlblSettingsService ) {
        this.appearance = this.appGlblSettings.appearance;
        this.mainFormGroup =  new FormGroup({});
        let locValidators: ValidatorFn[]; 
        locValidators = [ Validators.required,Validators.pattern(/^[-+]?\d+$/),Validators.max(2147483640),Validators.min(-2147483640) ];
        this.mainFormGroup.addControl('modelPk', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(50),Validators.minLength(1) ];
        this.mainFormGroup.addControl('modelName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.maxLength(50),Validators.minLength(1) ];
        this.mainFormGroup.addControl('modelDescription', new FormControl({ value: null, disabled: true}, locValidators));
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
            this.mainFormGroup.controls['modelPk'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['modelName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['modelDescription'].enable( {emitEvent: false} );
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
    @Output('after-submit') afterSubmit = new EventEmitter<IaspnetmodelView>();

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
            this.frmSrvaspnetmodelView.addone(this.mainFormGroup.getRawValue())
            .subscribe(
                (respdata: IaspnetmodelView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );
        } else if (this.eformMode === EformMode.UpdateMode) { 
            this.frmSrvaspnetmodelView.updateone(this.mainFormGroup.getRawValue())
            .subscribe(
                (respdata: IaspnetmodelView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );

        } else if (this.eformMode === EformMode.DeleteMode) { 
            this.frmSrvaspnetmodelView.deleteone(  this.mainFormGroup.controls['modelPk'].value )
            .subscribe(
                (respdata: IaspnetmodelView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );
        }
    }

} // the end of the AspnetmodelViewEformComponent class body



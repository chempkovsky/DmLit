
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

import { ILitEditionView } from './../interfaces/lit-edition-view.interface';
import { ILitEditionViewPage } from './../interfaces/lit-edition-view-page.interface';
import { ILitEditionViewFilter } from './../interfaces/lit-edition-view-filter.interface';
import { LitEditionViewService } from './../../../services/lit-edition-view/lit-edition-view.service';

@Component({
  selector: 'app-lit-edition-view-eform',
  templateUrl: './lit-edition-view-eform.component.html',
  styleUrls: ['./lit-edition-view-eform.component.css']
})
export class LitEditionViewEformComponent implements OnInit, IEventEmitterPub {
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
    protected _eformControlModel: ILitEditionView | null = null;
    @Input('eform-control-model') 
        set eformControlModel (inFormControlModel : ILitEditionView) {
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
        get eformControlModel(): ILitEditionView {
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
            if(!this.DefCntrlByHddn('editionId')) { this.DefCntrlByModel('editionId'); }
            if(!this.DefCntrlByHddn('editionName')) { this.DefCntrlByModel('editionName'); }
        } else {
            if(!this.DefCntrlByHddn('editionId') ) { this.mainFormGroup.patchValue({'editionId': null}); };
            if(!this.DefCntrlByHddn('editionName') ) { this.mainFormGroup.patchValue({'editionName': null}); };
        }
    }



    constructor(private frmSrvLitEditionView: LitEditionViewService, public dialog: MatDialog, protected appGlblSettings: AppGlblSettingsService ) {
        this.appearance = this.appGlblSettings.appearance;
        this.mainFormGroup =  new FormGroup({});
        let locValidators: ValidatorFn[]; 
        locValidators = [ ];
        this.mainFormGroup.addControl('editionId', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.maxLength(40),Validators.minLength(3) ];
        this.mainFormGroup.addControl('editionName', new FormControl({ value: null, disabled: true}, locValidators));
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
            this.mainFormGroup.controls['editionId'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['editionName'].enable( {emitEvent: false} );
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
    @Output('after-submit') afterSubmit = new EventEmitter<ILitEditionView>();

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
            this.frmSrvLitEditionView.addone(this.mainFormGroup.getRawValue())
            .subscribe(
                (respdata: ILitEditionView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );
        } else if (this.eformMode === EformMode.UpdateMode) { 
            this.frmSrvLitEditionView.updateone(this.mainFormGroup.getRawValue())
            .subscribe(
                (respdata: ILitEditionView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );

        } else if (this.eformMode === EformMode.DeleteMode) { 
            this.frmSrvLitEditionView.deleteone(  this.mainFormGroup.controls['editionId'].value )
            .subscribe(
                (respdata: ILitEditionView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );
        }
    }

} // the end of the LitEditionViewEformComponent class body



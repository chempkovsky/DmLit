
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

import { IaspnetuserView } from './../../aspnetuser-view/interfaces/aspnetuser-view.interface';
import { IaspnetuserViewPage } from './../../aspnetuser-view/interfaces/aspnetuser-view-page.interface';
import { IaspnetuserViewFilter } from './../../aspnetuser-view/interfaces/aspnetuser-view-filter.interface';
import { AspnetuserViewService } from './../../../services/aspnetuser-view/aspnetuser-view.service';
import { IaspnetroleView } from './../../aspnetrole-view/interfaces/aspnetrole-view.interface';
import { IaspnetroleViewPage } from './../../aspnetrole-view/interfaces/aspnetrole-view-page.interface';
import { IaspnetroleViewFilter } from './../../aspnetrole-view/interfaces/aspnetrole-view-filter.interface';
import { AspnetroleViewService } from './../../../services/aspnetrole-view/aspnetrole-view.service';
import { IaspnetuserrolesView } from './../interfaces/aspnetuserroles-view.interface';
import { IaspnetuserrolesViewPage } from './../interfaces/aspnetuserroles-view-page.interface';
import { IaspnetuserrolesViewFilter } from './../interfaces/aspnetuserroles-view-filter.interface';
import { AspnetuserrolesViewService } from './../../../services/aspnetuserroles-view/aspnetuserroles-view.service';
import { AspnetuserViewSdlgComponent } from './../../aspnetuser-view/sdlg/aspnetuser-view-sdlg.component';
import { IaspnetuserViewDlg } from './../../aspnetuser-view/sdlg/aspnetuser-view-dlg.interface';

@Component({
  selector: 'app-aspnetuserroles-view-eform',
  templateUrl: './aspnetuserroles-view-eform.component.html',
  styleUrls: ['./aspnetuserroles-view-eform.component.css']
})
export class AspnetuserrolesViewEformComponent implements OnInit, IEventEmitterPub {
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
    public uUserNameBttnItm: IaspnetuserView | null = null;
    public uUserNameBttnDsnbl: boolean = true;

    public rNameCmbCntrl: FormControl = null;
    public rNameCmbCntrlVals : Array<IaspnetroleView> | null = null;
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
    protected _eformControlModel: IaspnetuserrolesView | null = null;
    @Input('eform-control-model') 
        set eformControlModel (inFormControlModel : IaspnetuserrolesView) {
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
        get eformControlModel(): IaspnetuserrolesView {
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
            if(!this.DefCntrlByHddn('userId')) { this.DefCntrlByModel('userId'); }
            if(!this.DefCntrlByHddn('uUserName')) { this.DefCntrlByModel('uUserName'); }
            if(!this.DefCntrlByHddn('roleId')) { this.DefCntrlByModel('roleId'); }
            if(!this.DefCntrlByHddn('rName')) { this.DefCntrlByModel('rName'); }
        } else {
            if(!this.DefCntrlByHddn('userId') ) { this.mainFormGroup.patchValue({'userId': null}); };
            if(!this.DefCntrlByHddn('uUserName') ) { this.mainFormGroup.patchValue({'uUserName': null}); };
            if(!this.DefCntrlByHddn('roleId') ) { this.mainFormGroup.patchValue({'roleId': null}); };
            if(!this.DefCntrlByHddn('rName') ) { this.mainFormGroup.patchValue({'rName': null}); };
        }
    }



    constructor(private frmSrvaspnetuserView: AspnetuserViewService, private frmSrvaspnetroleView: AspnetroleViewService, private frmSrvaspnetuserrolesView: AspnetuserrolesViewService, public dialog: MatDialog, protected appGlblSettings: AppGlblSettingsService ) {
        this.appearance = this.appGlblSettings.appearance;
        this.mainFormGroup =  new FormGroup({});
        let locValidators: ValidatorFn[]; 
        locValidators = [ Validators.required,Validators.maxLength(128),Validators.minLength(1) ];
        this.mainFormGroup.addControl('userId', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.maxLength(256),Validators.minLength(1) ];
        this.mainFormGroup.addControl('uUserName', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(128),Validators.minLength(1) ];
        this.mainFormGroup.addControl('roleId', new FormControl({ value: null, disabled: true}, locValidators));
        locValidators = [ Validators.required,Validators.maxLength(128),Validators.minLength(1) ];
        this.mainFormGroup.addControl('rName', new FormControl({ value: null, disabled: true}, locValidators));
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
            this.mainFormGroup.controls['userId'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['uUserName'].enable( {emitEvent: false} ); 
            this.mainFormGroup.controls['roleId'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['rName'].enable( {emitEvent: false} );
            this.rNameCmbCntrl = new FormControl({ value: null, disabled: true }, [ 
                (fc)=>{  if ((typeof fc.value === 'string') || (typeof fc.value === 'undefined') || (fc.value === null)) { 
                            this.mainFormGroup.patchValue({'rName': null });
                            return  this.mainFormGroup.controls['rName'].errors; }  
                        return null; }]);
                                
            this.rNameCmbCntrl.valueChanges.subscribe(val => this.OnValChangedrName(val, true));
        } 
        if (this.eformMode === EformMode.DeleteMode) {
            this.mainFormGroup.controls['userId'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['uUserName'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['roleId'].enable( {emitEvent: false} );
            this.mainFormGroup.controls['rName'].enable( {emitEvent: false} );
        } 
    } // end of EformMode

    DoClearControls(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            this.uUserNameBttnItm = null;
            this.uUserNameBttnDsnbl = true;
            this.rNameCmbCntrl.patchValue(null, {emitEvent: false});
            this.rNameCmbCntrl.disable( {emitEvent: false} );
            this.rNameCmbCntrlVals = null;
        } 
        else if (this.eformMode === EformMode.DeleteMode) {
        } 
    }


//
// TODO: check if DoInit()-method is required
//
    DoInit() {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            this.OnInituUserName();
            this.OnInitrName();
        }
    } // DoInit() 

    OnInituUserName(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let pkpId: any = null;
            if(!(typeof this.mainFormGroup.controls['userId'].value === 'undefined')) {
                if(!(this.mainFormGroup.controls['userId'].value === null)) {
                    pkpId = this.mainFormGroup.controls['userId'].value;
                }
            }
            let isPkNtDf: boolean =  (typeof pkpId === 'undefined')   ;
            isPkNtDf = isPkNtDf ? isPkNtDf :  (pkpId === null)   ;
            if (isPkNtDf) { 
                this.OnValChangeduUserName(null, true);
            } else {
                this.frmSrvaspnetuserView.getone(pkpId )
                .subscribe(
                    (data: IaspnetuserView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.uUserNameBttnItm = data;
                            }
                        }
                        this.OnValChangeduUserName(this.uUserNameBttnItm, false);
                    },
                    error => { // error path
                        this.OnValChangeduUserName(null, true);
                        this.appGlblSettings.showError('http', error)
                    } 
                ); // end of .subscribe
            }
        }
    }
    OnInitrName(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let pkpId: any = null;
            if(!(typeof this.mainFormGroup.controls['roleId'].value === 'undefined')) {
                if(!(this.mainFormGroup.controls['roleId'].value === null)) {
                    pkpId = this.mainFormGroup.controls['roleId'].value;
                }
            }
            let isPkNtDf: boolean =  (typeof pkpId === 'undefined')   ;
            isPkNtDf = isPkNtDf ? isPkNtDf :  (pkpId === null)   ;
            if (isPkNtDf) { 
                this.OnValChangedrName(null, true);
                this.OnUpdaterNameCmbCntrlVals();
            } else {
                this.frmSrvaspnetroleView.getone(pkpId )
                .subscribe(
                    (data: IaspnetroleView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.rNameCmbCntrl.patchValue(data, {emitEvent: false});
                                
                            }
                        }
                        this.OnValChangedrName(this.rNameCmbCntrl.value, false);
                        this.OnUpdaterNameCmbCntrlVals();
                    },
                    error => { // error path
                        this.OnValChangedrName(null, true);
                        this.OnUpdaterNameCmbCntrlVals();
                        this.appGlblSettings.showError('http', error)
                    } 
                ); // end of .subscribe
            }
        }
    }

    OnUpdaterNameCmbCntrlVals(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let flt = {};
            flt['orderby']=['name'];
            this.frmSrvaspnetroleView.getwithfilter(flt).subscribe(
                (data: IaspnetroleViewPage ) => { // success path
                    this.rNameCmbCntrlVals = [];
                    if (!(typeof data === 'undefined')) {
                        if (!(data === null)) {
                            if (!(typeof data.items === 'undefined')) {
                                if (Array.isArray(data.items)) {
                                    this.rNameCmbCntrlVals = data.items;
                                    let lfc: any = this.rNameCmbCntrl.value;
                                    if (!(typeof lfc === 'undefined')) {
                                        if (!(lfc === null)) {
                                            let ind: number = this.rNameCmbCntrlVals.findIndex(e => {
                                                        return  (e.id === lfc.id) ;
                                                });                            
                                            if (ind > -1) {
                                                this.rNameCmbCntrlVals.splice(ind,1,lfc);
                                            } else {
                                                this.OnValChangedrName(null, true);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(this.rNameCmbCntrlVals.length < 1) {
                        this.OnValChangedrName(null, true);
                    }
                }, 
                error => { // error path
                    this.rNameCmbCntrlVals = [];
                    this.OnValChangedrName(null, true);
                    this.appGlblSettings.showError('http', error)
                } 
            );
        }
    }


    OnValChangeduUserName(inVal: any, dscrdChld: boolean): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof inVal === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (inVal === null);
            if (hasNoVal) { 
                dscrdChld = true; 
            }
            this.uUserNameBttnDsnbl = false;
            let isDsbl: boolean = false;
            isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'userId');
            this.uUserNameBttnDsnbl =  isDsbl;
            if (hasNoVal) { 
                this.mainFormGroup.patchValue({'uUserName': null});
                this.mainFormGroup.patchValue({'userId': null});
            } else {
                if(typeof inVal.userName === 'undefined') {
                    this.mainFormGroup.patchValue({'uUserName': null});
                } else {
                    this.mainFormGroup.patchValue({'uUserName': inVal.userName});
                }
                if(typeof inVal.id === 'undefined') {
                    this.mainFormGroup.patchValue({'userId': null});
                } else {
                    this.mainFormGroup.patchValue({'userId': inVal.id});
                }
            }
        }
    }
    OnValChangedrName(inVal: any, dscrdChld: boolean): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = typeof inVal === 'undefined';
            hasNoVal = hasNoVal ? hasNoVal : (inVal === null);
            if (hasNoVal) { 
                dscrdChld = true; 
            }
            this.rNameCmbCntrl.enable( {emitEvent: false} );
            let isDsbl: boolean = false;
            isDsbl = isDsbl ? isDsbl : this.hiddenFilter.some(v => v.fltrName === 'roleId');
            if(isDsbl) {
                this.rNameCmbCntrl.disable( {emitEvent: false} );
            } else {
                this.rNameCmbCntrl.enable( {emitEvent: false} );
            }
            if (hasNoVal) { 
                this.mainFormGroup.patchValue({'rName': null});
                this.mainFormGroup.patchValue({'roleId': null});
            } else {
                if(typeof inVal.name === 'undefined') {
                    this.mainFormGroup.patchValue({'rName': null});
                } else {
                    this.mainFormGroup.patchValue({'rName': inVal.name});
                }
                if(typeof inVal.id === 'undefined') {
                    this.mainFormGroup.patchValue({'roleId': null});
                } else {
                    this.mainFormGroup.patchValue({'roleId': inVal.id});
                }
            }
        }
    }



    uUserNameSrchClck(): void {
        if ((this.eformMode === EformMode.AddMode)  || (this.eformMode === EformMode.UpdateMode) ) {
            let hasNoVal: boolean = false;
            let flt: IaspnetuserViewDlg = {
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
            let w: string = this.appGlblSettings.getDialogWidth('aspnetuserrolesView');
            let mw: string = this.appGlblSettings.getDialogMaxWidth('aspnetuserrolesView');
            let dialogRef = this.dialog.open(AspnetuserViewSdlgComponent, {
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
                                    this.uUserNameBttnItm = rslt.selectedItems[0];
                                    this.OnValChangeduUserName(rslt.selectedItems[0], true);
                                }
                            }
                        }
                    }
                }
            });
        }
    }




    @Output('before-submit') beforeSubmit = new EventEmitter();
    @Output('after-submit') afterSubmit = new EventEmitter<IaspnetuserrolesView>();

    doSubmit() {
        if(typeof this.mainFormGroup === 'undefined') return;
        if(this.mainFormGroup === null) return;
        if (this.mainFormGroup.invalid) {
            this.mainFormGroup.markAllAsTouched();
            if (this.eformMode === EformMode.AddMode) { 
                this.rNameCmbCntrl.markAllAsTouched();
            }
            if (this.eformMode === EformMode.UpdateMode) { 
                this.rNameCmbCntrl.markAllAsTouched();
            }
            if (this.eformMode === EformMode.DeleteMode) { 
            }
            return;
        }
        this.beforeSubmit.emit(this.mainFormGroup.value);

        if (this.eformMode === EformMode.AddMode) { 
            this.frmSrvaspnetuserrolesView.addone(this.mainFormGroup.getRawValue())
            .subscribe(
                (respdata: IaspnetuserrolesView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );
        } else if (this.eformMode === EformMode.UpdateMode) { 
            this.frmSrvaspnetuserrolesView.updateone(this.mainFormGroup.getRawValue())
            .subscribe(
                (respdata: IaspnetuserrolesView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );

        } else if (this.eformMode === EformMode.DeleteMode) { 
            this.frmSrvaspnetuserrolesView.deleteone(  this.mainFormGroup.controls['userId'].value ,   this.mainFormGroup.controls['roleId'].value )
            .subscribe(
                (respdata: IaspnetuserrolesView ) => { // success path
                    this.afterSubmit.emit(respdata);
                },
                error => { // error path
                    this.appGlblSettings.showError('http', error)
                }
            );
        }
    }

} // the end of the AspnetuserrolesViewEformComponent class body



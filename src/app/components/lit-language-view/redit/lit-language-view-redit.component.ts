
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, UrlSegment } from '@angular/router';

import { EformMode } from './../../../shared/enums/eform-mode.enum';
import { LitLanguageViewEformComponent } from './../eform/lit-language-view-eform.component';
import { AppGlblSettingsService } from './../../../shared/services/app-glbl-settings.service';
import { LitLanguageViewService } from './../../../services/lit-language-view/lit-language-view.service';
import { ILitLanguageView } from './../interfaces/lit-language-view.interface';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';
import { IEventEmitterData } from './../../../shared/interfaces/event-emitter-data.interface';
import { IMenuItemData } from './../../../shared/interfaces/menu-item-data.interface';
import { IEventEmitterPub } from './../../../shared/interfaces/event-emitter-pub.interface';

@Component({
  selector: 'app-lit-language-view-redit',
  templateUrl: './lit-language-view-redit.component.html',
  styleUrls: ['./lit-language-view-redit.component.css']
})

export class LitLanguageViewReditComponent implements OnInit, IEventEmitterPub {
    title: 'No title';
    @Output('on-cont-menu-item-click') onContMenuItemEmitter = new EventEmitter<IEventEmitterData>();
    @Input('cont-menu-items') contMenuItems: Array<IMenuItemData> = [];
    onContMenuItemClicked(v: IEventEmitterData)  {
        this.onContMenuItemEmitter.emit(v);
    }


    @ViewChild(LitLanguageViewEformComponent) childForm: LitLanguageViewEformComponent;

    hiddenFilter: Array<IWebServiceFilterRslt> = [];
    eformMode: EformMode = EformMode.DeleteMode;
    eformControlModel: ILitLanguageView | null = null;

    constructor(protected route: ActivatedRoute, protected router: Router, protected appGlblSettings: AppGlblSettingsService, protected frmRootSrv: LitLanguageViewService) { }
    ngOnInit() {
        if (!(typeof this.route.snapshot.data === 'undefined')) {
            if (!(this.route.snapshot.data === null)) {
                if (!(typeof this.route.snapshot.data.title === 'undefined')) {
                    this.title = this.route.snapshot.data.title;
                }
            }
        }

        let url: UrlSegment[] = this.route.snapshot.url;
        let len: number = url.length;
        if(len < 2) {
            this.onNavError();
            return;
        }
        let paramMap: ParamMap = this.route.snapshot.paramMap;
        if(!paramMap.has('mode')) {
            this.onNavError();
            return;
        }
        let mode: string = url[len-1].path;
        if (typeof mode === 'undefined') {
            this.onNavError();
            return;
        }
        if (mode === null) {
            this.onNavError();
            return;
        }
        mode = mode.toLowerCase();
        if ('add'.toLowerCase() === mode) {
            this.eformMode = EformMode.AddMode;
        } else if ('update'.toLowerCase() === mode) {
            this.eformMode = EformMode.UpdateMode;
        } else if ('delete'.toLowerCase() === mode) {
            this.eformMode = EformMode.DeleteMode;
        } else {
            this.onNavError();
            return;
        }
        if (this.eformMode !== EformMode.AddMode) {
            if(3 >= len) {
                this.onNavError();
                return;
            }
            let pkpIso3: any = url[len - 3].path;
            let pkpIso2: any = url[len - 2].path;
            this.frmRootSrv.getone(pkpIso3, pkpIso2 )
                .subscribe(
                   (data: ILitLanguageView ) => { // success path
                        if (!(typeof data === 'undefined')) {
                            if (!(data === null)) {
                                this.eformControlModel = data;
                            }
                        }
                   },
                   error => { // error path
                        this.appGlblSettings.showError('http', error);
                        this.onCancel(); // navigation is correct: onCancel is correct method here
                   } 
                ); // end of .subscribe
        }
    }
    onAfterSubmit(newVal: ILitLanguageView) {
        let shft: number = 1;
        if (this.eformMode !== EformMode.AddMode) {
            shft = 3;
        }
        let act: string = 'delete';
        if(this.eformMode === EformMode.AddMode) {
            act = 'add';
        } else if(this.eformMode === EformMode.UpdateMode) {
            act = 'update';
        }
        let qp = {
            mode: act
        };
        qp['iso3'] = newVal.iso3;
        qp['iso2'] = newVal.iso2;
        this.router.navigate(['../'.repeat(shft)], {queryParams: qp, relativeTo: this.route});
    }

    onNavError() {
        let msg = {
            message:'Incorrect Url.'
        };
        this.appGlblSettings.showError('Navigation Error', msg)
        let url: UrlSegment[] = this.route.snapshot.url;
        let len: number = url.length;
        let shft: number = 0;
        for (var i = len-1; i > -1; i--) {
            let apth: string = url[i].path;
            if(typeof apth === 'undefined') {
                apth = '';
            }
            if(apth === null) {
                apth = '';
            }
            apth = apth.toLowerCase();
            if ('LitLanguageView'.toLowerCase() === apth) {
                break;
            }
            shft++;
        }
        if (shft >= len) {
            this.router.navigate(['/']);
        } else {
            this.router.navigate(['../'.repeat(shft)], {relativeTo: this.route});
        }
    }
    onCancel() {
        let shft: number = 1;
        let qp = {
            mode: 'cancel'
        };
        let url: UrlSegment[] = this.route.snapshot.url;
        let len: number = url.length;
        if (this.eformMode !== EformMode.AddMode) {
            shft = 3;
            qp['iso3'] = url[len - 3].path;
            qp['iso2'] = url[len - 2].path;
 
        }
        this.router.navigate(['../'.repeat(shft)], {queryParams: qp, relativeTo: this.route});
    }
    onOk() {
        if (typeof this.childForm === 'undefined') return;
        if (this.childForm === null) return;
        this.childForm.doSubmit();
    }
}



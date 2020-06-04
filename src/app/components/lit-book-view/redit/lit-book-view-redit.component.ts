
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, UrlSegment } from '@angular/router';

import { EformMode } from './../../../shared/enums/eform-mode.enum';
import { LitBookViewEformComponent } from './../eform/lit-book-view-eform.component';
import { AppGlblSettingsService } from './../../../shared/services/app-glbl-settings.service';
import { LitBookViewService } from './../../../services/lit-book-view/lit-book-view.service';
import { ILitBookView } from './../interfaces/lit-book-view.interface';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';
import { IEventEmitterData } from './../../../shared/interfaces/event-emitter-data.interface';
import { IMenuItemData } from './../../../shared/interfaces/menu-item-data.interface';
import { IEventEmitterPub } from './../../../shared/interfaces/event-emitter-pub.interface';

@Component({
  selector: 'app-lit-book-view-redit',
  templateUrl: './lit-book-view-redit.component.html',
  styleUrls: ['./lit-book-view-redit.component.css']
})

export class LitBookViewReditComponent implements OnInit, IEventEmitterPub {
    title: 'No title';
    @Output('on-cont-menu-item-click') onContMenuItemEmitter = new EventEmitter<IEventEmitterData>();
    @Input('cont-menu-items') contMenuItems: Array<IMenuItemData> = [];
    onContMenuItemClicked(v: IEventEmitterData)  {
        this.onContMenuItemEmitter.emit(v);
    }


    @ViewChild(LitBookViewEformComponent) childForm: LitBookViewEformComponent;

    hiddenFilter: Array<IWebServiceFilterRslt> = [];
    eformMode: EformMode = EformMode.DeleteMode;
    eformControlModel: ILitBookView | null = null;

    constructor(protected route: ActivatedRoute, protected router: Router, protected appGlblSettings: AppGlblSettingsService, protected frmRootSrv: LitBookViewService) { }
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
        if(paramMap.has('depth')) {
            let depth: number = parseInt(paramMap.get('depth'));
            if (depth > 1) {
                let shft: number = 2;
                if (this.eformMode !== EformMode.AddMode) {
                    shft = 3;
                }
                if(shft >= len) {
                    this.onNavError();
                    return;
                }
                let nvgNm: string = url[len - shft].path;
                if(typeof nvgNm === 'undefined') {
                    nvgNm = '';
                }
                if(nvgNm === null) {
                    nvgNm = '';
                }
                nvgNm = nvgNm.toLowerCase();
                let hf: Array<IWebServiceFilterRslt> = [];
                if ('Publisher'.toLowerCase() === nvgNm) {
                    if ( (shft + 2 + 1) >= len ) {
                        this.onNavError();
                        return;
                    }

                    hf.push({
                        fltrName: 'publisherIdRef',
                        fltrDataType: 'int32', 
                        fltrOperator: 'eq',
                        fltrValue: url[len  - (shft  + 1)].path
                    });
                }
                else if ('Manuscript'.toLowerCase() === nvgNm) {
                    if ( (shft + 2 + 1) >= len ) {
                        this.onNavError();
                        return;
                    }

                    hf.push({
                        fltrName: 'manuscriptIdRef',
                        fltrDataType: 'int32', 
                        fltrOperator: 'eq',
                        fltrValue: url[len  - (shft  + 1)].path
                    });
                }
                else if ('Edition'.toLowerCase() === nvgNm) {
                    if ( (shft + 2 + 1) >= len ) {
                        this.onNavError();
                        return;
                    }

                    hf.push({
                        fltrName: 'editionIdRef',
                        fltrDataType: 'int32', 
                        fltrOperator: 'eq',
                        fltrValue: url[len  - (shft  + 1)].path
                    });
                }
                this.hiddenFilter = hf;
            }
        }
        if (this.eformMode !== EformMode.AddMode) {
            if(2 >= len) {
                this.onNavError();
                return;
            }
            let pkpBookId: any = url[len - 2].path;
            this.frmRootSrv.getone(pkpBookId )
                .subscribe(
                   (data: ILitBookView ) => { // success path
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
    onAfterSubmit(newVal: ILitBookView) {
        let shft: number = 1;
        if (this.eformMode !== EformMode.AddMode) {
            shft = 2;
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
        qp['bookId'] = newVal.bookId;
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
            if ('Publisher'.toLowerCase() === apth) {
                break;
            }
            if ('Manuscript'.toLowerCase() === apth) {
                break;
            }
            if ('Edition'.toLowerCase() === apth) {
                break;
            }
            if ('LitBookView'.toLowerCase() === apth) {
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
            shft = 2;
            qp['bookId'] = url[len - 2].path;
 
        }
        this.router.navigate(['../'.repeat(shft)], {queryParams: qp, relativeTo: this.route});
    }
    onOk() {
        if (typeof this.childForm === 'undefined') return;
        if (this.childForm === null) return;
        this.childForm.doSubmit();
    }
}



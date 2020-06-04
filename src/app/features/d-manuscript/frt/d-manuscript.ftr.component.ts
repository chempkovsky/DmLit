
import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AppGlblSettingsService } from './../../../shared/services/app-glbl-settings.service';
import { IMenuItemData } from './../../../shared/interfaces/menu-item-data.interface';
import { IItemHeightData } from './../../../shared/interfaces/item-height-data.interface';
import { IEventEmitterPub } from './../../../shared/interfaces/event-emitter-pub.interface';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-d-manuscript-ftr',
  templateUrl: './d-manuscript.ftr.component.html',
  styleUrls: ['./d-manuscript.ftr.component.css']
})
export class DManuscriptFtrComponent  {
    curBreakpoint: number = 1;
    isExp: boolean[] = [false, false, false];
    colSpan: number[][]= [
            [1, 1, 2, 1, 1, 2],
            [1, 1, 2, 1, 1, 2],
            [1, 1, 2, 1, 1, 2],
        ];
    rowSpan: number[][]= [
            [1,  1, 1, 1, 1, 2],
            [4,  2, 2, 2, 2, 2],
            [1,  1, 1, 1, 1, 2],
        ];
    maxHeight: number[][]= [
            [6, 6, 19],
            [5, 5, 5],
            [6, 6, 19],
        ];
    filterMaxHeight: number[][]= [
            [1, 1, 2],
            [1, 1, 1],
            [1, 1, 2],
        ];
    contMenuItems: IMenuItemData[][]=[
            [  {id: '0', caption: 'expand(collapse)', iconName: 'aspect_ratio', iconColor: 'primary', enabled: true } ],
            [  {id: '1', caption: 'expand(collapse)', iconName: 'aspect_ratio', iconColor: 'primary', enabled: true } ],
            [  {id: '2', caption: 'expand(collapse)', iconName: 'aspect_ratio', iconColor: 'primary', enabled: true } ],
        ];

    updateSettings() {
        let i: number;
        for (i = 0; i <  3; i++) {
            this.colSpan[i][0] = this.isExp[i] ? this.colSpan[i][3] : this.colSpan[i][this.curBreakpoint] * this.colSpan[i][3];
            this.rowSpan[i][0] = this.isExp[i] ? this.rowSpan[i][3] : this.rowSpan[i][this.curBreakpoint] * this.rowSpan[i][3];
        }
    }
    constructor(private breakpointObserver: BreakpointObserver, protected appGlblSettings: AppGlblSettingsService) {
        breakpointObserver.observe([
            Breakpoints.Medium,
            Breakpoints.Large
          ]).subscribe(result => {
            if (result.matches) {
                this.curBreakpoint = 1;
            } else {
                this.curBreakpoint = 2;
            }
            this.updateSettings();
       });        
    }
    isVisible: boolean[] = [false, false, false];
    ngOnInit(): void {
        let msk: number = 0;
        msk = this.appGlblSettings.getViewModelMask('LitManuscriptView');
        this.isVisible[0] = (msk & 1) === 1;
        msk = this.appGlblSettings.getViewModelMask('LitManuscriptView');
        this.isVisible[1] = (msk & 1) === 1;
        msk = this.appGlblSettings.getViewModelMask('LitManuscriptView');
        this.isVisible[2] = (msk & 1) === 1;
    }

    onContMenuItemClicked(v: IMenuItemData) {
        let setDefault = true;
        let locId = parseInt(v.id);
        this.isExp[locId] = !(this.isExp[locId]);
        if(this.isExp[locId]) {
            setDefault = false;
            this.colSpan[locId][3] = this.colSpan[locId][5];
            this.rowSpan[locId][3] = this.rowSpan[locId][5];
            this.maxHeight[locId][0] = this.maxHeight[locId][2];
            this.filterMaxHeight[locId][0] = this.filterMaxHeight[locId][2];
            let i: number;
            for (i = 0; i < locId; i++) {
                this.colSpan[i][3] = 0;
                this.rowSpan[i][3] = 0;
            }
            for (i = locId+1; i < 3; i++) {
                this.colSpan[i][3] = 0;
                this.rowSpan[i][3] = 0;
            }
            if(locId === 2) {
                if (!(this.routForm === null)) {
                    if( 'maxHeight' in this.routForm ) {
                        this.routForm.maxHeight = this.maxHeight[locId][0];  
                    }
                    if( 'filterMaxHeight' in this.routForm ) {
                        this.routForm.filterMaxHeight = this.filterMaxHeight[locId][0];  
                    }
                }
            }
        }
        if(setDefault) {
            let i: number;
            for (i = 0; i <  3; i++) {
                this.colSpan[i][3] = this.colSpan[i][4];
                this.rowSpan[i][3] = this.rowSpan[i][4];
                this.maxHeight[i][0] = this.maxHeight[i][1];
                this.filterMaxHeight[i][0] = this.filterMaxHeight[i][1];
            }
            if (!(this.routForm === null)) {
                if( 'maxHeight' in this.routForm ) {
                    this.routForm.maxHeight = this.maxHeight[2][0];  
                }
                if( 'filterMaxHeight' in this.routForm ) {
                    this.routForm.filterMaxHeight = this.filterMaxHeight[2][0];  
                }
            }
        }
        this.updateSettings();
    }


    routForm: any = null;
    routSbscrptn: Subscription;
    onActivate(r: any) {
        this.routForm = r;
        (r as IItemHeightData).maxHeight = this.maxHeight[2][0];  
        (r as IItemHeightData).filterMaxHeight = this.filterMaxHeight[2][0];  
        (r as IEventEmitterPub).contMenuItems = this.contMenuItems[2];
        this.routSbscrptn = (r as IEventEmitterPub).onContMenuItemEmitter.subscribe((v: any) => {
            this.onContMenuItemClicked(v);
        });   
    }
    onDeActivate(v: any) {
        this.routForm = null;
        this.routSbscrptn.unsubscribe();
    }

}


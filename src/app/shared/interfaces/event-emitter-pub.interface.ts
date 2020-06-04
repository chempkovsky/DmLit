
import { EventEmitter } from  '@angular/core';
import { IEventEmitterData } from './event-emitter-data.interface';
import { IMenuItemData } from './menu-item-data.interface';

export interface IEventEmitterPub {
    onContMenuItemEmitter : EventEmitter<IEventEmitterData> ;
    contMenuItems: Array<IMenuItemData> ;
}


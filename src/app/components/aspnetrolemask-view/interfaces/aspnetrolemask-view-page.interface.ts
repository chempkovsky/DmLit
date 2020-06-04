import { IaspnetrolemaskView } from './aspnetrolemask-view.interface';

export interface IaspnetrolemaskViewPage {
        page : number; // int
        pagesize : number; // int
        pagecount : number; // int
        total : number; // int
        items ?: IaspnetrolemaskView[];
}



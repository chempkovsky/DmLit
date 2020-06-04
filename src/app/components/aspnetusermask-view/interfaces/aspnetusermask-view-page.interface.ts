import { IaspnetusermaskView } from './aspnetusermask-view.interface';

export interface IaspnetusermaskViewPage {
        page : number; // int
        pagesize : number; // int
        pagecount : number; // int
        total : number; // int
        items ?: IaspnetusermaskView[];
}



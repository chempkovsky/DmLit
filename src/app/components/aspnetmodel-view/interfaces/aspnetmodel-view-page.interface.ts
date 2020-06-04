import { IaspnetmodelView } from './aspnetmodel-view.interface';

export interface IaspnetmodelViewPage {
        page : number; // int
        pagesize : number; // int
        pagecount : number; // int
        total : number; // int
        items ?: IaspnetmodelView[];
}



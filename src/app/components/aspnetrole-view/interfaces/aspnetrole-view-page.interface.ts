import { IaspnetroleView } from './aspnetrole-view.interface';

export interface IaspnetroleViewPage {
        page : number; // int
        pagesize : number; // int
        pagecount : number; // int
        total : number; // int
        items ?: IaspnetroleView[];
}



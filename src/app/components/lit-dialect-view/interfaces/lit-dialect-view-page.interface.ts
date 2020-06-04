import { ILitDialectView } from './lit-dialect-view.interface';

export interface ILitDialectViewPage {
        page : number; // int
        pagesize : number; // int
        pagecount : number; // int
        total : number; // int
        items ?: ILitDialectView[];
}



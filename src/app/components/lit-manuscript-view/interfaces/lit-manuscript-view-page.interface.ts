import { ILitManuscriptView } from './lit-manuscript-view.interface';

export interface ILitManuscriptViewPage {
        page : number; // int
        pagesize : number; // int
        pagecount : number; // int
        total : number; // int
        items ?: ILitManuscriptView[];
}



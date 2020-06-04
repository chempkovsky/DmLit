import { ILitAuthorView } from './lit-author-view.interface';

export interface ILitAuthorViewPage {
        page : number; // int
        pagesize : number; // int
        pagecount : number; // int
        total : number; // int
        items ?: ILitAuthorView[];
}



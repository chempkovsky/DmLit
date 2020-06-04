import { ILitBookView } from './lit-book-view.interface';

export interface ILitBookViewPage {
        page : number; // int
        pagesize : number; // int
        pagecount : number; // int
        total : number; // int
        items ?: ILitBookView[];
}



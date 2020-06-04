import { ILitGenreView } from './lit-genre-view.interface';

export interface ILitGenreViewPage {
        page : number; // int
        pagesize : number; // int
        pagecount : number; // int
        total : number; // int
        items ?: ILitGenreView[];
}



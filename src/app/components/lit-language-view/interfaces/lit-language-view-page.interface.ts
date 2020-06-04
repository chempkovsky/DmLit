import { ILitLanguageView } from './lit-language-view.interface';

export interface ILitLanguageViewPage {
        page : number; // int
        pagesize : number; // int
        pagecount : number; // int
        total : number; // int
        items ?: ILitLanguageView[];
}



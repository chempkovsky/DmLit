import { ILitEditionView } from './lit-edition-view.interface';

export interface ILitEditionViewPage {
        page : number; // int
        pagesize : number; // int
        pagecount : number; // int
        total : number; // int
        items ?: ILitEditionView[];
}



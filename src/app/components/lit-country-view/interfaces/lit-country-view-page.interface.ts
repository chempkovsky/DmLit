import { ILitCountryView } from './lit-country-view.interface';

export interface ILitCountryViewPage {
        page : number; // int
        pagesize : number; // int
        pagecount : number; // int
        total : number; // int
        items ?: ILitCountryView[];
}



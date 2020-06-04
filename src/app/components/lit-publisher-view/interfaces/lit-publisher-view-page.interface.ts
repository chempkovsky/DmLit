import { ILitPublisherView } from './lit-publisher-view.interface';

export interface ILitPublisherViewPage {
        page : number; // int
        pagesize : number; // int
        pagecount : number; // int
        total : number; // int
        items ?: ILitPublisherView[];
}



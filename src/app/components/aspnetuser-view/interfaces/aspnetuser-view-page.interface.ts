import { IaspnetuserView } from './aspnetuser-view.interface';

export interface IaspnetuserViewPage {
        page : number; // int
        pagesize : number; // int
        pagecount : number; // int
        total : number; // int
        items ?: IaspnetuserView[];
}



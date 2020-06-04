import { IaspnetuserrolesView } from './aspnetuserroles-view.interface';

export interface IaspnetuserrolesViewPage {
        page : number; // int
        pagesize : number; // int
        pagecount : number; // int
        total : number; // int
        items ?: IaspnetuserrolesView[];
}



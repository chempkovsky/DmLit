import { IaspnetdashboardView } from './aspnetdashboard-view.interface';

export interface IaspnetdashboardViewPage {
        page : number; // int
        pagesize : number; // int
        pagecount : number; // int
        total : number; // int
        items ?: IaspnetdashboardView[];
}



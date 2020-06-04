
import { IaspnetdashboardView } from './../interfaces/aspnetdashboard-view.interface';
import { EformMode } from './../../../shared/enums/eform-mode.enum';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';

export interface IaspnetdashboardViewEdlg {
        title : string | null; 
        hiddenFilter: Array<IWebServiceFilterRslt>;
        eformMode: EformMode;
        eformControlModel: IaspnetdashboardView | null;
        eformNewControlModel: IaspnetdashboardView | null;
}


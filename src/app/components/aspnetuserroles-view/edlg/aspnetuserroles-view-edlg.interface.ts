
import { IaspnetuserrolesView } from './../interfaces/aspnetuserroles-view.interface';
import { EformMode } from './../../../shared/enums/eform-mode.enum';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';

export interface IaspnetuserrolesViewEdlg {
        title : string | null; 
        hiddenFilter: Array<IWebServiceFilterRslt>;
        eformMode: EformMode;
        eformControlModel: IaspnetuserrolesView | null;
        eformNewControlModel: IaspnetuserrolesView | null;
}


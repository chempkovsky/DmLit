
import { IaspnetroleView } from './../interfaces/aspnetrole-view.interface';
import { EformMode } from './../../../shared/enums/eform-mode.enum';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';

export interface IaspnetroleViewEdlg {
        title : string | null; 
        hiddenFilter: Array<IWebServiceFilterRslt>;
        eformMode: EformMode;
        eformControlModel: IaspnetroleView | null;
        eformNewControlModel: IaspnetroleView | null;
}


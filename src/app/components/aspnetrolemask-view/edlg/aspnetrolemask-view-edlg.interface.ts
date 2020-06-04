
import { IaspnetrolemaskView } from './../interfaces/aspnetrolemask-view.interface';
import { EformMode } from './../../../shared/enums/eform-mode.enum';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';

export interface IaspnetrolemaskViewEdlg {
        title : string | null; 
        hiddenFilter: Array<IWebServiceFilterRslt>;
        eformMode: EformMode;
        eformControlModel: IaspnetrolemaskView | null;
        eformNewControlModel: IaspnetrolemaskView | null;
}


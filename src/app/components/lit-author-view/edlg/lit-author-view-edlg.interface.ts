
import { ILitAuthorView } from './../interfaces/lit-author-view.interface';
import { EformMode } from './../../../shared/enums/eform-mode.enum';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';

export interface ILitAuthorViewEdlg {
        title : string | null; 
        hiddenFilter: Array<IWebServiceFilterRslt>;
        eformMode: EformMode;
        eformControlModel: ILitAuthorView | null;
        eformNewControlModel: ILitAuthorView | null;
}


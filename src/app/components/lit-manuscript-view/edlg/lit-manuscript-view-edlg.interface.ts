
import { ILitManuscriptView } from './../interfaces/lit-manuscript-view.interface';
import { EformMode } from './../../../shared/enums/eform-mode.enum';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';

export interface ILitManuscriptViewEdlg {
        title : string | null; 
        hiddenFilter: Array<IWebServiceFilterRslt>;
        eformMode: EformMode;
        eformControlModel: ILitManuscriptView | null;
        eformNewControlModel: ILitManuscriptView | null;
}


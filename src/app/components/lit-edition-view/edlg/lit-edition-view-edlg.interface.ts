
import { ILitEditionView } from './../interfaces/lit-edition-view.interface';
import { EformMode } from './../../../shared/enums/eform-mode.enum';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';

export interface ILitEditionViewEdlg {
        title : string | null; 
        hiddenFilter: Array<IWebServiceFilterRslt>;
        eformMode: EformMode;
        eformControlModel: ILitEditionView | null;
        eformNewControlModel: ILitEditionView | null;
}


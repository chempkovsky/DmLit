
import { ILitPublisherView } from './../interfaces/lit-publisher-view.interface';
import { EformMode } from './../../../shared/enums/eform-mode.enum';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';

export interface ILitPublisherViewEdlg {
        title : string | null; 
        hiddenFilter: Array<IWebServiceFilterRslt>;
        eformMode: EformMode;
        eformControlModel: ILitPublisherView | null;
        eformNewControlModel: ILitPublisherView | null;
}


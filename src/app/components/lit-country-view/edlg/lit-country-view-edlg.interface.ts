
import { ILitCountryView } from './../interfaces/lit-country-view.interface';
import { EformMode } from './../../../shared/enums/eform-mode.enum';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';

export interface ILitCountryViewEdlg {
        title : string | null; 
        hiddenFilter: Array<IWebServiceFilterRslt>;
        eformMode: EformMode;
        eformControlModel: ILitCountryView | null;
        eformNewControlModel: ILitCountryView | null;
}


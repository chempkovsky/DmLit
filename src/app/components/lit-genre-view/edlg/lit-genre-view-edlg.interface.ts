
import { ILitGenreView } from './../interfaces/lit-genre-view.interface';
import { EformMode } from './../../../shared/enums/eform-mode.enum';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';

export interface ILitGenreViewEdlg {
        title : string | null; 
        hiddenFilter: Array<IWebServiceFilterRslt>;
        eformMode: EformMode;
        eformControlModel: ILitGenreView | null;
        eformNewControlModel: ILitGenreView | null;
}


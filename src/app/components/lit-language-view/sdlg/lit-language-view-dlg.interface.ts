
import { ILitLanguageView } from './../interfaces/lit-language-view.interface';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';


export interface ILitLanguageViewDlg {
        title : string | null; 
        showFilter: boolean;
        canAdd ? : boolean;
        canUpdate ? : boolean;
        canDelete ? : boolean;
        hiddenFilter: Array<IWebServiceFilterRslt> | null;
        selectedItems: Array<ILitLanguageView> | null;
        maxHeight: number | null;
        filterMaxHeight: number | null;
}


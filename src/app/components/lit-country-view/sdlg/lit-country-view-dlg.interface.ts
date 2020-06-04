
import { ILitCountryView } from './../interfaces/lit-country-view.interface';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';


export interface ILitCountryViewDlg {
        title : string | null; 
        showFilter: boolean;
        canAdd ? : boolean;
        canUpdate ? : boolean;
        canDelete ? : boolean;
        hiddenFilter: Array<IWebServiceFilterRslt> | null;
        selectedItems: Array<ILitCountryView> | null;
        maxHeight: number | null;
        filterMaxHeight: number | null;
}


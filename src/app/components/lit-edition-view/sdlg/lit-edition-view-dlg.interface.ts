
import { ILitEditionView } from './../interfaces/lit-edition-view.interface';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';


export interface ILitEditionViewDlg {
        title : string | null; 
        showFilter: boolean;
        canAdd ? : boolean;
        canUpdate ? : boolean;
        canDelete ? : boolean;
        hiddenFilter: Array<IWebServiceFilterRslt> | null;
        selectedItems: Array<ILitEditionView> | null;
        maxHeight: number | null;
        filterMaxHeight: number | null;
}


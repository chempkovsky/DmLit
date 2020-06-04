
import { ILitManuscriptView } from './../interfaces/lit-manuscript-view.interface';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';


export interface ILitManuscriptViewDlg {
        title : string | null; 
        showFilter: boolean;
        canAdd ? : boolean;
        canUpdate ? : boolean;
        canDelete ? : boolean;
        hiddenFilter: Array<IWebServiceFilterRslt> | null;
        selectedItems: Array<ILitManuscriptView> | null;
        maxHeight: number | null;
        filterMaxHeight: number | null;
}


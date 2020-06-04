
import { IaspnetmodelView } from './../interfaces/aspnetmodel-view.interface';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';


export interface IaspnetmodelViewDlg {
        title : string | null; 
        showFilter: boolean;
        canAdd ? : boolean;
        canUpdate ? : boolean;
        canDelete ? : boolean;
        hiddenFilter: Array<IWebServiceFilterRslt> | null;
        selectedItems: Array<IaspnetmodelView> | null;
        maxHeight: number | null;
        filterMaxHeight: number | null;
}


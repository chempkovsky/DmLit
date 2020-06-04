
import { IaspnetrolemaskView } from './../interfaces/aspnetrolemask-view.interface';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';


export interface IaspnetrolemaskViewDlg {
        title : string | null; 
        showFilter: boolean;
        canAdd ? : boolean;
        canUpdate ? : boolean;
        canDelete ? : boolean;
        hiddenFilter: Array<IWebServiceFilterRslt> | null;
        selectedItems: Array<IaspnetrolemaskView> | null;
        maxHeight: number | null;
        filterMaxHeight: number | null;
}



import { IaspnetuserrolesView } from './../interfaces/aspnetuserroles-view.interface';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';


export interface IaspnetuserrolesViewDlg {
        title : string | null; 
        showFilter: boolean;
        canAdd ? : boolean;
        canUpdate ? : boolean;
        canDelete ? : boolean;
        hiddenFilter: Array<IWebServiceFilterRslt> | null;
        selectedItems: Array<IaspnetuserrolesView> | null;
        maxHeight: number | null;
        filterMaxHeight: number | null;
}


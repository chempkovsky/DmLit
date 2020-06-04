
import { IaspnetdashboardView } from './../interfaces/aspnetdashboard-view.interface';
import { IWebServiceFilterRslt } from './../../../shared/interfaces/web-service-filter-rslt.interface';


export interface IaspnetdashboardViewDlg {
        title : string | null; 
        showFilter: boolean;
        canAdd ? : boolean;
        canUpdate ? : boolean;
        canDelete ? : boolean;
        hiddenFilter: Array<IWebServiceFilterRslt> | null;
        selectedItems: Array<IaspnetdashboardView> | null;
        maxHeight: number | null;
        filterMaxHeight: number | null;
}


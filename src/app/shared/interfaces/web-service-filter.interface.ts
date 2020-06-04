import { FormControl } from '@angular/forms';

export interface IWebServiceFilter {
    fltrName: FormControl; 
    fltrDataType: string; 
    fltrOperator: FormControl;
    fltrValue: FormControl;
    fltrMaxLen: number|null;
    fltrMin: any;
    fltrMax: any;
}


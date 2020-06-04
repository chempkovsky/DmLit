

export interface ILitCountryViewFilter {
        iso3 ?: Array< string | null >;
        iso3Oprtr ?: Array< string >;
        iso2 ?: Array< string | null >;
        iso2Oprtr ?: Array< string >;
        countryName ?: Array< string | null >;
        countryNameOprtr ?: Array< string >;
        orderby ?: string[];
        page ?: number;
        pagesize ?: number;
}



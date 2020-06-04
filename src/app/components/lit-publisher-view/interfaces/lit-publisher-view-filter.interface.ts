

export interface ILitPublisherViewFilter {
        publisherId ?: Array< number >;
        publisherIdOprtr ?: Array< string >;
        publisherName ?: Array< string | null >;
        publisherNameOprtr ?: Array< string >;
        iso3CntrRef ?: Array< string | null >;
        iso3CntrRefOprtr ?: Array< string >;
        iso2CntrRef ?: Array< string | null >;
        iso2CntrRefOprtr ?: Array< string >;
        cCountryName ?: Array< string | null >;
        cCountryNameOprtr ?: Array< string >;
        orderby ?: string[];
        page ?: number;
        pagesize ?: number;
}





export interface ILitAuthorViewFilter {
        authorId ?: Array< number >;
        authorIdOprtr ?: Array< string >;
        firstName ?: Array< string | null >;
        firstNameOprtr ?: Array< string >;
        lastName ?: Array< string | null >;
        lastNameOprtr ?: Array< string >;
        birthDate ?: Array< number | null >;
        birthDateOprtr ?: Array< string >;
        deathDate ?: Array< number | null >;
        deathDateOprtr ?: Array< string >;
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



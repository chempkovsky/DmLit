

export interface ILitManuscriptViewFilter {
        manuscriptId ?: Array< number >;
        manuscriptIdOprtr ?: Array< string >;
        manuscriptTitle ?: Array< string | null >;
        manuscriptTitleOprtr ?: Array< string >;
        completionDate ?: Array< number >;
        completionDateOprtr ?: Array< string >;
        beginningDate ?: Array< number | null >;
        beginningDateOprtr ?: Array< string >;
        authorIdRef ?: Array< number >;
        authorIdRefOprtr ?: Array< string >;
        genreIdRef ?: Array< number >;
        genreIdRefOprtr ?: Array< string >;
        dialectIdRef ?: Array< string | null >;
        dialectIdRefOprtr ?: Array< string >;
        aFirstName ?: Array< string | null >;
        aFirstNameOprtr ?: Array< string >;
        aLastName ?: Array< string | null >;
        aLastNameOprtr ?: Array< string >;
        aBirthDate ?: Array< number | null >;
        aBirthDateOprtr ?: Array< string >;
        aCCountryName ?: Array< string | null >;
        aCCountryNameOprtr ?: Array< string >;
        gGenreName ?: Array< string | null >;
        gGenreNameOprtr ?: Array< string >;
        dDialectName ?: Array< string | null >;
        dDialectNameOprtr ?: Array< string >;
        dCCountryName ?: Array< string | null >;
        dCCountryNameOprtr ?: Array< string >;
        orderby ?: string[];
        page ?: number;
        pagesize ?: number;
}



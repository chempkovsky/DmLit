

export interface ILitBookViewFilter {
        bookId ?: Array< number >;
        bookIdOprtr ?: Array< string >;
        bookTitle ?: Array< string | null >;
        bookTitleOprtr ?: Array< string >;
        publicationDate ?: Array< number >;
        publicationDateOprtr ?: Array< string >;
        price ?: Array< number >;
        priceOprtr ?: Array< string >;
        pPublisherName ?: Array< string | null >;
        pPublisherNameOprtr ?: Array< string >;
        pCCountryName ?: Array< string | null >;
        pCCountryNameOprtr ?: Array< string >;
        mManuscriptTitle ?: Array< string | null >;
        mManuscriptTitleOprtr ?: Array< string >;
        mCompletionDate ?: Array< number >;
        mCompletionDateOprtr ?: Array< string >;
        mAFirstName ?: Array< string | null >;
        mAFirstNameOprtr ?: Array< string >;
        mALastName ?: Array< string | null >;
        mALastNameOprtr ?: Array< string >;
        mABirthDate ?: Array< number | null >;
        mABirthDateOprtr ?: Array< string >;
        mACCountryName ?: Array< string | null >;
        mACCountryNameOprtr ?: Array< string >;
        mGGenreName ?: Array< string | null >;
        mGGenreNameOprtr ?: Array< string >;
        mDDialectName ?: Array< string | null >;
        mDDialectNameOprtr ?: Array< string >;
        mDCCountryName ?: Array< string | null >;
        mDCCountryNameOprtr ?: Array< string >;
        eEditionName ?: Array< string | null >;
        eEditionNameOprtr ?: Array< string >;
        orderby ?: string[];
        page ?: number;
        pagesize ?: number;
}


